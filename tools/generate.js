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
  "background: #dfe2e5": "background: #383838",
  "background: #d1d5da": "background: #404040",
  "background: #0366d6": "background: /*[[base-color]]*/ #4f8cc9",

  "background-color: #fff": "background-color: #181818",
  "background-color: #fafbfc": "background-color: #181818",
  "background-color: #f4f4f4": "background-color: #242424",
  "background-color: #eaecef": "background-color: #343434",
  "background-color: #e6ebf1": "background-color: #444",
  "background-color: #d6e2f1": "background-color: #444",
  "background-color: #d3e2f4": "background-color: #383838",
  "background-color: #d1d5da": "background-color: #404040",
  "background-color: #c6cbd1": "background-color: #484848",
  "background-color: #6a737d": "background-color: #303030",
  "background-color: #24292e": "background-color: #181818",

  // needs to be after #2cbe4e for .community-checklist .progress vs .progress-bar .progress
  "background-color: #f6f8fa": "background-color: #202020",
  "background: #f6f8fa": "background-color: #202020",

  "background-color: hsla(0,0%,100%,.125)": "background-color: hsla(0,0%,100%,.05)",
  "background-color: hsla(0,0%,100%,.175)": "background-color: hsla(0,0%,100%,.1)",

  // ==========================================================================
  // Border
  // ==========================================================================

  "border: 2px solid #fff": "border-color: #222",
  "border: 1px solid #eee": "border-color: #343434",
  "border: 1px solid #e1e4e8": "border-color: #343434",
  "border: 1px solid #d1d5da": "border-color: #404040",
  "border: 1px solid #c3c8cf": "border-color: #484848",

  // needs to come before the color variants so they take priority
  "border-top-color: transparent": "border-top-color: transparent",
  "border-bottom-color: transparent": "border-bottom-color: transparent",
  "border-right-color: transparent": "border-right-color: transparent",

  "border-color: #eaecef": "border-color: #343434",
  "border-color: #e1e4e8": "border-color: #343434",
  "border-color: #d1d5da": "border-color: #404040",

  "border: 1px solid #dfe2e5": "border-color: #343434",
  "border-bottom: 1px dashed #dfe2e5": "border-color: #343434",
  "border: 1px solid rgba(27,31,35,.1)": "border-color: rgba(200,200,200,.1)",

  "border: 1px solid rgba(27,31,35,.15)": "border-color: rgba(200,200,200,.15)",
  "border-top-color: rgba(27,31,35,.15)": "border-top-color: rgba(200,200,200,.15)",
  "border-bottom-color: rgba(27,31,35,.15)": "border-bottom-color: rgba(200,200,200,.15)",
  "border-left-color: rgba(27,31,35,.15)": "border-left-color: rgba(200,200,200,.15)",
  "border-right-color: rgba(27,31,35,.15)": "border-right-color: rgba(200,200,200,.15)",
  "border-top: 8px solid rgba(27,31,35,.15)": "border-top-color: rgba(200,200,200,.15)",

  "border-bottom-color: #e36209": "border-bottom-color: #eee",

  "border-bottom: 1px solid #f8f8f8": "border-bottom: 1px solid #343434",
  "border-bottom: 1px solid #dfe2e5": "border-bottom: 1px solid #343434",

  "border-top: 1px solid #e1e4e8": "border-top-color: #343434",
  "border-bottom: 1px solid #e1e4e8": "border-bottom-color: #343434",
  "border-left: 1px solid #e1e4e8": "border-left-color: #343434",
  "border-right: 1px solid #e1e4e8": "border-right-color: #343434",

  "border-top: 1px solid #eaecef": "border-top-color: #343434",
  "border-bottom: 1px solid #eaecef": "border-bottom-color: #343434",
  "border-left: 1px solid #eaecef": "border-left-color: #343434",
  "border-right: 1px solid #eaecef": "border-right-color: #343434",

  "border-top: 1px solid #d1d5da": "border-top-color: #404040",
  "border-bottom: 1px solid #d1d5da": "border-bottom-color: #404040",
  "border-left: 1px solid #d1d5da": "border-left-color: #404040",
  "border-right: 1px solid #d1d5da": "border-right-color: #404040",

  "border-top-color: #d1d5da": "border-top-color: #404040",
  "border-bottom-color: #d1d5da": "border-bottom-color: #404040",
  "border-right-color: #d1d5da": "border-right-color: #404040",

  "border-top: 1px solid #ddd": "border-top-color: #343434",
  "border-bottom: 1px solid #ddd": "border-bottom-color: #343434",
  "border-left: 1px solid #ddd": "border-left-color: #343434",
  "border-right: 1px solid #ddd": "border-right-color: #343434",

  "border-bottom-color: #f6f8fa": "border-bottom-color: #202020",
  "border-left-color: #f6f8fa": "border-left-color: #202020",
  "border-right-color: #f6f8fa": "border-right-color: #202020",

  "border-left: solid 2px #e6ebf1": "border-left-color: #343434",
  "border-bottom: solid 2px #e6ebf1": "border-bottom-color: #343434",

  "border-bottom-color: #fff": "border-bottom-color: #181818",
  "border-left-color: #fff": "border-left-color: #181818",
  "border-top-color: #fff": "border-top-color: #181818",
  "border-right-color: #fff": "border-right-color: #181818",

  "border-top: 7px solid #fff": "border-top-color: #181818",

  "border-color: #dfe2e5 #dfe2e5 #fff": "border-color: #484848",
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

  "box-shadow: inset 0 0 0 1px #c8e1ff": "box-shadow: inset 0 0 0 1px #6d7c9c",
  "box-shadow: 0 1px 5px rgba(27,31,35,.15)": "box-shadow: 0 1px 5px #000",

  "box-shadow: inset 0 0 0 1px #e1e4e8,0 2px 4px rgba(0,0,0,.15)": "box-shadow: inset 0 0 0 1px #555",
  "box-shadow: inset 0 0 0 1px #e1e4e8": "box-shadow: inset 0 0 0 1px #555",
  "box-shadow: inset 0 1px 0 0 #e1e4e8": "box-shadow: inset 0 1px 0 0 #555",
  // ==========================================================================
  // Color / Background
  // ==========================================================================

  "color: #05264c": "color: #bebebe", // big commit title
  "color: #333": "color: #bebebe",
  "color: #3c4146": "color: #bebebe",
  "color: #444d56": "color: #afafaf",
  "color: #1b1f23": "color: #afafaf",
  "color: #666"   : "color: #8e8e8e",
  "color: #6a737d": "color: #8e8e8e",
  "color: #959da5": "color: #757575",
  "color: #a3aab1": "color: #757575",
  "color: #c3c8cf": "color: #5a5a5a",
  "color: #c6cbd1": "color: #5a5a5a",
  "color: rgba(27,31,35,.85)": "color: rgba(230,230,230,.85)",
  "color: rgba(27,31,35,.3)": "color: rgba(230,230,230,.3)",
  "color: hsla(0,0%,100%,.5)": "color: hsla(0,0%,100%,.5)",
  "color: hsla(0,0%,100%,.6)": "color: hsla(0,0%,100%,.6)",
  "fill: #959da5": "fill: #757575",

  // needs to be after #333 for .btn vs .btn-outline
  "color: #0366d6": "color: /*[[base-color]]*/ #4f8cc9",
  "color: #1074e7": "color: /*[[base-color]]*/ #4f8cc9",
  // needs to be after #0366d3 for .btn-link vs .text-gray
  "color: #586069": "color: #949494",
  "color: rgba(88,96,105,.5)": "color: rgba(148,148,148,.5)",
  // needs to be after #0366d3 for .btn-link vs .text-gray-dark
  "color: #24292e": "color: #c2c2c2",
  "color: #2f363d": "color: #bebebe",

  // blue
  "color: #264c72": "color: #9daccc",
  "color: #032f62": "color: #9daccc",

  "background: #f1f8ff": "background: #182030",
  "background-color: #f1f8ff": "background-color: #182030",
  "background-color: #032f62": "background-color: #182030",
  "background-color: #dbedff": "background-color: #182030",
  "border-bottom-color: #f1f8ff": "border-bottom-color: #182030",
  "border-right-color: #f1f8ff": "border-right-color: #182030",

  "color: #c0d3eb": "color: #224466",
  "border-color: #c0d3eb": "border-color: #224466",
  "border-bottom-color: #c0d3eb": "border-bottom-color: #224466",
  "border-right-color: #c0d3eb": "border-right-color: #224466",

  // blue (base-color)
  "background-color: #0366d6": "background-color: /*[[base-color]]*/ #4f8cc9; color: #fff",
  "border-color: #0366d6": "border-color: /*[[base-color]]*/ #4f8cc9",
  "filter: drop-shadow(-.25em 0 0 #c8e1ff)": `
    filter: drop-shadow(-.25em 0 0 rgba(79,140,201,.3));
    filter: drop-shadow(-.25em 0 0 rgba(/*[[base-color-rgb]]*/, .3))
  `,
  "filter: drop-shadow(0 -.28em 0 #c8e1ff)": `
    filter: drop-shadow(0 -.28em 0 rgba(79,140,201,.3));
    filter: drop-shadow(0 -.28em 0 rgba(/*[[base-color-rgb]]*/, .3))
  `,
  "border: 1px solid #2188ff": "border-color: /*[[base-color]]*/ #4f8cc9",
  "border-color: #2188ff": "border-color: /*[[base-color]]*/ #4f8cc9",
  "border-bottom-color: #2188ff": "border-bottom-color: /*[[base-color]]*/ #4f8cc9",
  "border-right-color: #2188ff": "border-right-color: /*[[base-color]]*/ #4f8cc9",

  // red
  "color: #cb2431": "color: #f44",
  "color: #86181d": "color: #f44",
  "background-color: #d73a49": "background-color: #f44",
  "background-color: #cb2431": "background-color: #911",
  "background-color: #ffdce0": "background-color: #300",
  "fill: #cb2431": "fill: #f44",

  // orange
  "color: #a04100": "color: #f3582c",
  "background-color: #d15704": "background-color: #f3582c",
  "background: #fb8532": "background: #f3582c",

  // green
  "color: #28a745": "color: #6cc644",
  "color: #165c26": "color: #6cc644",
  "background-color: #28a745": "background-color: #6cc644",
  "background-color: #2cbe4e": "background-color: #163",
  "background-color: #dcffe4": "background-color: #002800",
  "fill: #2cbe4e": "fill: #6cc644",
  "border-color: #34d058": "border-color: #34d058",

  // yellow
  "color: rgba(47,38,6,.5)": "color: #cb4",
  "color: #b08800": "color: #cb4",
  "color: #735c0f": "color: #874",
  "background-color: #ffd33d": "background-color: #cb4",
  "background-color: #ffdf5d": "background-color: #cb4",
  "background: #fffbdd": "background: #261d08",
  "background-color: #fffbdd": "background-color: #261d08",
  "fill: #dbab09": "fill: #cb4",

  // light yellow
  "background-color: #fff5b1": "background-color: #651",

  // purple
  "color: #6f42c1": "color: #8368aa",
  "background-color: #6f42c1": "background-color: #8368aa",
  "background-color: #f8f4ff": "background-color: #213",
  "border: 1px solid #6f42c1": "border: 1px solid #8368aa",
  "border-color: #8a63d2": "border-color: #8368aa",

  "color: inherit": "color: inherit",
  "box-shadow: none": "box-shadow: none",
  "background: none": "background: none",
};

