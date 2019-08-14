#!/usr/bin/env node
"use strict";

const css = require("css");
const cssMediaQuery = require("css-mediaquery");
const doFetch = require("make-fetch-happen");
const fs = require("fs").promises;
const parse5 = require("parse5");
const path = require("path");
const perfectionist = require("perfectionist");
const urlToolkit = require("url-toolkit");
const unzipper = require("unzipper");

// This list maps old declarations to new ones. Ordering is significant.
// $ indicates a special value that will generate a set of rules.
let mappings = {
  // ==========================================================================
  // Background
  // ==========================================================================
  "$background: #fff":    "#181818",
  "$background: #ffe":    "#242424",
  "$background: #fdfdfd": "#1c1c1c",
  "$background: #fafbfc": "#181818",
  "$background: #f8f8f8": "#202020", // zenhub
  "$background: #f6f8fa": "#202020",
  "$background: #f4f5f5": "#242424", // zenhub
  "$background: #f4f4f4": "#242424",
  "$background: #eff3f6": "#343434",
  "$background: #eaecef": "#343434",
  "$background: #e6ebf1": "#444",
  "$background: #e1e4e8": "#343434",
  "$background: #e9e9e9": "#343434", // zenhub
  "$background: #dfe2e5": "#383838",
  "$background: #d6e2f1": "#444",
  "$background: #d3e2f4": "#383838",
  "$background: #d1d5da": "#404040",
  "$background: #c6cbd1": "#484848",
  "$background: #6a737d": "#303030",
  "$background: #24292e": "#181818",
  "$background: #f9f9f9": "#181818",
  "$background: #4183C4": "/*[[base-color]]*/ #4f8cc9",
  "$background: hsla(0,0%,100%,.125)": "hsla(0,0%,100%,.05)",
  "$background: hsla(0,0%,100%,.175)": "hsla(0,0%,100%,.1)",
  "$background: linear-gradient(180deg,rgba(242,248,254,0),rgba(242,248,254,.47))": "linear-gradient(180deg,#181818,#181818)",

  // ==========================================================================
  // Border
  // ==========================================================================
  "$border: transparent": "transparent", // needs to come before the color variants

  "$border: rgba(27,31,35,.1)": "rgba(200,200,200,.1)",
  "$border: rgba(27,31,35,.15)": "rgba(200,200,200,.15)",
  "$border: rgba(0,0,0,.125)": "rgba(200,200,200,.125)",

  "$border: #959da5": "#484848",
  "$border: #c3c8cf": "#484848",
  "$border: #dfe2e5": "#343434",
  "$border: #d1d5da": "#404040",
  "$border: #ddd":    "#343434",
  "$border: #e1e4e8": "#343434",
  "$border: #e6ebf1": "#343434",
  "$border: #e9e9e9": "#343434", // zenhub
  "$border: #eaecef": "#343434",
  "$border: #eee":    "#343434",
  "$border: #f6f8fa": "#202020",
  "$border: #f8f8f8": "#343434",
  "$border: #fff":    "#181818",

  "border-top: 8px solid rgba(27,31,35,.15)": "border-top-color: rgba(200,200,200,.15)",
  "border-bottom-color: #e36209": "border-bottom-color: #eee",

  "border: 1px solid": "border-color: #181818",
  "border-top: 7px solid #fff": "border-top-color: #181818",
  "border-color: #dfe2e5 #dfe2e5 #fff": "border-color: #343434 #343434 #181818",

  // ==========================================================================
  // Box-Shadow
  // ==========================================================================

  "box-shadow: 0 0 0 .2em rgba(3,102,214,.3)": `
     box-shadow: 0 0 0 2px rgba(79,140,201,.3);
     box-shadow: 0 0 0 2px rgba(/*[[base-color-rgb]]*/, .3);
  `,

  "box-shadow: 0 0 0 .2em #c8e1ff": `
     box-shadow: 0 0 0 2px rgba(79,140,201,.3);
     box-shadow: 0 0 0 2px rgba(/*[[base-color-rgb]]*/, .3);
  `,

  "box-shadow: inset 0 1px 2px rgba(27,31,35,.075),0 0 0 .2em rgba(3,102,214,.3)": `
    box-shadow: 0 0 0 2px rgba(79,140,201,.3);
    box-shadow: 0 0 0 2px rgba(/*[[base-color-rgb]]*/, .3);
  `,

  "box-shadow: 0 1px 0 0 rgba(16,116,231,.5)": `
    box-shadow: 0 1px 0 0 rgba(79,140,201,.5);
    box-shadow: 0 1px 0 0 rgba(/*[[base-color-rgb]]*/, .5);
  `,

  "box-shadow: 0 1px 0 0 #1074e7": `
    box-shadow: 0 1px 0 0 #4f8cc9;
    box-shadow: 0 1px 0 0 /*[[base-color]]*/;
  `,

  "box-shadow: 0 0 0 .2em rgba(203,36,49,.4)": "box-shadow: 0 0 0 .2em rgba(255,68,68,.4)",

  "box-shadow: 0 1px 5px rgba(27,31,35,.15)": "box-shadow: 0 1px 5px #000",

  "box-shadow: inset 0 0 0 1px #e1e4e8,0 2px 4px rgba(0,0,0,.15)": "box-shadow: inset 0 0 0 1px #555",
  "box-shadow: inset 0 0 0 1px #e1e4e8": "box-shadow: inset 0 0 0 1px #555",
  "box-shadow: inset 0 1px 0 0 #e1e4e8": "box-shadow: inset 0 1px 0 0 #555",

  "box-shadow: inset 0 -1px 0 #c6cbd1": "box-shadow: inset 0 -2px 0 #343434",
  "box-shadow: inset 0 -1px 0 #959da5": "box-shadow: inset 0 -2px 0 #343434",

  "box-shadow: 0 1px 0 0 #0058a2": "box-shadow: 0 1px 0 0 /*[[base-color]]*/ #4f8cc9",

  // ==========================================================================
  // Color / Background
  // ==========================================================================

  "fill: currentColor": "fill: currentColor", // needs to come before color variants

  "color: #05264c": "color: #bebebe", // big commit title
  "color: #333"   : "color: #bebebe",
  "color: #3c4146": "color: #bebebe",
  "color: #444d56": "color: #afafaf",
  "color: #1b1f23": "color: #afafaf",
  "color: #586069": "color: #afafaf",
  "color: #666"   : "color: #949494",
  "color: #6a737d": "color: #949494",
  "color: #959da5": "color: #757575",
  "color: #767676": "color: #767676",
  "color: #a3aab1": "color: #757575",
  "color: #c3c8cf": "color: #5a5a5a",
  "color: #c6cbd1": "color: #5a5a5a",
  "color: #d1d5da": "color: #404040",
  "color: #4183C4": `
    color: rgba(79,140,201,.9);
    color: rgba(/*[[base-color-rgb]]*/,.9);
  `,
  "color: #005b9e": `
    color: rgba(79,140,201,1);
    color: rgba(/*[[base-color-rgb]]*/,1);
  `,
  "color: rgba(27,31,35,.6)": "color: #9daccc",
  "color: rgba(27,31,35,.85)": "color: rgba(230,230,230,.85)",
  "color: rgba(27,31,35,.7)": "color: rgba(230,230,230,.7)",
  "color: rgba(27,31,35,.3)": "color: rgba(230,230,230,.3)",
  "color: hsla(0,0%,100%,.5)": "color: hsla(0,0%,100%,.5)",
  "color: hsla(0,0%,100%,.6)": "color: hsla(0,0%,100%,.6)",
  "color: hsla(0,0%,100%,.75)": "color: hsla(0,0%,100%,.75)",

  "fill: #959da5": "fill: #757575",

  "color: #0366d6": "color: /*[[base-color]]*/ #4f8cc9", // needs to be after #333
  "color: #1074e7": "color: /*[[base-color]]*/ #4f8cc9",
  "color: rgba(88,96,105,.5)": "color: rgba(148,148,148,.5)",
  "color: #24292e": "color: #d2d2d2",
  "color: #2f363d": "color: #bebebe",

  // blue
  "color: #264c72": "color: #9daccc",
  "color: #032f62": "color: #9daccc",
  "$background: #f1f8ff": "#182030",
  "$background: #032f62": "#182030",
  "$background: #dbedff": "#182030",
  "$border: #f1f8ff": "#182030",
  "color: #c0d3eb": "color: #224466",
  "$background: #c8e1ff": "#224466",
  "$border: #c8e1ff": "#224466",
  "$border: #c0d3eb": "#224466",
  "$background: #0361cc": "#182030",
  "$background: linear-gradient(-180deg,#0679fc,#0361cc 90%)": "linear-gradient(to bottom,#283040,#182030)",
  "$background: linear-gradient(90deg,#257bf9,#2426ca)": "linear-gradient(90deg,#283040,#182030)",

  // blue (base-color)
  "color: #327fc7": "color: /*[[base-color]]*/ #4f8cc9",
  "color: #b4d6fe": "color: /*[[base-color]]*/ #4f8cc9", // github hovercard
  "$background: #0366d6": "/*[[base-color]]*/ #4f8cc9; color: #fff",
  "$border: #0366d6": "/*[[base-color]]*/ #4f8cc9",
  "$border: #1074e7": "/*[[base-color]]*/ #4f8cc9",
  "filter: drop-shadow(-.25em 0 0 #c8e1ff)": `
    filter: drop-shadow(-.25em 0 0 rgba(79,140,201,.3));
    filter: drop-shadow(-.25em 0 0 rgba(/*[[base-color-rgb]]*/, .3))
  `,
  "filter: drop-shadow(0 -.28em 0 #c8e1ff)": `
    filter: drop-shadow(0 -.28em 0 rgba(79,140,201,.3));
    filter: drop-shadow(0 -.28em 0 rgba(/*[[base-color-rgb]]*/, .3))
  `,
  "$border: #2188ff": "/*[[base-color]]*/ #4f8cc9",
  "$background: linear-gradient(#54a3ff,#006eed)": "linear-gradient(/*[[base-color]]*/ #4f8cc9, /*[[base-color]]*/ #4f8cc9)", // notification icon
  "color: #cce888": "color: /*[[base-color]]*/ #4f8cc9", // https://github.com/StylishThemes/GitHub-Dark/issues/954

  // red
  "color: #cb2431": "color: #f44",
  "color: #86181d": "color: #f44",
  "$background: #d73a49": "#f44",
  "$background: #cb2431": "#911",
  "$background: #ffdce0": "#300",
  "fill: #cb2431": "fill: #f44",
  "$border: #d73a49": "#b00",
  "$border: #cea0a5": "#f44",

  // orange
  "color: #a04100": "color: #f3582c",
  "$background: #d15704": "#f3582c",
  "$background: #fb8532": "#f3582c",

  // green
  "color: #28a745": "color: #6cc644",
  "color: #165c26": "color: #6cc644",
  "$background: #28a745": "#6cc644",
  "$background: #2cbe4e": "#163",
  "$background: #dcffe4": "#002800",
  "$background: rgba(108,198,68,.1)": "#002800",
  "fill: #2cbe4e": "fill: #6cc644",
  "$border: #34d058": "#34d058",
  "background: linear-gradient(#34d058, #28a745)": "background: linear-gradient(#34d058, #28a745)", // refined github

  // yellow
  "color: rgba(47,38,6,.5)": "color: #cb4",
  "color: rgba(115,92,15,.5)": "color: rgba(204,187,68,.5)",
  "color: #b08800": "color: #cb4",
  "color: #735c0f": "color: #bba257",
  "color: #613A00": "color: #bba257",
  "$background: #ffd33d": "#cb4",
  "$background: #ffdf5d": "#cb4",
  "$background: #fffdef": "#261d08",
  "$background: #fffbdd": "#261d08",
  "fill: #dbab09": "fill: #cb4",
  "$border: #fffbdd": "#321",
  "$border: #ffdf5d": "#321",
  "$border: #d9d0a5": "#542",
  "$border: #dca874": "#542",
  "$border: #e5d999": "#542",

  // light yellow
  "$background: #fff5b1": "#651",

  // purple
  "color: #6f42c1": "color: #8368aa",
  "$background: #6f42c1": "#8368aa",
  "$background: #f8f4ff": "#213",
  "$background: #f5f0ff": "#213",
  "$border: #6f42c1": "#8368aa",
  "$border: #8a63d2": "#8368aa",
  "$border: #5e60ba": "#8368aa", // zenhub

  "text-shadow: 0 1px 0 #fff": "text-shadow: none", // zenhub

  "$background: rgba(0,0,0,.8)": "#242424", // github hovercard
  "$border: rgba(0,0,0,.8)": "#242424", // github hovercard

  "color: inherit": "color: inherit",
  "box-shadow: none": "box-shadow: none",
  "$background: transparent": "transparent",

  // not using $background to remap invalid 'background-color: none'
  "background: none": "background: none",
  "background-color: none": "background-color: transparent",
  "background-image: none": "background-image: none",
};

