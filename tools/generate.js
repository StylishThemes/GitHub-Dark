#!/usr/bin/env node
"use strict";

const css = require("css");
const cssMediaQuery = require("css-mediaquery");
const fetch = require("make-fetch-happen");
const fs = require("fs-extra");
const parse5 = require("parse5");
const path = require("path");
const perfectionist = require("perfectionist");
const urlToolkit = require("url-toolkit");

// This list maps old declarations to new ones. Ordering is significant.
const mappings = {
  // ==========================================================================
  // Background
  // ==========================================================================
  "background: #fff": "background: #181818",
  "background: #fafbfc": "background: #181818",
  "background: #eaecef": "background: #343434",
  "background: #d1d5da": "background: #444",
  "background: #fffbdd": "background: #261d08",
  "background: #0366d6": "background: /*[[base-color]]*/ #4f8cc9",

  "background-color: #fff": "background-color: #181818",
  "background-color: #fafbfc": "background-color: #181818",
  "background-color: #eaecef": "background-color: #343434",
  "background-color: #d1d5da": "background-color: #444",
  "background-color: #6a737d": "background-color: #222",
  "background-color: #f1f8ff": "background-color: #242424",
  "background-color: #2cbe4e": "background-color: #163",
  "background-color: #dbedff": "background-color: #182030",
  "background-color: #fffbdd": "background-color: #261d08",
  "background-color: #0366d6": "background-color: /*[[base-color]]*/ #4f8cc9 !important; color: #fff",

  // needs to be after ##2cbe4e for .community-checklist .progress vs .progress-bar .progress
  "background-color: #f6f8fa": "background-color: #202020",

  // ==========================================================================
  // Border
  // ==========================================================================

  "border: 1px solid #e1e4e8": "border-color: #343434",
  "border: 1px solid #eee": "border-color: #343434",
  "border: 1px solid rgba(27,31,35,.15)": "border-color: rgba(225,225,225,.2)",
  "border: 2px solid #fff": "border-color: #222",
  "border: solid #ddd": "border-color: #484848",

  "border-color: #e1e4e8": "border-color: #343434",
  "border-color: #eaecef": "border-color: #343434",
  "border-bottom-color: #e36209": "border-bottom-color: #eee",

  "border-bottom: 1px solid #f8f8f8": "border-bottom: 1px solid #343434",
  "border-bottom: 1px solid #dfe2e5": "border-bottom: 1px solid #343434",

  "border-top: 1px solid #e1e4e8": "border-top: 1px solid #343434",
  "border-bottom: 1px solid #e1e4e8": "border-bottom: 1px solid #343434",
  "border-left: 1px solid #e1e4e8": "border-left: 1px solid #343434",
  "border-right: 1px solid #e1e4e8": "border-right: 1px solid #343434",

  "border-top: 1px solid #eaecef": "border-top: 1px solid #343434",
  "border-bottom: 1px solid #eaecef": "border-bottom: 1px solid #343434",
  "border-left: 1px solid #eaecef": "border-left: 1px solid #343434",
  "border-right: 1px solid #eaecef": "border-right: 1px solid #343434",

  "border-top: 1px solid #ddd": "border-top: 1px solid #343434",
  "border-bottom: 1px solid #ddd": "border-bottom: 1px solid #343434",
  "border-left: 1px solid #ddd": "border-left: 1px solid #343434",
  "border-right: 1px solid #ddd": "border-right: 1px solid #343434",

  "border-top-color: rgba(27,31,35,.15)": "border-top-color: #343434",
  "border-bottom-color: rgba(27,31,35,.15)": "border-bottom-color: #343434",
  "border-left-color: rgba(27,31,35,.15)": "border-left-color: #343434",
  "border-right-color: rgba(27,31,35,.15)": "border-right-color: #343434",

  "border-left-color: #f6f8fa": "border-left-color: #222",

  "border-left: solid 2px #e6ebf1": "border-left: solid 2px #343434",
  "border-bottom: solid 2px #e6ebf1": "border-bottom: solid 2px #343434",

  "border-bottom-color: #fff": "border-bottom-color: #181818",
  "border-left-color: #fff": "border-left-color: #181818",
  "border-top-color: #fff": "border-top-color: #181818",
  "border-right-color: #fff": "border-right-color: #181818",

  "border-top: 7px solid #fff": "border-top: 7px solid #181818",
  "border-top: 8px solid rgba(27,31,35,.15)": "border-top: 8px solid #343434",

  "border-color: #2188ff": "border-color: /*[[base-color]]*/ #4f8cc9",
  "border-color: #dfe2e5 #dfe2e5 #fff": "border-color: #484848",

  // ==========================================================================
  // Box-Shadow
  // ==========================================================================

  "box-shadow: 0 0 0 .2em rgba(3,102,214,.3)": `
     box-shadow: 0 0 0 .2em rgba(79,140,201,.4) !important;
     box-shadow: 0 0 0 .2em rgba(/*[[base-color-rgb]]*/, .4)
  `,

  "box-shadow: 0 0 0 .2em #c8e1ff": `
     box-shadow: 0 0 0 .2em rgba(79,140,201,.4) !important;
     box-shadow: 0 0 0 .2em rgba(/*[[base-color-rgb]]*/, .4)
  `,

  "box-shadow: 0 0 0 .2em rgba(203,36,49,.4)": "box-shadow: 0 0 0 .2em rgba(255,68,68,.4)",

  // ==========================================================================
  // Color / Background
  // ==========================================================================

  "color: #333": "color: #bebebe",
  "color: #3c4146": "color: #bebebe",
  "color: #444d56": "color: #afafaf",
  "color: #666"   : "color: #8e8e8e",
  "color: #6a737d": "color: #8e8e8e",
  "color: #959da5": "color: #757575",
  "color: #a3aab1": "color: #5a5a5a",
  "color: #c6cbd1": "color: #474747",
  "color: rgba(27,31,35,.85)": "color: rgba(230,230,230,.85)",
  "color: hsla(0,0%,100%,.5)": "color: hsla(0,0%,100%,.5)",
  "color: hsla(0,0%,100%,.6)": "color: hsla(0,0%,100%,.6)",

  // needs to be after #333 for .btn vs .btn-outline
  "color: #0366d6": "color: /*[[base-color]]*/ #4f8cc9",
  // needs to be after #0366d3 for .btn-link vs .text-gray
  "color: #586069": "color: #949494",
  // needs to be after #0366d3 for .btn-link vs .text-gray-dark
  "color: #24292e": "color: #c0c0c0",

  // red
  "color: #cb2431": "color: #f44",
  "background-color: #d73a49": "background-color: #f44",
  "background-color: #cb2431": "background-color: #911",

  // orange
  "color: #a04100": "color: #f3582c",
  "background-color: #d15704": "background-color: #f3582c",

  // green
  "color: #28a745": "color: #6cc644",
  "background-color: #28a745": "background-color: #6cc644",

  // yellow
  "color: rgba(47,38,6,.5)": "color: #cb4",
  "color: #b08800": "color: #cb4",
  "background-color: #ffd33d": "background-color: #cb4",

  // light yellow
  "background-color: #fff5b1": "background-color: #651",

  // purple
  "color: #6f42c1": "color: #8368aa",
  "background-color: #6f42c1": "background-color: #8368aa",

  "color: inherit": "color: inherit",
};