// list of sites to pull stylesheets from. Accepts fetch options. If `prefix`
// is  set, will prefix all selectors obtained from this source, unless they
// start with one of the selectors in `match`. If `url` ends with .css, will
// directly load that stylesheet.
const sources = [
  {url: "https://github.com"},
  {url: "https://gist.github.com"},
  {url: "https://help.github.com"},
  {
    url: "https://developer.github.com",
    prefix: "html[prefix]",
  },
  {
    url: "https://github.com/login",
    prefix: `body[class="page-responsive"]`,
    match: ["body", ".page-responsive"],
    opts: {headers: {"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36"}},
  },
  {
    url: "https://raw.githubusercontent.com/sindresorhus/refined-github/master/source/content.css",
    prefix: "html.refined-github",
  },
];

// list of regexes matching selectors that should be ignored
const ignoreSelectors = [
  /\.CodeMirror/,
  /\.cm-/, // CodeMirror
  /\.pl-/, // GitHub Pretty Lights Syntax highlighter
  /\spre$/,
  /:not\(li\.moved\)/,
  /^.Popover-message:before$/,
  /^.Popover-message:after$/,
  /^h[1-6] a$/, // weird styles from help.github.com
  /^\.bg-white$/,
  /^\.CircleBadge$/,
  /^table$/,
  /^.text-gray-dark$/,
  /^.markdown-body del$/, // this in not main page style
  /^.dashboard .js-all-activity-header \+ div$/, // weird background style from refined-github
];

