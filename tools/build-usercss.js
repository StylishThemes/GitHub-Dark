#!/usr/bin/env node
"use strict";

const fs = require("fs").promises;
const path = require("path");

// make sure to run "grunt user" before grabbing this style
const files = {
  defaults: path.join(__dirname, "..", "defaults.json"),
  userstyle: path.join(__dirname, "..", "github-dark-userstyle.build.css"),
  usercss: path.join(__dirname, "..", "github-dark.user.css"),
  template: path.join(__dirname, "usercss-template.css"),
};

const userBase = require(files.defaults);
const noop = () => {};

async function processGroup(css, name) {
  const themes = await getThemesInFolder(name.toLowerCase());

  // {{Themes:GitHub}} {{Themes:CodeMirror}} {{Themes:Jupyter}}
  return css.replace(`  {{Themes:${name}}}`, buildThemeGroup(themes));
}

async function getThemesInFolder(folder) {
  const path = "./themes/" + folder;
  let files = await fs.readdir(path);

  // put the default theme (twilight) first
  files = files.sort((a, b) => {
    if (/twilight/i.exec(a)) return -1;
    if (/twilight/i.exec(b)) return 1;
    return a.localeCompare(b);
  });

  return await Promise.all(files.map(file => fs.readFile(path + "/" + file, "utf8")));
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

fs.unlink(files.usercss).catch(noop)
  .then(() => fs.readFile(files.template, "utf8"))
  .then(css => processGroup(css, "GitHub"))
  .then(css => processGroup(css, "CodeMirror"))
  .then(css => processGroup(css, "Jupyter"))
  .then(css => fs.readFile(files.userstyle, "utf8").then(style => css + style))
  .then(css => fs.writeFile(files.usercss, replaceVars(css)))
  .then(() => console.info("\x1b[32m%s\x1b[0m", "GitHub Dark usercss build complete"))
  .catch(exit);
