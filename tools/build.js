import esc from "escape-string-regexp";
import fetchCss from "fetch-css";
import remapCss from "remap-css";
import {readFileSync} from "node:fs";
import {basename} from "node:path";
import cssnano from "cssnano";
import {writeFile, exit, glob} from "./utils.js";
import mappingsFn from "../src/gen/mappings.js";
import ignoresFn from "../src/gen/ignores.js";
import sourcesFn from "../src/gen/sources.js";

const sourceFiles = glob("src/*.css").sort((a, b) => {
  // main first
  if (a.endsWith("main.css")) return -1;
  if (b.endsWith("main.css")) return 1;
  // vars last
  if (a.endsWith("vars.css")) return 1;
  if (b.endsWith("vars.css")) return -1;
  return 0;
}).filter(file => basename(file) !== "template.css");

const minify = async css => (await cssnano().process(css, {from: undefined})).css;

function replaceCSSMatches(css) {
  return css.replace(/:is\(([^)]+)\)\s([^,{]+)(,|{)/g, (_, matches, selector, separator) => {
    const parts = matches.split(/\s*,\s*/);
    const last = parts.length - 1;

    let result = "";
    for (const [index, match] of parts.entries()) {
      result += `${match} ${selector.trim()}${index >= last && separator === "{" ? " {" : ", "}`;
    }

    return result;
  });
}

function sortThemes(a, b) {
  if (/twilight/i.test(a)) return -1;
  if (/twilight/i.test(b)) return 1;
  return a.localeCompare(b);
}

function extractThemeName(css) {
  return css
    .substring(3, css.indexOf("*/")).trim()
    .replace(/^.+:\s/, ""); // remove group (e.g. "GitHub: ")
}

async function getThemes() {
  const themes = {codemirror: [], github: [], jupyter: []};

  for (const path of glob("src/themes/codemirror/*.css").sort(sortThemes)) {
    themes.codemirror[basename(path)] = await minify(readFileSync(path, "utf8"));
  }

  for (const path of glob("src/themes/github/*.css").sort(sortThemes)) {
    themes.github[basename(path)] = await minify(readFileSync(path, "utf8"));
  }

  for (const path of glob("src/themes/jupyter/*.css").sort(sortThemes)) {
    themes.jupyter[basename(path)] = replaceCSSMatches(await minify(readFileSync(path, "utf8")));
  }

  return themes;
}

async function main() {
  const mappings = mappingsFn();
  const ignores = ignoresFn();
  const sources = await sourcesFn();

  const remapOpts = {
    ignoreSelectors: ignores,
    indentCss: 2,
    lineLength: 76,
    comments: false,
    stylistic: true,
    validate: true,
  };

  const {version} = JSON.parse(readFileSync(new URL("../package.json", import.meta.url)), "utf8");

  let css = readFileSync(new URL("../src/template.css", import.meta.url), "utf8");
  css = `${css.trim().replace("{{version}}", version)}\n`;

  for (const [type, themes] of Object.entries(await getThemes())) {
    const parts = [];
    for (const [_filename, themeCss] of Object.entries(themes)) {
      const name = extractThemeName(themeCss);
      parts.push(`  ${name.replace(/\s*/, "")} "${name}" <<<EOT\n  ${themeCss.replace(/\*\//g, "*\\/").replace(/\n/, "")} EOT;`);
    }
    css = css.replace(`  {{themes:${type}}}`, parts.join("\n"));
  }

  const sections = await Promise.all(sources.map(async source => {
    return remapCss(await fetchCss([source]), mappings, remapOpts);
  }));

  for (const sourceFile of sourceFiles) {
    let sourceCss = readFileSync(sourceFile, "utf8");
    for (let [index, section] of Object.entries(sections)) {
      const source = sources[Number(index)];
      if (basename(source.file) === basename(sourceFile)) {
        const prefix = `  /* begin ${source.name} rules */`;
        const suffix = `  /* end ${source.name} rules */`;
        section = `${prefix}\n${section}\n${suffix}`;
        const re = new RegExp(`.*generated ${esc(source.name)} rules.*`, "gm");
        sourceCss = sourceCss.replace(re, section);
      }
    }

    css += `${sourceCss.trim()}\n`;
  }

  writeFile(new URL("../github-dark.user.css", import.meta.url), css);
}

main().then(exit).catch(exit);
