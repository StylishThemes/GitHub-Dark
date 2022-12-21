import perfectionist from "perfectionist";
import {readFileSync} from "node:fs";
import {basename} from "node:path";
import {writeFile, exit, glob} from "./utils.js";

const replacements = [
  {from: /\{\/\*!/g, to: "{\n /*!"},
  {from: /\/\* /g, to: "\n  /* "},
  {from: /(\s+)?\n(\s+)?\n/gm, to: "\n"},
  {from: / {2}}\/\*/gm, to: "  }\n  /*"},
  {from: /,\s+\n/gm, to: ",\n"},
  {from: /\/\*\[\[code-wrap/, to: "/*[[code-wrap"},
  {from: /,\u0020{2,}/g, to: ", "},
  {from: /\s+domain\(/g, to: " domain("},
  {from: /\s+regexp\(/g, to: " regexp("},
];

async function main() {
  for (const file of glob("src/*.css")) {
    if (basename(file) === "template.css") continue;

    let css = readFileSync(file, "utf8");

    // run perfectionist
    const result = await perfectionist.process(css, {indentSize: 2, maxAtRuleLength: 250});
    css = result.css;

    // replace replacements
    for (const replacement of replacements) {
      css = css.replace(replacement.from, replacement.to);
    }

    writeFile(file, css);
  }
}

main().then(exit).catch(exit);