// list of sources to pull stylesheets from. Accepts fetch options. If `prefix`
// is  set, will prefix all selectors obtained from this source, unless they
// start with one of the selectors in `match`. If `url` ends with .css, will
// directly load that stylesheet. `crx` refers so a Chrome extension id and can
// be used in place of `url`.
const sources = [
  {url: "https://github.com"},
  {url: "https://gist.github.com"},
  {url: "https://help.github.com"},
  {url: "https://developer.github.com", prefix: "html[prefix]"},
  {
    url: "https://www.githubstatus.com/",
    prefix: "body.status",
    match: ["body", ".status"],
  },
  {
    url: "https://github.com/login",
    prefix: `body[class="page-responsive"]`,
    match: ["body", ".page-responsive"],
    opts: {headers: {"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36"}},
  },
  {
    url: "https://render.githubusercontent.com/view/pdf?enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f74706e2f706466732f623037326638386234633836303762343561303866386236393331633037313630623462316466382f41253230436f75727365253230696e2532304d616368696e652532304c6561726e696e672532302863696d6c2d76305f392d616c6c292e706466",
    prefix: "body[data-render-url]",
    match: ["body", "[data-render-url]"],
  },
  {
    crx: "hlepfoohegkhhmjieoechaddaejaokhf", // refined-github
    prefix: `html.refined-github`,
    match: ["html", ".refined-github"],
  },
  {
    crx: "ogcgkffhplmphkaahpmffcafajaocjbd", // zenhub
    prefix: `body.zh_logged_in`,
    match: ["body", ".zh_logged_in"],
  },
  {
    crx: "mmoahbbnojgkclgceahhakhnccimnplk", // github hovercard
    files: ["hovercard.css", "tooltipster.css"],
    prefix: `html.ghh-theme-classic`,
    match: ["html", ".ghh-theme-"],
  },
];

