#!/usr/bin/env node
"use strict";

const esc = require("escape-string-regexp");
const fetchCss = require("fetch-css");
const remapCss = require("remap-css");
const {readFile, readdir} = require("fs").promises;
const {resolve, basename} = require("path");

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
  if (a.endsWith("main.css")) return -1;
  if (b.endsWith("main.css")) return 1;
  if (a.endsWith("base.css")) return -1;
  if (b.endsWith("base.css")) return 1;
});

async function replaceThemes(css, name) {
  const themes = await getThemesInFolder(name.toLowerCase());

  // {{Themes:GitHub}} {{Themes:CodeMirror}} {{Themes:Jupyter}}
  return css.replace(`  {{Themes:${name}}}`, buildThemeGroup(themes));
}

async function getThemesInFolder(folder) {
  const path = `./themes/${folder}`;
  let files = await readdir(path);

  // put the default theme (twilight) first
  files = files.sort((a, b) => {
    if (/twilight/i.exec(a)) return -1;
    if (/twilight/i.exec(b)) return 1;
    return a.localeCompare(b);
  });

  return await Promise.all(files.map(file => readFile(`${path}/${file}`, "utf8")));
}

function extractThemeName(css) {
  return css
    .substring(3, css.indexOf("*/"))
    .trim()
    // remove group (e.g. "GitHub: ")
    .replace(/^.+:\s/, "");
}

function buildThemeGroup(themes) {
  const defs = [];
  for (const theme of themes) {
    const name = extractThemeName(theme);
    defs.push(`  ${name.replace(/\s*/, "")} "${name}" <<<EOT\n  ${theme.replace(/\*\//g, "*\\/").replace(/\n/, "")} EOT;`);
  }
  return defs.join("\n");
}

async function main() {
  const sections = await Promise.all(sources.map(async source => {
    return remapCss(await fetchCss([source]), mappings, remapOpts);
  }));

  let css = await readFile(resolve(__dirname, "../src/template.css"), "utf8");
  css = css.replace("{{version}}", version);
  css = await replaceThemes(css, "GitHub");
  css = await replaceThemes(css, "CodeMirror");
  css = await replaceThemes(css, "Jupyter");

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
