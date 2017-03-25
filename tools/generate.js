"use strict";

const async     = require("async");
const got       = require("got");
const parseCss  = require("css").parse;
const parseHtml = require("parse5").parseFragment;
const perf      = require("perfectionist").process;

const mappings = {
  "color: #586069": "color: #999 !important",
  "color: #6a737d": "color: #888 !important",
};

const perfOpts = {
  maxSelectorLength: 78, // -2 because of indentation
};

pullCss("https://github.com", function(css) {
  const decls = [];
  parseCss(css).stylesheet.rules.forEach(function(rule) {
    if (!rule.selectors || rule.selectors.length === 0) return;
    rule.declarations.forEach(decl => {
      Object.keys(mappings).forEach(function(mapping) {
        const [prop, val] = mapping.split(": ");
        if (decl.property === prop && decl.value.toLowerCase() === val.toLowerCase()) {
          if (!decls[mapping]) decls[mapping] = [];
          rule.selectors.forEach(selector => {
            if (selector[0] === ":") return; // skip pseudos
            decls[mapping].push(selector);
          });
        }
      });
    });
  });

  let output = "";
  Object.keys(decls).forEach(function(decl) {
    output += `/* auto-generated rule for "${decl}" */\n`;
    output += String(perf(decls[decl].join(",") + "{" + mappings[decl] + "}", perfOpts));
  });

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
    }).filter(link => Boolean(link));
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
