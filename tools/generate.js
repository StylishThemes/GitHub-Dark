#!/usr/bin/env node
"use strict";

const fs        = require("fs");
const got       = require("got");
const parseCss  = require("css").parse;
const parseHtml = require("parse5").parseFragment;
const path      = require("path");
const perf      = require("perfectionist").process;

// This list maps old declarations to new ones. Ordering is important for cases
// where one declaration is meant to override another, like in the border cases
// where GitHub for example overrides border-bottom with another border-bottom
// further below. Ideally these cases should be detected and the resulting rule
// should not be merged but instead be inserted in the original ordering based
// on GitHub's style.
const mappings = {
  "background-color: #2cbe4e": "background: #163",
  "background-color: #d1d5da": "background: #444",
  "background-color: #6f42c1": "background: #6e5494",
  "background-color: #cb2431": "background: #911",
  "background-color: #fff5b1": "background-color: #261d08",
  "background-color: #fffbdd": "background-color: #261d08",
  "background-color: #f6f8fa": "background-color: #141414",
  // "background-color: #fafbfc": "background-color: #181818",
  "background: #fff": "background: #222",
  // "background-color: #fff": "background: #222",
  "border: 1px solid #e1e4e8": "border-color: #343434",
  "border: 1px #e1e4e8 solid": "border-color: #343434",
  "border: 1px solid rgba(27,31,35,0.15)": "border-color: rgba(225,225,225,0.2)",
  "border: 2px solid #fff": "border-color: #222",
  "border-color: #e1e4e8": "border-color: #343434",
  "border-color: #dfe2e5": "border-color: #484848",
  "border-bottom: 1px solid #e1e4e8": "border-bottom: 1px solid #343434",
  "border-bottom: 1px solid #dfe2e5": "border-bottom: 1px solid #484848",
  "border-left: 1px solid #e1e4e8": "border-left: 1px solid #343434",
  "border-right: 1px solid #e1e4e8": "border-right: 1px solid #343434",
  "border-top: 1px solid #e1e4e8": "border-top: 1px solid #343434",
  "border-bottom: 0": "border-bottom: 0",
  "border-left: 0": "border-left: 0",
  "border-right: 0": "border-right: 0",
  "border-top: 0": "border-top: 0",
  "color: #24292e": "color: #e2e2e2",
  "color: #444d56": "color: #c0c0c0",
  "color: #586069": "color: #b5b5b5",
  "color: #6a737d": "color: #949494",
  "color: #959da5": "color: #7b7b7b",
  "color: #a3aab1": "color: #606060",
  "color: #c6cbd1": "color: #4d4d4d",
  "color: rgba(27,31,35,0.85)": "color: rgba(230,230,230,.85)",
};

// list of URLs to pull stylesheets from
const urls = [
  "https://github.com",
  "https://gist.github.com",
];

// list of regexes matching selectors that should be ignored
const ignoreSelectors = [
  /\.CodeMirror/,
];

// list of regexes matching selectors that shouldn't be merged with other
// selectors because they can generate invalid rules.
const unmergeableSelectors = [
  /(-moz-|-ms-|-o-|-webkit-).+/,
  /:selection|:placeholder$/,
];

const perfOpts = {
  maxSelectorLength: 76, // -4 because of indentation and to accomodate ' {'
  indentSize: 2,
};

const replaceRe = /.*begin auto-generated[\s\S]+end auto-generated.*/gm;
const cssFile = path.join(__dirname, "..", "github-dark.css");

Promise.all(urls.map(url => got(url)))
  .then(responses => extractStyleHrefs(responses.map(res => res.body).join("\n")))
  .then(links => Promise.all(links.map(link => got(link))))
  .then(responses => responses.map(res => res.body).join("\n"))
  .then(css => parseDeclarations(css))
  .then(decls => buildOutput(decls))
  .then(css => writeOutput(css))
  .catch(exit);

function writeOutput(generatedCss) {
  fs.readFile(cssFile, "utf8", (err, css) => {
    if (err) return exit(err);
    fs.writeFile(cssFile, css.replace(replaceRe, generatedCss), exit);
  });
}

function extractStyleHrefs(html) {
  return (html.match(/<link.+?>/g) || []).map(link => {
    const attrs = {};
    parseHtml(link).childNodes[0].attrs.forEach(attr => {
      attrs[attr.name] = attr.value;
    });
    if (attrs.rel === "stylesheet" && attrs.href) {
      return attrs.href;
    }
  }).filter(link => !!link);
}

function parseDeclarations(css) {
  const decls = [];
  parseCss(css).stylesheet.rules.forEach(rule => {
    if (!rule.selectors || rule.selectors.length === 0) return;
    rule.declarations.forEach(decl => {
      Object.keys(mappings).forEach(mapping => {
        if (!decls[mapping]) decls[mapping] = [];
        const [prop, val] = mapping.split(": ");
        decl.value = decl.value.replace(/!important/g, "").trim(); // remove !important
        if (decl.property === prop && decl.value.toLowerCase() === val.toLowerCase()) {
          rule.selectors.forEach(selector => {
            // Skip potentially unmergeable selectors
            // TODO: Use clean-css or similar to merge rules later instead
            if (unmergeableSelectors.some(re => re.test(selector))) return;

            // Skip ignored selectors
            if (ignoreSelectors.some(re => re.test(selector))) return;

            // change :: to : for stylistic reasons
            selector = selector.replace(/::/, ":");

            // add the selector to our list, unless it's already on it
            if (!decls[mapping].includes(selector)) {
              decls[mapping].push(selector);
            }
          });
        }
      });
    });
  });
  return decls;
}

function buildOutput(decls) {
  let output = "/* begin auto-generated rules - use tools/generate.js to generate them */\n";
  Object.keys(mappings).forEach(decl => {
    if (decls[decl].length) {
      output += `/* auto-generated rule for "${decl}" */\n`;
      const selectors = decls[decl].join(",");
      output += String(perf(selectors + "{" + mappings[decl] + " !important}", perfOpts));
    } else {
      console.error(`Warning: no declarations for ${decl} found!`);
    }
  });
  output += "/* end auto-generated rules */";
  return output.split("\n").map(line => "  " + line).join("\n");
}

function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}