// list of URLs to pull stylesheets from
const urls = [
  {url: "https://github.com"},
  {url: "https://gist.github.com"},
  {url: "https://help.github.com"},
  {url: "https://developer.github.com"},
  // {url: "https://github.com/login", opts: {headers: {"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36"}}},
];

// list of additional style URLs to pull
const additionalStyleUrls = [
  "https://raw.githubusercontent.com/sindresorhus/refined-github/master/source/content.css",
  "https://raw.githubusercontent.com/sindresorhus/refined-github/master/source/options.css",
];

// list of regexes matching selectors that should be ignored
const ignoreSelectors = [
  /\.CodeMirror/,
  /\.cm-/, // CodeMirror
  /\.Box$/,
  /\.pl-/, // GitHub Pretty Lights Syntax highlighter
  /\spre$/,
  /:not\(li\.moved\)/,
  /^.Popover-message:before$/,
  /^.Popover-message:after$/,
];

// list of regexes matching selectors that shouldn't be merged with other
// selectors because they can generate invalid rules.
const unmergeableSelectors = [
  /(-moz-|-ms-|-o-|-webkit-).+/,
  /:selection|:placeholder$/,
];

// list of shorthand properties where values are compared insensitively
// to their order, e.g. "1px solid red" is equal to "1px red solid".
const shorthands = [
  "border",
  "border-left",
  "border-right",
  "border-top",
  "border-bottom",
  "background",
  "font"
];

