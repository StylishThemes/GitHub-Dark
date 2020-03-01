#!/usr/bin/env node
"use strict";

const glob = require("fast-glob");
const {join} = require("path");
const {unlink, readFile} = require("fs").promises;
const CleanCSS = require("clean-css");
const {writeFile} = require("./utils");

const clean = new CleanCSS({
  level: 1,
  returnPromise: true,
});
const minify = async css => (await (clean.minify.bind(clean)(css))).styles;

function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}

function replaceCSSMatches(theme) {
  return theme.replace(/:is\(([^)]+)\)\s([^,{]+)(,|{)/gm, (_, matches, selector, separator) => {
    let result = "";
    const m = matches.split(/\s*,\s*/);
    const last = m.length - 1;
    m.forEach((match, index) => {
      result += `${match} ${selector.trim()}${index >= last && separator === "{" ? " {" : ", "}`;
    });
    return result;
  });
}

async function main() {
  let paths = await glob(join(__dirname, "..", "themes", "**", "*.min.css"));
  await Promise.all(paths.map(path => unlink(path)));

  paths = await glob(join(__dirname, "..", "themes", "src", "*", "*.css"));
  await Promise.all(paths.map(async path => {
    const newPath = path.replace(/[/\\]src[/\\]/, "/").replace(/\.css$/, ".min.css");
    let css = await readFile(path, "utf8");
    css = await minify(css);
    await writeFile(newPath, css);
  }));

  paths = await glob(join(__dirname, "..", "themes", "jupyter", "*"));
  await Promise.all(paths.map(async path => {
    let css = await readFile(path, "utf8");
    css = replaceCSSMatches(css);
    return await writeFile(path, css);
  }));
}

main().then(exit).catch(exit);
