#!/usr/bin/env node
"use strict";

const esc = require("escape-string-regexp");
const fetchCss = require("fetch-css");
const remapCss = require("remap-css");
const {readFile} = require("fs/promises");
const {resolve, basename} = require("path");
const cssnano = require("cssnano");
const puppeteer = require("puppeteer");
const totpGenerator = require("totp-generator");
const {serialize} = require("cookie");

const {version} = require("../package.json");
const {writeFile, exit, glob, userAgent} = require("./utils");

const sourceFiles = glob("src/*.css").sort((a, b) => {
  if (a.endsWith("vars.css")) return -1;
  if (b.endsWith("vars.css")) return 1;
  if (a.endsWith("main.css")) return -1;
  if (b.endsWith("main.css")) return 1;
}).filter(file => basename(file) !== "template.css");

const minify = async css => {
  const result = await cssnano.process(css, {from: undefined});
  return result.css;
};

function replaceCSSMatches(css) {
  return css.replace(/:is\(([^)]+)\)\s([^,{]+)(,|{)/gm, (_, matches, selector, separator) => {
    let result = "";
    const m = matches.split(/\s*,\s*/);
    const last = m.length - 1;
    m.forEach((match, index) => {
      result += `${match} ${selector.trim()}${index >= last && separator === "{" ? " {" : ", "}`;
    });
    return result;
  });
}

function sortThemes(a, b) {
  if (/twilight/i.exec(a)) return -1;
  if (/twilight/i.exec(b)) return 1;
  return a.localeCompare(b);
}

function extractThemeName(css) {
  return css
    .substring(3, css.indexOf("*/")).trim()
    .replace(/^.+:\s/, ""); // remove group (e.g. "GitHub: ")
}

async function getThemes() {
  const themes = {codemirror: [], github: [], jupyter: []};

  for (const path of glob("src/themes/codemirror/*.css").sort(sortThemes)) {
    themes.codemirror[basename(path)] = await minify(await readFile(path, "utf8"));
  }

  for (const path of glob("src/themes/github/*.css").sort(sortThemes)) {
    themes.github[basename(path)] = await minify(await readFile(path, "utf8"));
  }

  for (const path of glob("src/themes/jupyter/*.css").sort(sortThemes)) {
    themes.jupyter[basename(path)] = replaceCSSMatches(await minify(await readFile(path, "utf8")));
  }

  return themes;
}

function serializeCookies(cookies) {
  return cookies.map(cookie => serialize(cookie.name, cookie.value)).join(", ");
}

async function checkCookies(page) {
  const cookies = await page.cookies() || {};
  for (const {name, value} of cookies) {
    if (name === "logged_in" && value === "yes") {
      return serializeCookies(cookies);
    }
  }
}

async function login() {
  if (!("GHD_GH_USERNAME" in process.env) || !("GHD_GH_PASSWORD" in process.env)) return "";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(await userAgent());
  await page.goto("https://github.com/login");
  await page.type(`form [type="text"]`, process.env.GHD_GH_USERNAME);
  await page.type(`form [type="password"]`, process.env.GHD_GH_PASSWORD);
  await page.click(`form [type="submit"]`);
  await page.waitForNavigation();

  let cookie = await checkCookies(page);
  if (cookie) return cookie;

  if ("GHD_GH_TOTP_SECRET" in process.env) {
    await page.type(`form [type="text"]`, totpGenerator(process.env.GHD_GH_TOTP_SECRET));
    await page.click(`form [type="submit"]`);
    await page.waitForNavigation();
  }

  cookie = await checkCookies(page);
  return cookie || "";
}

async function main() {
  const [mappings, ignores, sources] = await Promise.all([
    require("../src/gen/mappings")(),
    require("../src/gen/ignores")(),
    require("../src/gen/sources")(await login()),
  ]);

  const remapOpts = {
    ignoreSelectors: ignores,
    indentCss: 2,
    lineLength: 76,
    comments: false,
    stylistic: true,
    validate: true,
  };

  let css = await readFile(resolve(__dirname, "../src/template.css"), "utf8");
  css = `${css.trim().replace("{{version}}", version)}\n`;

  for (const [type, themes] of Object.entries(await getThemes())) {
    const parts = [];
    for (const [_filename, themeCss] of Object.entries(themes)) {
      const name = extractThemeName(themeCss);
      parts.push(`  ${name.replace(/\s*/, "")} "${name}" <<<EOT\n  ${themeCss.replace(/\*\//g, "*\\/").replace(/\n/, "")} EOT;`);
    }
    css = css.replace(`  {{themes:${type}}}`, parts.join("\n"));
  }

  const sections = await Promise.all(sources.map(async source => {
    return remapCss(await fetchCss([source]), mappings, remapOpts);
  }));

  for (const sourceFile of sourceFiles) {
    let sourceCss = await readFile(sourceFile, "utf8");
    for (let [index, section] of Object.entries(sections)) {
      const source = sources[Number(index)];
      if (basename(source.file) === basename(sourceFile)) {
        const prefix = `  /* begin ${source.name} rules */`;
        const suffix = `  /* end ${source.name} rules */`;
        section = `${prefix}\n${section}\n${suffix}`;
        const re = new RegExp(`.*generated ${esc(source.name)} rules.*`, "gm");
        sourceCss = sourceCss.replace(re, section);
      }
    }

    css += `${sourceCss.trim()}\n`;
  }

  await writeFile(resolve(__dirname, "../github-dark.user.css"), css);
}

main().then(exit).catch(exit);
