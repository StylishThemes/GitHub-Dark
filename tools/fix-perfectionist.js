#!/usr/bin/env node
"use strict";

const fs = require("fs").promises;
const path = require("path");
const pkg = require("../package.json");

const fileName = path.join(__dirname, "..", pkg.main);

function cleanup(css) {
  return css
    .replace(/\{\/\*!/g, "{\n /*!")
    .replace(/\/\* /g, "\n  /* ")
    .replace(/(\s+)?\n(\s+)?\n/gm, "\n")
    .replace(/ {2}}\/\*/gm, "  }\n  /*")
    .replace(/,\s+\n/gm, ",\n")
    // fix unicode-range block
    .replace(/\n\s{23}/gm, "")
    .replace(/(-025A9,|-02662,)/gim, "$&\n                   ")
    .replace(/\/\*\[\[code-wrap/, "/*[[code-wrap")
    .replace(/,\u0020{2,}/g, ", ")
    .replace(/\s+domain\(/g, " domain(");
}

async function postPerfectionist() {
  const css = await fs.readFile(fileName, "utf8");
  await fs.writeFile(fileName, cleanup(css));
  console.log("\x1b[32m%s\x1b[0m", `${pkg.title} usercss cleanup completed`);
}

postPerfectionist();
