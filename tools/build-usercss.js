#!/usr/bin/env node
"use strict";

const fs = require("fs");
const userBase = require("../defaults.json");

// make sure to run "grunt user" before grabbing this style
const cleanedCss = "./github-dark-userstyle.build.css";
const usercssName = "github-dark.user.css";

function processGroup(css, name) {
  return new Promise(resolve => {
    getThemesInFolder(name.toLowerCase())
      .then(themes => {
        // {{Themes:GitHub}} {{Themes:CodeMirror}} {{Themes:Jupyter}}
        css = css.replace(`  {{Themes:${name}}}`, buildThemeGroup(themes));
        resolve(css);
      })
      .catch(exit);
  });
}

function getThemesInFolder(folder) {
  return new Promise((resolve, reject) => {
    const path = "./themes/" + folder;
    fs.readdir(path, (err, files) => {
      if (err) {
        console.log(`Error reading folder ${folder}`, err);
        reject(err);
      }
      return Promise.all(files.map(file => readFile(path + "/" + file)))
        .then(resolve)
        .catch(exit);
    });
  });
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

function readFile(name) {
  return new Promise((resolve, reject) => {
    fs.readFile(name, "utf8", (err, file) => {
      if (err) {
        return reject(err);
      }
      resolve(file);
    });
  });
}

function writeFile(name, obj) {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, obj, "utf8", err => {
      if (err) {
        console.log(`Error writing ${name}`, err);
        return reject(err);
      }
      resolve();
    });
  });
}

function del(name) {
  return new Promise((resolve, reject) => {
    fs.unlink(name, err => {
      // ignore if file doesn't exist
      if (err && err.code !== "ENOENT") {
        return reject(err);
      }
      resolve();
    });
  });
}

function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}

del("./" + usercssName)
  .then(() => readFile("./tools/usercss-template.css"))
  .then(css => processGroup(css, "GitHub"))
  .then(css => processGroup(css, "CodeMirror"))
  .then(css => processGroup(css, "Jupyter"))
  .then(css => readFile(cleanedCss).then(style => css + style))
  .then(css => writeFile("./" + usercssName, replaceVars(css)))
  .then(() => console.log("\x1b[32m%s\x1b[0m", "GitHub Dark usercss build complete"));
