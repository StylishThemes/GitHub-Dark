#!/usr/bin/env node
"use strict";

const {readFile, readdir} = require("fs").promises;
const {join} = require("path");
const {writeFile} = require("./utils");

// make sure to run "grunt user" before grabbing this style
const files = {
  defaults: join(__dirname, "..", "defaults.json"),
  userstyle: join(__dirname, "..", "github-dark-userstyle.build.css"),
  usercss: join(__dirname, "..", "github-dark.user.css"),
  template: join(__dirname, "usercss-template.css"),
};

const userBase = require(files.defaults);

async function processGroup(css, name) {
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
  themes.forEach(theme => {
    const name = extractThemeName(theme);
    defs.push(`  ${name.replace(/\s*/, "")} "${name}" <<<EOT
  ${theme.replace(/\*\//g, "*\\/").replace(/\n/, "")} EOT;`);
  });
  return defs.join("\n");
}

function replaceVars(css) {
  css = makeTabs(css);
  Object.keys(userBase).forEach(key => {
    css = css.replace(`{{${key}}}`, userBase[key]);
  });
  const version = css.match(/github\sdark\sv([\d.]+) \(/i);
  if (version) {
    css = css.replace("{{version}}", version[1]);
  }
  return css;
}

function makeTabs(css) {
  const tabs = [];
  userBase.tabSizes.forEach(tab => {
    tabs.push(`  ${tab} "${tab}" <<<EOT
  pre, .highlight, .diff-table, .tab-size {
    tab-size: ${tab} !important;
    -moz-tab-size: ${tab} !important;
  } EOT;`);
  });
  return css.replace("  {{tab-sizes}}", tabs.join("\n"));
}

function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}

async function main() {
  let css = await readFile(files.template, "utf8");
  css = await processGroup(css, "GitHub");
  css = await processGroup(css, "CodeMirror");
  css = await processGroup(css, "Jupyter");
  const userstyle = await readFile(files.userstyle, "utf8");
  css = replaceVars(`${css}${userstyle}`);
  await writeFile(files.usercss, css);

  console.info("\u001B[32m%s\u001B[0m", "GitHub Dark usercss build complete");
}

main().then(exit).catch(exit);