// list of regexes matching selectors that should be ignored
// TODO: every selector should be validated against W3C rules
const ignoreSelectors = [
  /\.CodeMirror/,
  /\.cm-/, // CodeMirror
  /\.pl-/, // GitHub Pretty Lights Syntax highlighter
  /\spre$/,
  /^.Popover-message:before$/,
  /^.Popover-message:after$/,
  /^h[1-6] a$/, // conflicting styles from help.github.com
  /^\.bg-white$/,
  /^\.CircleBadge$/,
  /^table$/,
  /^.text-gray-dark$/,
  /^.markdown-body del$/, // this in not main page style
  /:(before|after).+/, // invalid pseudo-elements, they must come last in a chain of
  /:not\(li\.moved\)/, // invalid :not content (not a simple selector)
];

// list of shorthand properties where values are compared insensitively
// to their order, e.g. "1px solid red" is equal to "1px red solid".
const shorthands = [
  "background",
  "border",
  "border-bottom",
  "border-left",
  "border-right",
  "border-top",
  "box-shadow",
  "font",
  "text-shadow",
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

let mappingKeys;

async function fetch(...args) {
  if (process.argv.includes("-v")) console.info(`fetch ${args[0]}`);
  const result = await doFetch(...args);
  if (process.argv.includes("-v")) console.info(`done ${args[0]}`);
  return result;
}

async function writeOutput(generatedCss) {
  const css = await fs.readFile(cssFile, "utf8");
  await fs.writeFile(cssFile, css.replace(replaceRe, generatedCss));
}

async function extract(res) {
  const styleUrls = [];
  const inlineStyles = [];
  const html = await res.text();

  for (const href of extractStyleHrefs(html)) {
    styleUrls.push(urlToolkit.buildAbsoluteURL(res.url, href));
  }
  for (const style of extractInlineStyles(html)) {
    inlineStyles.push(style);
  }

  return [styleUrls, inlineStyles];
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

function extractInlineStyles(html) {
  return (html.match(/<style.*?>([\s\S]*?)<\/style>/g) || []).map(style => {
    return parse5.parseFragment(style).childNodes[0].childNodes[0].value.trim();
  }).filter(css => !!css);
}

function parseDeclarations(cssString, opts) {
  const decls = {};
  const stylesheet = css.parse(cssString).stylesheet;

  stylesheet.rules.forEach(rule => {
    if (rule.type === "media" && mediaMatches(rule.media)) {
      rule.rules.forEach(rule => parseRule(decls, rule, opts));
    }

    if (!rule.selectors || rule.selectors.length === 0) return;
    parseRule(decls, rule, opts);
  });

  return decls;
}

function parseRule(decls, rule, opts) {
  for (const decl of rule.declarations) {
    if (!decl.value) continue;
    for (const mapping of mappingKeys) {
      const [prop, val] = mapping.split(": ");
      if (decl.property !== prop) continue;
      if (!isEqualValue(prop, decl.value, val)) continue;

      let name = mapping;
      if (decl.value.trim().endsWith("!important")) {
        name = `${mapping} !important`;
      }

      if (!decls[name]) decls[name] = [];

      rule.selectors.forEach(selector => {
        // Skip ignored selectors
        if (ignoreSelectors.some(re => re.test(selector))) return;

        // stylistic tweaks
        selector = selector.replace(/\+/g, " + ");
        selector = selector.replace(/~/g, " ~ ");
        selector = selector.replace(/>/g, " > ");
        selector = selector.replace(/ {2,}/g, " ");
        selector = selector.replace(/'/g, `"`);

        // add prefix
        if (opts.prefix) {
          // skip adding a prefix if it matches a selector in `match`
          let skip = false;
          if (opts.match) {
            for (const match of opts.match) {
              const first = selector.split(/\s+/)[0];
              if ((/^[.#]+/.test(first) && first === match) || first.startsWith(match)) {
                skip = true;
                break;
              }
            }
          }

          if (!skip) {
            // incomplete check to avoid generating invalid "html :root" selectors
            if (selector.startsWith(":root ") && opts.prefix.startsWith("html")) {
              selector = `${opts.prefix} ${selector.substring(":root ".length)}`;
            } else {
              selector = `${opts.prefix} ${selector}`;
            }
          }
        }

        // add the new rule to our list, unless it's already on it
        if (!decls[name].includes(selector)) {
          decls[name].push(selector);
        }
      });
    }
  }
}

function format(css) {
  return String(perfectionist.process(css, perfOpts));
}

function unmergeables(selectors) {
  return selectors.filter(selector => /-(moz|ms|webkit)-.+/.test(selector));
}

function unmergeableRules(selectors, value) {
  let ret = "";
  const moz = [];
  const webkit = [];
  const ms = [];
  const other = [];

  for (const selector of selectors) {
    if (selector.includes("-moz-")) moz.push(selector);
    else if (selector.includes("-webkit-")) webkit.push(selector);
    else if (selector.includes("-ms-")) ms.push(selector);
    else other.push(selector);
  }

  if (moz.length) ret += format(`${moz.join(", ")} {${value};}`);
  if (webkit.length) ret += format(`${webkit.join(", ")} {${value};}`);
  if (ms.length) ret += format(`${ms.join(", ")} {${value};}`);
  if (other.length) ret += format(`${other.join(", ")} {${value};}`);

  return ret;
}

function buildOutput(decls) {
  let output = "/* begin auto-generated rules - use tools/generate.js to generate them */\n";

  for (const [fromValue, toValue] of Object.entries(mappings)) {
    let normalSelectors = decls[fromValue];
    let importantSelectors = decls[`${fromValue} !important`];

    if (normalSelectors && normalSelectors.length) {
      const newValue = toValue.trim().replace(/;$/, "");
      const normalUnmergeables = unmergeables(normalSelectors);

      if (normalUnmergeables.length) {
        normalSelectors = normalSelectors.filter(selector => !normalUnmergeables.includes(selector));
      }
      if (normalSelectors.length || normalUnmergeables.length) {
        output += `/* auto-generated rule for "${fromValue}" */\n`;
      }
      if (normalSelectors.length) output += format(`${normalSelectors.join(",")} {${newValue};}`);
      if (normalUnmergeables.length) output += unmergeableRules(normalUnmergeables, newValue);
    }

    if (importantSelectors && importantSelectors.length) {
      const newValue = toValue.trim().replace(/;$/, "").split(";").map(v => `${v} !important`).join(";");
      const importantUnmergeables = unmergeables(importantSelectors);

      if (importantUnmergeables.length) {
        importantSelectors = importantSelectors.filter(selector => !importantUnmergeables.includes(selector));
      }
      if (importantSelectors.length || importantUnmergeables.length) {
        output += `/* auto-generated rule for "${fromValue} !important" */\n`;
      }
      if (importantSelectors.length) output += format(`${importantSelectors.join(",")} {${newValue};}`);
      if (importantUnmergeables.length) output += unmergeableRules(importantUnmergeables, newValue);
    }
  }
  output += "/* end auto-generated rules */";
  return output.split("\n").map(line => "  " + line).join("\n");
}

function normalize(value) {
  return value
    // remove !important and trim whitespace
    .replace(/!important$/g, "").trim().toLowerCase()
    // remove leading zeroes on values like 'rgba(27,31,35,0.075)'
    .replace(/0(\.[0-9])/g, (_, val) => val)
    // normalize 'linear-gradient(-180deg, #0679fc, #0361cc 90%)' to not have whitespace in parens
    .replace(/([a-z-]+\()(.+)(\))/g, (_, m1, m2, m3) => `${m1}${m2.replace(/,\s+/g, ",")}${m3}`);
}

function isEqualValue(prop, a, b) {
  // try to ignore order in shorthands
  if (shorthands.includes(prop)) {
    return normalize(a).split(" ").sort().join(" ") === normalize(b).split(" ").sort().join(" ");
  } else {
    return normalize(a) === normalize(b);
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

function prepareMappings(mappings) {
  const newMappings = {};
  for (const [key, value] of Object.entries(mappings)) {
    if (key.startsWith("$border: ")) {
      const oldValue = key.substring("$border: ".length);
      newMappings[`border: solid ${oldValue}`] = `border-color: ${value}`;
      newMappings[`border: 1px solid ${oldValue}`] = `border-color: ${value}`;
      newMappings[`border: 1px dashed ${oldValue}`] = `border-color: ${value}`;
      newMappings[`border: 2px solid ${oldValue}`] = `border-color: ${value}`;
      newMappings[`border: 2px dashed ${oldValue}`] = `border-color: ${value}`;
      newMappings[`border: 5px solid ${oldValue}`] = `border-color: ${value}`;
      newMappings[`border-color: ${oldValue}`] = `border-color: ${value}`;
      newMappings[`border-top: 1px solid ${oldValue}`] = `border-top-color: ${value}`;
      newMappings[`border-bottom: 1px solid ${oldValue}`] = `border-bottom-color: ${value}`;
      newMappings[`border-left: 1px solid ${oldValue}`] = `border-left-color: ${value}`;
      newMappings[`border-right: 1px solid ${oldValue}`] = `border-right-color: ${value}`;
      newMappings[`border-top: 1px dashed ${oldValue}`] = `border-top-color: ${value}`;
      newMappings[`border-bottom: 1px dashed ${oldValue}`] = `border-bottom-color: ${value}`;
      newMappings[`border-left: 1px dashed ${oldValue}`] = `border-left-color: ${value}`;
      newMappings[`border-right: 1px dashed ${oldValue}`] = `border-right-color: ${value}`;
      newMappings[`border-top: 2px solid ${oldValue}`] = `border-top-color: ${value}`;
      newMappings[`border-bottom: 2px solid ${oldValue}`] = `border-bottom-color: ${value}`;
      newMappings[`border-left: 2px solid ${oldValue}`] = `border-left-color: ${value}`;
      newMappings[`border-right: 2px solid ${oldValue}`] = `border-right-color: ${value}`;
      newMappings[`border-top: 2px dashed ${oldValue}`] = `border-top-color: ${value}`;
      newMappings[`border-bottom: 2px dashed ${oldValue}`] = `border-bottom-color: ${value}`;
      newMappings[`border-left: 2px dashed ${oldValue}`] = `border-left-color: ${value}`;
      newMappings[`border-right: 2px dashed ${oldValue}`] = `border-right-color: ${value}`;
      newMappings[`border-top: 3px solid ${oldValue}`] = `border-top-color: ${value}`;
      newMappings[`border-bottom: 3px solid ${oldValue}`] = `border-bottom-color: ${value}`;
      newMappings[`border-left: 3px solid ${oldValue}`] = `border-left-color: ${value}`;
      newMappings[`border-right: 3px solid ${oldValue}`] = `border-right-color: ${value}`;
      newMappings[`border-top: 5px solid ${oldValue}`] = `border-top-color: ${value}`;
      newMappings[`border-bottom: 5px solid ${oldValue}`] = `border-bottom-color: ${value}`;
      newMappings[`border-left: 5px solid ${oldValue}`] = `border-left-color: ${value}`;
      newMappings[`border-right: 5px solid ${oldValue}`] = `border-right-color: ${value}`;
      newMappings[`border-top-color: ${oldValue}`] = `border-top-color: ${value}`;
      newMappings[`border-bottom-color: ${oldValue}`] = `border-bottom-color: ${value}`;
      newMappings[`border-left-color: ${oldValue}`] = `border-left-color: ${value}`;
      newMappings[`border-right-color: ${oldValue}`] = `border-right-color: ${value}`;
    } else if (key.startsWith("$background: ")) {
      const oldValue = key.substring("$background: ".length);
      newMappings[`background: ${oldValue}`] = `background: ${value}`;
      newMappings[`background-color: ${oldValue}`] = `background-color: ${value}`;
      newMappings[`background-image: ${oldValue}`] = `background-image: ${value}`;
    } else {
      newMappings[key] = value;
    }
  }
  return newMappings;
}

async function extensionCss(source) {
  const id = source.crx;
  let css = "";

  const res = await fetch(`https://clients2.google.com/service/update2/crx?response=redirect&prodversion=74.0&x=id%3D${id}%26installsource%3Dondemand%26uc`);
  if (!res.ok) throw new Error(res.statusText);

  const buffer = await res.buffer();
  const dir = await unzipper.Open.buffer(buffer, {crx: true});
  const files = {};

  for (const file of dir.files) {
    files[file.path] = file;
  }

  if (!files["manifest.json"]) {
    throw new Error(`manifest.json not found in chrome extension ${id}`);
  }

  const manifest = JSON.parse(String(await files["manifest.json"].buffer()));

  for (const script of manifest.content_scripts || []) {
    if (!Array.isArray(script.css)) continue;
    for (const file of script.css) {
      if (Object.keys(files).includes(file)) {
        css += String(await files[file].buffer()) + "\n";
      }
    }
  }

  for (const file of source.files || []) {
    if (Object.keys(files).includes(file)) {
      css += String(await files[file].buffer()) + "\n";
    }
  }

  return css;
}

async function main() {
  mappings = prepareMappings(mappings);
  mappingKeys = Object.keys(mappings);

  const sourceResponses = await Promise.all(sources.map(source => {
    if (!source.url) return null;
    return source.url.endsWith(".css") ? null : fetch(source.url, source.opts);
  }));

  for (const [index, response] of Object.entries(sourceResponses)) {
    const source = sources[index];
    if (response) {
      const [styleUrls, inlineStyles] = await extract(response);
      source.styles = styleUrls;
      source.inlineStyles = inlineStyles;
    } else if (source.url) {
      source.styles = [source.url];
    }
  }

  const cssResponses = await Promise.all(sources.map(source => {
    if (!source.url) return null;
    return Promise.all(source.styles.map(url => fetch(url).then(res => res.text())));
  }));

  for (const [index, responses] of Object.entries(cssResponses)) {
    if (sources[index].crx) {
      sources[index].css = await extensionCss(sources[index]);
    } else {
      sources[index].css = responses.join("\n");
      if (sources[index].inlineStyles.length) {
        sources[index].css += "\n" + sources[index].inlineStyles.join("\n");
      }
    }
  }

  const decls = {};
  for (const source of sources) {
    const opts = {prefix: source.prefix, match: source.match};
    for (const [key, values] of Object.entries(parseDeclarations(source.css, opts))) {
      if (!decls[key]) decls[key] = [];
      decls[key].push(...values);
      decls[key] = Array.from(new Set(decls[key]));
    }
  }

  await writeOutput(buildOutput(decls));
}

main().then(exit).catch(exit);
