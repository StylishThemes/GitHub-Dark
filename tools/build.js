#!/usr/bin/env node
"use strict";

const esc = require("escape-string-regexp");
const fetchCss = require("fetch-css");
const remapCss = require("remap-css");
const {readFile, readdir} = require("fs").promises;
const {resolve, basename} = require("path");

const mappings = require("../src/generator-mappings");
const sources = require("../src/generator-sources");
const ignoreSelectors = require("../src/generator-ignores");
const {version} = require("../package.json");
const {writeFile, exit, glob} = require("./utils");

const remapOpts = {
  ignoreSelectors,
  indentCss: 2,
  lineLength: 76,
  comments: true,
  stylistic: true,
  validate: true,
};

const sourceFiles = glob("src/*.css").sort((a, b) => {
  if (a.endsWith("main.css")) return -1;
  if (b.endsWith("main.css")) return 1;
  if (a.endsWith("base.css")) return -1;
  if (b.endsWith("base.css")) return 1;
});

const replacements = [
  {from: /\/\*\[\[base-color\]\]\*\/ #\w{3,6}/g, to: "/*[[base-color]]*/"},
  {from: /\/\*\[\[tab-size\]\]\*\/ \d+/g, to: "/*[[tab-size]]*/"},
  {from: /\/\*\[\[bg-choice\]\]\*\/ url\(.*\)/, to: "/*[[bg-choice]]*/"},
  {from: "/*[[bg-attachment]]*/ fixed", to: "/*[[bg-attachment]]*/"},
  {from: /\s+\/\* usercss build - remove start[\s\S]+usercss build - remove end \*\/$/m, to: ""},
];

const defaults = {
  theme: "twilight",
  themeCM: "twilight",
  themeJP: "twilight",
  color: "#4f8cc9",
  font: "Menlo",
  fontSize: "default (eg 10px)",
  image: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAAAAABURb1YAAAFnklEQVR4AWWXCY4cwXbE6h4JMhCvMPc/ov+3Ox9QsLCGpKlFHILd+UQ559AGDkBSFXWmomonqkL/XuUcIPUcONjHCJyE36KaqNiaRnVCG9TGpgIU9hIfohCBVGj24ammo04lU3Fy0NZDAyZi5AElHjgEGlRbG1WjraIt7TmADQkAaoEHsOXAAaeqat9RVTqjosyEH5W+DQCQt8BzIJMfXJI3e5tGRefSlRn3NrO3scnvNl26FN5RITGNfjm3GM/+FhQgnlQeImC+dEm8rzHVTNGL9EADVsTAIfGJBziRy7RlmcZU1IYpHIj+4JrWym8/XSwzompmFNVOFdTOAAfs61KZ6eXcp57fykQUOxNBmTesz2HpCnCg3UV/bA7VRpWGNqKtrYLTs0ilCjgxiZxjeLC5dDPBFn4Pn2ja6BRUL10DTgET4Focq8rn8casxV4E5tIlZvytqtfivCOKZrqc38G7egnkXecyPZdzubc57VtUnbfL+a0u3b1N3d9Mci7cKocHoh3xihLQ6fXUlgTOOfVkXSUFINoWHhqxE23RTmCqtoEJaITkIrUCkU9fnqpqm+40VSXS3CLaSzfGBb4rPuOSfN0ylLve6/jpcrbL2dTlnOdv5AamKjLvLN1XruMNS/cul/hx8twKpKYRaE2DOp8+c+lW7uVXVQ7Vx0x1G3HXjNocsHCac7NbWc6egwJVHu2kRTVNC2pqv2U4XNsv5/yWJlV9+NJ1C7xluInlcr7rK+Kg+qy7onQqgnbi7UHcS3qXjdw3bO5tumycYlVssMI5EXXpRnatPK362KodtVU60cm+eQT10sVLFwJYlVaf7UGSoi5dQF3DvnTX3UvXTPO8quKH7jsXhm/PxfKWZXqBM5sS33kmKtC31Q05fI095i5IPpyzRXqSy1Sr17p1F7NE8vMtnNbLpVVtk8c0OrfF0sKxHnIpYgHW4puMomTz8mgmrSjpvrxhX97l7LqLpl7bW9BH9/MNzF8XwRqL8/m7c30eFYV5VX3QTquK06XbLt16F4ks+8Z9m6gPtpcuk3OvibCekng4lzMHi9MoqZmKj9tdbQCbc7bcEA+oEJduRNNL1waf1tuI9MDBUK8t3k9uFz3rrqadO9Ln9TL/ezlwDvky3TW7ZmXfpc77TN0yhOXnP939LvVDV9s+tgLTm0TqYd1lea3PRFuVjLa562HdPbCfascGrvO3DMeIATVqVRO8vfHrbupdfo1dzlXUdkVLZsS1mLPG3rWcl+4B1l1537h0VXzU1tyLG7cCu+LSrSqo06hocy3WCcil65qHDbuEYzQN2HpT3jFt9LEFvHTP1nxbXOEkbhkKmd+6BTfVZ/I143z/Fyz6Za92o0I7I6gzfeYAHPwy/Rb43L9TLtMt8CtwW1xvQvbR1g9n7qJRNN1kdxcdH7cM58Szxq679MdLOhE72t6VNEpHHkzwRyjBcGth+dE99pIkVbWaEWmvnQ8Yl7Mp59zpRWXdNo6odrO754Zzvxf/010nP7onb1TR+bgbVPB9PcADJvH/043Kvk0UzLRxQ6UiaeTAcyxYl2lyrrvZv8v2wE7U1uVcST0821jJeIDKWuyxiqnuko7q3+zJYXJ46nV3D67EyL+lQ9F2qkr+3kUafQpwYE8T329p6y7OX1TF97fQv/c+l87zj7Hsgpig4qRLd9fMPs74rLGyCzRbhmVqpy7nqvPmTD1gvKe7b2U8u1QzmtuDuEtbgT3c8QBJveo6cueFkUwv59nVmfFw1jl4/unuOT9qERV76ers8n23z/c8/Xy7a4lwwLplmGusbRp33Up13+ZDN3KPxNVMhY62vUQyRTse6+cKHtZYjIfDh260Cjbb3Vy6R8H8SMBzqSwrsB1UTacoknlnOb8V4JD9Njfpwz/fHjpBUeevcAtcl65sqXPX9D87RUTLc/dfOgAAAABJRU5ErkJggg==)",
  tiled: true,
  codeWrap: false,
  attach: "scroll",
  tab: 4,
  tabSizes: [2, 3, 4, 5, 6, 7, 8]
};

