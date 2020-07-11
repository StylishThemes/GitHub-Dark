#!/usr/bin/env node
"use strict";

const esc = require("escape-string-regexp");
const fetchCss = require("fetch-css");
const remapCss = require("remap-css");
const {readFile} = require("fs").promises;
const {resolve, basename} = require("path");
const cssnano = require("cssnano");

const {mappings} = require("../src/gen/mappings");
const {sources} = require("../src/gen/sources");
const {ignores} = require("../src/gen/ignores");
const {version} = require("../package.json");
const {writeFile, exit, glob} = require("./utils");

const remapOpts = {
  ignoreSelectors: ignores,
  indentCss: 2,
  lineLength: 76,
  comments: true,
  stylistic: true,
  validate: true,
};

const sourceFiles = glob("src/*.css").sort((a, b) => {
  if (a.endsWith("base.css")) return -1;
  if (b.endsWith("base.css")) return 1;
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
    .substring(3, css.indexOf("*/"))
    .trim()
    // remove group (e.g. "GitHub: ")
    .replace(/^.+:\s/, "");
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

async function main() {
  let css = await readFile(resolve(__dirname, "../src/template.css"), "utf8");
  css = css.replace("{{version}}", version);

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
        // create replacement regex
        section = `  /* begin ${source.name} rules */\n${section}\n  /* end ${source.name} rules */`;
        const re = new RegExp(`.*generated ${esc(source.name)} rules.*`, "gm");
        sourceCss = sourceCss.replace(re, section);
      }
    }

    css += `${sourceCss}\n`;
  }

  await writeFile(resolve(__dirname, "../github-dark.user.css"), css);
}

main().then(exit).catch(exit);
