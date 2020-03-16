#!/usr/bin/env node
"use strict";

const fetchCss = require("fetch-css");
const remapCss = require("remap-css");
const {join} = require("path");
const {readFile} = require("fs").promises;
const {writeFile, exit} = require("./utils");

const mappings = {
  // ==========================================================================
  // Background
  // ==========================================================================
  "$background: #fff": "#181818",
  "$background: #ffe": "#242424",
  "$background: #eee": "#242424", // graphql explorer
  "$background: #fdfdfd": "#181818",
  "$background: #fafafb": "#181818",
  "$background: #fafbfc": "#181818",
  "$background: #efefef": "#181818",
  "$background: #f8f8f8": "#202020", // zenhub
  "$background: #f6f8fa": "#202020",
  "$background: #f5f5f5": "#202020", // gitako
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
  "$background: #2f363d": "#282828",
  "$background: #586069": "#343434",
  "$background: rgba(225,228,232,0.31)": "#282828",
  "$background: hsla(0,0%,100%,.125)": "hsla(0,0%,100%,.05)",
  "$background: hsla(0,0%,100%,.175)": "hsla(0,0%,100%,.1)",
  "$background: linear-gradient(180deg,rgba(242,248,254,0),rgba(242,248,254,.47))": "linear-gradient(180deg,#181818,#181818)",
  "$background: linear-gradient(#fafafa,#eaeaea)": "linear-gradient(#202020, #181818)",
  "$background: linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%)": "linear-gradient(-180deg, #202020 0%, #181818 90%)", // status
  "$background: linear-gradient(#f7f7f7, #e2e2e2)": "#222", // graphql explorer
  "$background: linear-gradient(#f9f9f9, #ececec)": "linear-gradient(#303030, #282828)", // graphql explorer
  "$background: linear-gradient(#fdfdfd, #d2d3d6)": "linear-gradient(#303030, #282828)", // graphql explorer
  "$background: linear-gradient(#e6e6e6, #c3c3c3)": "linear-gradient(#404040, #383838)", // graphql explorer
  "$background: linear-gradient(#ececec, #d5d5d5)": "linear-gradient(#404040, #383838)", // graphql explorer
  "$background: rgba(27,31,35,.1)": "rgba(0,0,0,.1)",
  "$background: rgba(27,31,35,.15)": "rgba(0,0,0,.15)",

  // ==========================================================================
  // Border
  // ==========================================================================
  "$border: transparent": "transparent", // needs to come before the color variants

  "$border: rgba(27,31,35,.1)": "rgba(200,200,200,.1)",
  "$border: rgba(27,31,35,.15)": "rgba(200,200,200,.15)",
  "$border: rgba(27,31,35,.2)": "rgba(200,200,200,.2)",
  "$border: rgba(0,0,0,.125)": "rgba(200,200,200,.125)",

  "$border: #444d56": "#484848",
  "$border: #484848": "#afafaf", // github blog
  "$border: #959da5": "#484848",
  "$border: #c3c8cf": "#484848",
  "$border: #dfe2e5": "#343434",
  "$border: #d1d5da": "#404040",
  "$border: #ddd": "#343434",
  "$border: #d6d6d6": "#343434", // graphql explorer
  "$border: #d0d0d0": "#343434", // graphql explorer
  "$border: #d3d6db": "#343434", // graphql explorer
  "$border: #e0e0e0": "#343434", // graphql explorer
  "$border: #e1e4e8": "#343434",
  "$border: #e5e5e5": "#343434",
  "$border: #e6ebf1": "#343434",
  "$border: #e9e9e9": "#343434", // zenhub
  "$border: #eaecef": "#343434",
  "$border: #eaeaea": "#343434",
  "$border: #eee": "#343434",
  "$border: #f6f8fa": "#202020",
  "$border: #f8f8f8": "#343434",
  "$border: #fff": "#181818",
  "$border: #2f363d": "#282828",

  "border-top: 8px solid rgba(27,31,35,.15)": "border-top-color: rgba(200,200,200,.15)",
  "border-bottom-color: #e36209": "border-bottom-color: #eee",

  "border: 1px solid": "border-color: #181818",
  "border-top: 7px solid #fff": "border-top-color: #181818",
  "border-color: #dfe2e5 #dfe2e5 #fff": "border-color: #343434 #343434 #181818",

  // ==========================================================================
  // Box-Shadow
  // ==========================================================================

  "box-shadow: 0 1px 0 rgba(255,255,255,0.7),inset 0 0 0 1px rgba(0,0,0,0.1),inset 0 1px 1px 1px rgba(0,0,0,0.12),inset 0 0 5px rgba(0,0,0,0.1)": `
     box-shadow: 0 0 0 1px #484848;
  `, // graphql explorer
  "box-shadow: inset 0 0 0 1px rgba(0,0,0,0.2),0 1px 0 rgba(255,255,255,0.7),inset 0 1px #fff": "box-shadow: 0 0 0 .1px #343434", // graphql explorer
  "box-shadow: 0 1px 0 #fff": "box-shadow: 0 0 0 1px #484848", // graphql explorer

  "box-shadow: 0 0 0 .2em rgba(3,102,214,.3)": `
     box-shadow: 0 0 0 .2em rgba(79,140,201,.3);
     box-shadow: 0 0 0 .2em rgba(/*[[base-color-rgb]]*/, .3);
  `,

  "box-shadow: 0 0 0 .2em #c8e1ff": `
     box-shadow: 0 0 0 .2em rgba(79,140,201,.3);
     box-shadow: 0 0 0 .2em rgba(/*[[base-color-rgb]]*/, .3);
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
  "box-shadow: 0 0 5px rgba(27,31,35,.3)": "box-shadow: 0 0 5px #000",

  "box-shadow: inset 0 0 0 1px #e1e4e8,0 2px 4px rgba(0,0,0,.15)": "box-shadow: inset 0 0 0 1px #555",
  "box-shadow: inset 0 0 0 1px #e1e4e8": "box-shadow: inset 0 0 0 1px #555",
  "box-shadow: inset 0 1px 0 0 #e1e4e8": "box-shadow: inset 0 1px 0 0 #555",

  "box-shadow: inset 0 -1px 0 #d1d5da": "box-shadow: inset 0 -2px 0 #383838",
  "box-shadow: inset 0 -1px 0 #959da5": "box-shadow: inset 0 -2px 0 #383838",

  "box-shadow: 0 1px 0 #eaecef": "box-shadow: 0 1px 0 #343434",
  "box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px inset": "box-shadow: #000 0px 0px 0px inset", // status

  "box-shadow: 0 1px 0 0 #0058a2": "box-shadow: 0 1px 0 0 /*[[base-color]]*/ #4f8cc9",
  "box-shadow: 0 0 0.2em #c8e1ff": "box-shadow: 0 0 .2em /*[[base-color]]*/ #4f8cc9",

  // ==========================================================================
  // Color / Background
  // ==========================================================================

  "fill: currentcolor": "fill: currentcolor", // needs to come before color variants
  "$border: currentcolor": "currentcolor",

  "color: #000": "color: #bebebe",
  "color: #1b1f23": "color: #afafaf",
  "color: #141823": "color: #ddd", // graphql explorer
  "color: #333": "color: #bebebe",
  "color: #3c4146": "color: #bebebe",
  "color: #444d56": "color: #afafaf",
  "color: #555": "color: #bebebe", // graphql explorer
  "color: #666": "color: #949494",
  "color: #6a737d": "color: #949494",
  "color: #959da5": "color: #757575",
  "color: #767676": "color: #767676",
  "color: #a3aab1": "color: #757575",
  "color: #808891": "color: #999",
  "color: #c3c8cf": "color: #5a5a5a",
  "color: #c6cbd1": "color: #5a5a5a",
  "color: #d1d5da": "color: #404040",

  "color: #4183c4": `
    color: rgba(79,140,201,.9);
    color: rgba(/*[[base-color-rgb]]*/,.9);
  `,
  "color: #005b9e": `
    color: rgba(79,140,201,1);
    color: rgba(/*[[base-color-rgb]]*/,1);
  `,
  "color: rgba(27,31,35,.85)": "color: rgba(230,230,230,.85)",
  "color: rgba(27,31,35,.7)": "color: rgba(230,230,230,.7)",
  "color: rgba(27,31,35,.6)": "color: rgba(230,230,230,.6)",
  "color: rgba(27,31,35,.3)": "color: rgba(230,230,230,.3)",
  "color: hsla(0,0%,100%,.5)": "color: hsla(0,0%,100%,.5)",
  "color: hsla(0,0%,100%,.6)": "color: hsla(0,0%,100%,.6)",
  "color: hsla(0,0%,100%,.75)": "color: hsla(0,0%,100%,.75)",

  "fill: #959da5": "fill: #757575",
  "fill: #0366d6": "fill:  /*[[base-color]]*/ #4f8cc9",
  "fill: #1074e7": "fill:  /*[[base-color]]*/ #4f8cc9",

  "color: #0366d6": "color: /*[[base-color]]*/ #4f8cc9", // needs to be after #333
  "color: #586069": "color: #afafaf", // needs to be after #0366d6 for RGH "more" button
  "color: #1074e7": "color: /*[[base-color]]*/ #4f8cc9",
  "color: #1f61a0": "color: /*[[base-color]]*/ #4f8cc9", //  graphql explorer
  "color: rgba(88,96,105,.5)": "color: rgba(148,148,148,.5)",
  "color: #24292e": "color: #d2d2d2",
  "stroke: #24292e": "stroke: #d2d2d2",
  "color: #2f363d": "color: #bebebe",

  // blue
  "color: #032f62": "color: #9daccc",
  "color: #05264c": "color: #bebebe", // big commit title
  "color: #264c72": "color: #9daccc",
  "$background: #f1f8ff": "#182030",
  "$background: #032f62": "#182030",
  "$background: #dbedff": "#182030",
  "$background: #d8ebf8": "#182030",
  "$border: #f1f8ff": "#182030",
  "$border: #97c1da": "#224466",
  "color: #c0d3eb": "color: #224466",
  "$background: #c8e1ff": "#224466",
  "$border: #c8e1ff": "#224466",
  "$border: #c0d3eb": "#224466",
  "$background: #0361cc": "#182030",
  "$background: #05264c": "#182030",
  "$background: #005cc2": "/*[[base-color]]*/ #4f8cc9",
  "$background: linear-gradient(-180deg,#0679fc,#0361cc 90%)": "linear-gradient(to bottom,#283040,#182030)",
  "$background: linear-gradient(90deg,#257bf9,#2426ca)": "linear-gradient(90deg,#283040,#182030)",

  // blue (base-color)
  "color: #327fc7": "color: /*[[base-color]]*/ #4f8cc9",
  "color: #b4d6fe": "color: /*[[base-color]]*/ #4f8cc9", // github hovercard
  "$background: #4183c4": "/*[[base-color]]*/ #4f8cc9",
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
  "filter: drop-shadow(-.28em 0 0 #c8e1ff)": `
    filter: drop-shadow(-.28em 0 0 rgba(79,140,201,.3));
    filter: drop-shadow(-.28em 0 0 rgba(/*[[base-color-rgb]]*/, .3))
  `,
  "$border: #2188ff": "/*[[base-color]]*/ #4f8cc9",
  "$background: linear-gradient(#54a3ff,#006eed)": "linear-gradient(/*[[base-color]]*/ #4f8cc9, /*[[base-color]]*/ #4f8cc9)", // notification icon
  "color: #cce888": "color: /*[[base-color]]*/ #4f8cc9", // https://github.com/StylishThemes/GitHub-Dark/issues/954
  "$background: linear-gradient(#599bcd,#3072b3)": "linear-gradient(/*[[base-color]]*/ #4f8cc9, /*[[base-color]]*/ #4f8cc9)",
  "$border: #2a65a0": "/*[[base-color]]*/ #4f8cc9",
  "color: rgba(3, 47, 98, 0.55)": "color: /*[[base-color]]*/ #4f8cc9", // gitako
  "color: #0366d6d0": "color: /*[[base-color]]*/ #4f8cc9", // gitako
  "$background: #79b8ff": "/*[[base-color]]*/ #4f8cc9",
  "box-shadow: 0 0 10px rgba(121,184,255,.7)": `
    box-shadow: 0 0 rgba(79,140,201,.3);
    box-shadow: 0 0 rgba(/*[[base-color-rgb]]*/, .3)
  `,
  "color: #3b5998": "color: /*[[base-color]]*/ #4f8cc9",
  "$border: #3b5998": "/*[[base-color]]*/ #4f8cc9",

  // red
  "color: #cb2431": "color: #f44",
  "color: #b11a04": "color: #f44", // graphql explorer
  "color: #86181d": "color: #f44",
  "$background: #d73a49": "#f44",
  "$background: #cb2431": "#911",
  "$background: #ffdce0": "#300",
  "fill: #cb2431": "fill: #f44",
  "$border: #d73a49": "#b00",
  "$border: #cea0a5": "#f44",

  // orange
  "$border: #fb8532": "#fb8532",
  "color: #a04100": "color: #f3582c",
  "$background: #d15704": "#f3582c",
  "$background: #fb8532": "#f3582c",
  "fill: #e36209": "fill: #fb8532",

  // green
  "color: #28a745": "color: #6cc644",
  "color: #165c26": "color: #6cc644",
  "$background: #28a745": "#373",
  "$background: #2cbe4e": "#373",
  "$background: #dcffe4": "#002800",
  "$background: #f0fff4": "#002800",
  "$background: rgba(108,198,68,.1)": "#002800",
  "fill: #2cbe4e": "fill: #6cc644",
  "fill: #22863a": "fill: #6cc644",
  "$border: #34d058": "#34d058",
  "$border: #a2cbac": "#28a745",
  "background: linear-gradient(#34d058, #28a745)": "background: linear-gradient(#34d058, #28a745)", // refined github

  // yellow
  "color: rgba(47,38,6,.5)": "color: #cb4",
  "color: rgba(115,92,15,.5)": "color: rgba(204,187,68,.5)",
  "color: #dbab09": "color: #cb4",
  "color: #ca9800": "color: #cb4", // graphql explorer
  "color: #b08800": "color: #cb4",
  "color: #735c0f": "color: #bba257",
  "color: #613a00": "color: #bba257",
  "$background: #ffd33d": "#cb4",
  "$background: #ffdf5d": "#cb4",
  "$background: #dbab09": "#cb4",
  "$background: #fffdef": "#261d08",
  "$background: #fffbdd": "#261d08",
  "$background: #fcf9e4": "#321", // zenhub blocked banner
  "$background: #ffe3c8": "#261d08",
  "$border: #ffd33d": "#bba257", // code link highlight
  "fill: #dbab09": "fill: #cb4",
  "$border: #fffbdd": "#321",
  "$border: #ffdf5d": "#321",
  "$border: #fffdef": "#261d08",
  "$border: #faebcc": "#542", // zenhub
  "$border: #d9d0a5": "#542",
  "$border: #dca874": "#542",
  "$border: #e5d999": "#542",

  // light yellow
  "$background: #fff5b1": "#651",

  // purple
  "color: #8b2bb9": "color: #8368aa", // graphql explorer
  "color: #6f42c1": "color: #8368aa",
  "$background: #6f42c1": "#8368aa",
  "$background: #f8f4ff": "#213",
  "$background: #f5f0ff": "#213",
  "$border: #6f42c1": "#8368aa",
  "$border: #8a63d2": "#8368aa",
  "$border: #5e60ba": "#8368aa", // zenhub

  // pink
  "$border: #ec6cb9": "#c49",
  "$background: #ffeef8": "#170711",

  "text-shadow: 0 1px 0 #fff": "text-shadow: none", // zenhub
  "outline: 1px solid #fff": "outline-color: #222",

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

const sources = [
  {url: "https://github.com"},
  {url: "https://gist.github.com"},
  {url: "https://help.github.com"},
  {url: "https://lab.github.com"},
  {url: "https://support.github.com"},
  {
    url: "https://graphql-explorer.githubapp.com/", // https://developer.github.com/v4/explorer
    prefix: `#graphiql`,
    match: ["#graphiql", ".graphiql-ide"],
  },
  {
    url: "https://developer.github.com",
    prefix: "html[prefix]",
    match: ["html", "[prefix]"],
  },
  {
    url: "https://www.githubstatus.com",
    prefix: "body.status",
    match: ["body", ".status"],
  },
  {
    url: "https://github.com/StylishThemes/GitHub-Dark",
    prefix: `body[class="page-responsive"]`,
    match: ["body", ".page-responsive"],
    fetchOpts: {headers: {"User-Agent": "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Mobile Safari/537.36"}},
  },
  {
    url: [
      "https://render.githubusercontent.com/view/pdf?enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f74706e2f706466732f623037326638386234633836303762343561303866386236393331633037313630623462316466382f41253230436f75727365253230696e2532304d616368696e652532304c6561726e696e672532302863696d6c2d76305f392d616c6c292e706466",
      "https://render.githubusercontent.com/diff/img?commit=0fabf58a4b0a00d048d06113a063738afb674ed7&enc_url1=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f5374796c6973685468656d65732f4769744875622d4461726b2f306661626635386134623061303064303438643036313133613036333733386166623637346564372f696d616765732f73637265656e73686f74732f6265666f72652e706e67&enc_url2=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f5374796c6973685468656d65732f4769744875622d4461726b2f613434323536373337663932303861633263393435613266633561633133666562343536336262332f696d616765732f73637265656e73686f74732f6265666f72652e706e67",
    ],
    prefix: "body[data-render-url]",
    match: ["body", "[data-render-url]"],
  },
  {
    crx: "hlepfoohegkhhmjieoechaddaejaokhf", // refined-github
    prefix: `html.refined-github`,
    match: ["html", "refined-github"],
    contentScriptsOnly: true,
  },
  {
    crx: "ogcgkffhplmphkaahpmffcafajaocjbd", // zenhub
    prefix: `body.zh_logged_in`,
    match: ["body", ".zh_logged_in"],
  },
  {
    crx: "mmoahbbnojgkclgceahhakhnccimnplk", // github hovercard
    prefix: `html.ghh-theme-classic`,
    match: ["html", ".ghh-theme-"],
  },
  {
    crx: "giljefjcheohhamkjphiebfjnlphnokk", // Gitako
    prefix: `body.gitako-ready`,
    match: ["body", ".gitako-ready"],
  },
];

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

const replaceRe = /.*begin remap-css[\s\S]+end remap-css.*/gm;
const cssFile = join(__dirname, "..", "github-dark.css");

const remapOpts = {
  ignoreSelectors,
  indentCss: 2,
  lineLength: 76,
  comments: true,
  stylistic: true,
};

async function main() {
  const generatedCss = await remapCss(await fetchCss(sources), mappings, remapOpts);
  await writeFile(cssFile, (await readFile(cssFile, "utf8")).replace(replaceRe, generatedCss));
}

main().then(exit).catch(exit);