// a device we optimize for, used to remove mobile-only media queries
const device = {
  type: "screen",
  width: "1024px",
};

const perfOpts = {
  maxSelectorLength: 76, // -4 because of indentation and to accomodate ' {'
  indentSize: 2,
};

const replaceRe = /.*begin auto-generated[\s\S]+end auto-generated.*/gm;
const cssFile = path.join(__dirname, "..", "github-dark.css");

async function writeOutput(generatedCss) {
  const css = await fs.readFile(cssFile, "utf8");
  await fs.writeFile(cssFile, css.replace(replaceRe, generatedCss));
}

async function extractStyleLinks(responses) {
  const styleUrls = [];
  for (const res of responses) {
    for (const href of extractStyleHrefs(await res.text())) {
      styleUrls.push(urlToolkit.buildAbsoluteURL(res.url, href));
    }
  }
  return styleUrls.concat(additionalStyleUrls);
}

function extractStyleHrefs(html) {
  return (html.match(/<link.+?>/g) || []).map(link => {
    const attrs = {};
    parse5.parseFragment(link).childNodes[0].attrs.forEach(attr => {
      attrs[attr.name] = attr.value;
    });
    if (attrs.rel === "stylesheet" && attrs.href) {
      return attrs.href;
    }
  }).filter(link => !!link);
}

function parseDeclarations(cssString) {
  const decls = {};
  const stylesheet = css.parse(cssString).stylesheet;

  stylesheet.rules.forEach(rule => {
    if (rule.type === "media" && mediaMatches(rule.media)) {
      rule.rules.forEach(rule => parseRule(decls, rule));
    }

    if (!rule.selectors || rule.selectors.length === 0) return;
    parseRule(decls, rule);
  });

  return decls;
}

function parseRule(decls, rule) {
  for (const decl of rule.declarations) {
    for (const mapping of Object.keys(mappings)) {
      if (!decl.value) continue;
      if (!decls[mapping]) decls[mapping] = [];
      const [prop, val] = mapping.split(": ");
      decl.value = decl.value.replace(/!important/g, "").trim(); // remove !important
      if (decl.property === prop && isEqualValue(prop, decl.value, val)) {
        rule.selectors.forEach(selector => {
          // Skip potentially unmergeable selectors
          // TODO: Use clean-css or similar to merge rules later instead
          if (unmergeableSelectors.some(re => re.test(selector))) return;
          // Skip ignored selectors
          if (ignoreSelectors.some(re => re.test(selector))) return;

          // stylistic tweaks
          selector = selector.replace(/::/g, ":");
          selector = selector.replace(/\+/g, " + ");
          selector = selector.replace(/~/g, " ~ ");
          selector = selector.replace(/>/g, " > ");
          selector = selector.replace(/ {2,}/g, " ");

          // add the new rule to our list, unless it's already on it
          if (!decls[mapping].includes(selector)) {
            decls[mapping].push(selector);
          }
        });
      }
    }
  }
}

function buildOutput(decls) {
  let output = "/* begin auto-generated rules - use tools/generate.js to generate them */\n";

  Object.keys(mappings).forEach(decl => {
    if (decls[decl].length) {
      output += `/* auto-generated rule for "${decl}" */\n`;
      const selectors = decls[decl].join(",");
      output += String(perfectionist.process(selectors + "{" + mappings[decl] + " !important}", perfOpts));
    } else {
      console.error(`Warning: no declarations for ${decl} found!`);
    }
  });
  output += "/* end auto-generated rules */";
  return output.split("\n").map(line => "  " + line).join("\n");
}

function isEqualValue(prop, a, b) {
  a = a.trim().toLowerCase();
  b = b.trim().toLowerCase();

  // try to ignore order in shorthands
  if (shorthands.includes(prop)) {
    return a.split(" ").sort().join(" ") === b.split(" ").sort().join(" ");
  } else {
    return a === b;
  }
}

function mediaMatches(query) {
  try {
    return cssMediaQuery.match(query, device);
  } catch (err) {
    // this library has a few bugs. In case of error, we include the rule.
    return true;
  }
}

function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}

async function main() {
  const links = await extractStyleLinks(await Promise.all(urls.map(u => fetch(u.url, u.opts))));
  const responses = await Promise.all(links.map(link => fetch(link).then(res => res.text())));
  const decls = parseDeclarations(responses.join("\n"));
  await writeOutput(buildOutput(decls));
}

main().then(exit).catch(exit);
