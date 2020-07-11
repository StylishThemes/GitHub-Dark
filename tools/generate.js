#!/usr/bin/env node
"use strict";

const esc = require("escape-string-regexp");
const fetchCss = require("fetch-css");
const remapCss = require("remap-css");
const {readFile} = require("fs").promises;
const {writeFile, exit} = require("./utils");
const {mappings, sources, ignoreSelectors} = require("../src/rules");

const remapOpts = {
  ignoreSelectors,
  indentCss: 2,
  lineLength: 76,
  comments: true,
  stylistic: true,
  validate: true,
};

async function main() {
  const sections = await Promise.all(sources.map(async source => {
    return remapCss(await fetchCss([source]), mappings, remapOpts);
  }));

  for (let [index, section] of Object.entries(sections)) {
    const source = sources[Number(index)];

    // create replacement regex
    section = `  /* begin ${source.name} rules */\n${section}\n  /* end ${source.name} rules */`;
    const re = new RegExp(`.*begin ${esc(source.name)}[\\s\\S]+end ${esc(source.name)}.*`, "gm");

    // replace in file
    let css = await readFile(source.file, "utf8");
    css = css.replace(re, section);
    await writeFile(source.file, css);
  }
}

main().then(exit).catch(exit);