function replaceForUsercss(css) {
  for (const replacement of replacements) {
    css = css.replace(replacement.from, replacement.to);
  }
  return css;
}

async function processGroup(css, name) {
  const themes = await getThemesInFolder(name.toLowerCase());

  // {{Themes:GitHub}} {{Themes:CodeMirror}} {{Themes:Jupyter}}
  return css.replace(`  {{Themes:${name}}}`, buildThemeGroup(themes));
}

async function getThemesInFolder(folder) {
  const path = `./themes/${folder}`;
  let files = await readdir(path);

  // put the default theme (twilight) first
  files = files.sort((a, b) => {
    if (/twilight/i.exec(a)) return -1;
    if (/twilight/i.exec(b)) return 1;
    return a.localeCompare(b);
  });

  return await Promise.all(files.map(file => readFile(`${path}/${file}`, "utf8")));
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
  for (const theme of themes) {
    const name = extractThemeName(theme);
    defs.push(`  ${name.replace(/\s*/, "")} "${name}" <<<EOT\n  ${theme.replace(/\*\//g, "*\\/").replace(/\n/, "")} EOT;`);
  }
  return defs.join("\n");
}

function replaceVars(css) {
  css = makeTabs(css);
  for (const [key, value] of Object.entries(defaults)) {
    css = css.replace(`{{${key}}}`, value);
  }
  css = css.replace("{{version}}", version);
  return css;
}

function makeTabs(css) {
  const tabs = [];
  defaults.tabSizes.forEach(tab => {
    tabs.push(`  ${tab} "${tab}" <<<EOT
  pre, .highlight, .diff-table, .tab-size {
    tab-size: ${tab} !important;
    -moz-tab-size: ${tab} !important;
  } EOT;`);
  });
  return css.replace("  {{tab-sizes}}", tabs.join("\n"));
}

async function main() {
  const sections = await Promise.all(sources.map(async source => {
    return remapCss(await fetchCss([source]), mappings, remapOpts);
  }));

  let themes = await readFile(resolve(__dirname, "../src/template.css"), "utf8");
  themes = await processGroup(themes, "GitHub");
  themes = await processGroup(themes, "CodeMirror");
  themes = await processGroup(themes, "Jupyter");

  let css = "";
  for (const sourceFile of sourceFiles) {
    let sourceCss = await readFile(sourceFile, "utf8");
    if (sourceFile.endsWith("main.css")) {
      sourceCss = replaceForUsercss(sourceCss);
      sourceCss = replaceVars(`${themes}${sourceCss}`);
    }

    for (let [index, section] of Object.entries(sections)) {
      const source = sources[Number(index)];
      if (basename(source.file) === basename(sourceFile)) {
        // create replacement regex
        section = `  /* begin ${source.name} rules */\n${section}\n  /* end ${source.name} rules */`;
        const re = new RegExp(`.*generated ${esc(source.name)} rules.*`, "gm");
        sourceCss = sourceCss.replace(re, section);
      }
    }

    css += `${sourceCss}\n`;
  }

  await writeFile(resolve(__dirname, "../github-dark.user.css"), css);
}

main().then(exit).catch(exit);