// list of regexes matching selectors that shouldn't be merged with other
// selectors because they can generate invalid rules.
const unmergeableSelectors = [
  /(-moz-|-ms-|-o-|-webkit-).+/,
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

async function extractStyleLinks(res) {
  const styleUrls = [];
  for (const href of extractStyleHrefs(await res.text())) {
    styleUrls.push(urlToolkit.buildAbsoluteURL(res.url, href));
  }
  return styleUrls;
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
    for (const mapping of Object.keys(mappings)) {
      if (!decl.value) continue;

      let name = mapping;
      if (/!important$/.test((decl.value || "").trim())) {
        name = `${mapping} !important`;
      }

      if (!decls[name]) decls[name] = [];

      const [prop, val] = mapping.split(": ");
      if (decl.property === prop && isEqualValue(prop, decl.value, val)) {
        rule.selectors.forEach(selector => {
          // Skip potentially unmergeable selectors
          // TODO: Use clean-css or similar to merge rules later instead
          if (unmergeableSelectors.some(re => re.test(selector))) return;

          // Skip ignored selectors
          if (ignoreSelectors.some(re => re.test(selector))) return;

          // stylistic tweaks
          selector = selector.replace(/\+/g, " + ");
          selector = selector.replace(/~/g, " ~ ");
          selector = selector.replace(/>/g, " > ");
          selector = selector.replace(/ {2,}/g, " ");

          // add prefix
          if (opts.prefix) {
            // skip adding a prefix if it matches a selector in `match`
            let skip = false;
            if (opts.match) {
              for (const matchSelector of opts.match) {
                if (selector.split(/\s+/)[0].includes(matchSelector)) {
                  skip = true;
                  break;
                }
              }
            }

            if (!skip) {
              selector = `${opts.prefix} ${selector}`;
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
}

function format(css) {
  return String(perfectionist.process(css, perfOpts));
}

function buildOutput(decls) {
  let output = "/* begin auto-generated rules - use tools/generate.js to generate them */\n";

  for (const [fromValue, toValue] of Object.entries(mappings)) {
    const normalSelectors = decls[fromValue];
    const importantSelectors = decls[`${fromValue} !important`];

    if (normalSelectors.length) {
      const newValue = toValue.trim().replace(/;$/, "");
      output += `/* auto-generated rule for "${fromValue}" */\n`;
      output += format(`${normalSelectors.join(",")} {${newValue};}`);
    }

    if (importantSelectors.length) {
      const newValue = toValue.trim().replace(/;$/, "").split(";").map(v => `${v} !important`).join(";");
      output += `/* auto-generated rule for "${fromValue} !important" */\n`;
      output += format(`${importantSelectors.join(",")} {${newValue};}`);
    }

    if (!normalSelectors.length && !importantSelectors.length) {
      console.error(`Warning: no declarations for ${fromValue} found!`);
    }
  }
  output += "/* end auto-generated rules */";
  return output.split("\n").map(line => "  " + line).join("\n");
}

function isEqualValue(prop, a, b) {
  a = a.replace(/!important$/g, "").trim().toLowerCase();
  b = b.replace(/!important$/g, "").trim().toLowerCase();

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
  const sourceResponses = await Promise.all(sources.map(source => {
    return source.url.endsWith(".css") ? null : fetch(source.url, source.opts);
  }));

  for (const [index, response] of Object.entries(sourceResponses)) {
    const source = sources[index];
    if (response) {
      source.styles = await extractStyleLinks(response);
    } else {
      source.styles = [source.url];
    }
  }

  const cssResponses = await Promise.all(sources.map(source => {
    return Promise.all(source.styles.map(url => fetch(url).then(res => res.text())));
  }));

  for (const [index, responses] of Object.entries(cssResponses)) {
    sources[index].css = responses.join("\n");
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
