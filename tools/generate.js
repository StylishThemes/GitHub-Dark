#!/usr/bin/env node
"use strict";

const async     = require("async");
const got       = require("got");
const parseCss  = require("css").parse;
const parseHtml = require("parse5").parseFragment;
const perf      = require("perfectionist").process;

const mappings = {
  "color: #444d56": "color: #ccc",
  "color: #586069": "color: #bbb",
  "color: #6a737d": "color: #aaa",
  "background-color: #2cbe4e": "background: #163",
  "background-color: #6f42c1": "background: #6e5494",
  "background-color: #cb2431": "background: #911",
  "border: 1px solid rgba(27,31,35,0.15)": "border: 1px solid rgba(225,225,225,0.2)",
  "background-color: #fff5b1": "background-color: #261d08",
  "color: rgba(27,31,35,0.85)": "color: rgba(230,230,230,.85)",
};

const perfOpts = {
  maxSelectorLength: 78, // -2 because of indentation
  indentSize: 2,
};

pullCss("https://github.com", function(css) {
  const decls = [];
  parseCss(css).stylesheet.rules.forEach(function(rule) {
    if (!rule.selectors || rule.selectors.length === 0) return;
    rule.declarations.forEach(decl => {
      Object.keys(mappings).forEach(function(mapping) {
        const [prop, val] = mapping.split(": ");
        decl.value = decl.value.replace(/!important/g, "").trim(); // remove !important
        if (decl.property === prop && decl.value.toLowerCase() === val.toLowerCase()) {
          if (!decls[mapping]) decls[mapping] = [];
          rule.selectors.forEach(selector => {
            // TODO: create separate rules for each vendor-prefixed
            // rule because putting them together with other rules
            // would create invalid rules. Skipping them for now.
            if (selector[0] === ":") return;
            decls[mapping].push(selector);
          });
        }
      });
    });
  });

  let output = "/* auto-generated rules - use tools/generate.js to generate them */\n";
  Object.keys(mappings).forEach(function(decl) {
    output += `/* auto-generated rule for "${decl}" */\n`;

    // sort selectors
    const selectors = decls[decl].sort((a, b) => {
      return a.localeCompare(b);
    }).join(",");

    output += String(perf(selectors + "{" + mappings[decl] + " !important}", perfOpts));
  });
  output += "/* end auto-generated rules */\n";

  process.stdout.write(output);
  exit(0);
});

function pullCss(url, cb) {
  got(url).then(res => {
    var links = res.body.match(/<link.+>/g) || [];
    links = links.map(link => {
      const attrs = {};
      parseHtml(link).childNodes[0].attrs.forEach(function(attr) {
        attrs[attr.name] = attr.value;
      });
      if (attrs.rel === "stylesheet" && attrs.href) {
        return attrs.href;
      }
    }).filter(link => !!link);
    async.map(links, (link, cb) => {
      got(link).then(res => cb(null, res.body));
    }, function(_, css) {
      cb(css.join("\n"));
    });
  });
}

function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}
