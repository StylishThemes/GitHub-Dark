#!/usr/bin/env node
"use strict";

const fetchCss = require("fetch-css");
const remapCss = require("remap-css");
const {join} = require("path");
const {readFile} = require("fs").promises;
const {writeFile, exit} = require("./utils");

const mappings = {
  // ==========================================================================
  // Color anywhere
  // ==========================================================================

  // focus line
  "$color: #f9826c": "#fff",

  // monochrome
  "$color: rgba(209,213,218,0)": "transparent",
  "$color: rgba(209,213,218,.5)": "rgba(90,90,90,.5)",
  "$color: rgba(149,157,165,.2)": "rgba(0,0,0,.2)", // modal backdrop
  "$color: rgba(0,0,0,0.2)": "rgba(255,255,255,0.7)",
  "$color: hsla(0,0%,100%,.8)": "hsla(0,0%,100%,.8)",
  "$color: hsla(0,0%,100%,.6)": "hsla(0,0%,0%,.6)",
  "$color: hsla(0,0%,100%,.5)": "hsla(0,0%,0%,.5)",

  "$background: #fff": "#181818",
  "$border: #fff": "#181818",

  "$color: #f3f4f6": "#242424",
  "$color: #edeff2": "#343434",
  "$color: #eaecef": "#343434",
  "$color: #e1e4e8": "#343434",
  "$color: #dfe2e5": "#343434",
  "$color: #d1d5da": "#404040",

  // blue (base color)
  "$color: rgba(3,102,214,.5)": "rgba(/*[[base-color-rgb]]*/, .5)",
  "$color: #0366d6": "/*[[base-color]]*/ #4f8cc9", // gitako
  "$color: #0366d6d0": "/*[[base-color]]*/ #4f8cc9", // gitako
  "$color: #3b5998": "/*[[base-color]]*/ #4f8cc9",
  "$color: #79b8ff": "/*[[base-color]]*/ #4f8cc9",

  // blue
  "$color: rgba(4,66,137,.6)": "#4f8cc9", // .flash .octicon
  "$color: #005cc5": "#4f8cc9", // .full-commit .btn
  "$color: #0361cc": "#4f8cc9",
  "$color: #0679fc": "#4f8cc9",
  "$color: #257bf9": "#4f8cc9",
  "$color: #eaf5ff": "#182030", // .full-commit

  // red
  "$color: rgba(203,36,49,.4)": "rgba(255,68,68,.4)",
  "$color: #86181d": "#e03030",
  "$color: #b11a04": "#e03030", // graphql explorer
  "$color: #cb2431": "#e03030",
  "$color: #d73a49": "#e03030",
  "$color: #cea0a5": "#e03030",
  "$color: #ffdce0": "#300",

  // orange
  "$color: #a04100": "#f3582c",
  "$color: #d15704": "#f3582c",
  "$color: #e36209": "#fb8532",
  "$color: #fb8532": "#fb8532",

  // yellow / brown
  "$color: rgba(47,38,6,.5)": "#cb4",
  "$color: rgba(115,92,15,.5)": "rgba(204,187,68,.5)",
  "$color: rgba(255,223,93,.2)": "rgba(132,70,0,.2)",
  "$color: #613a00": "#bba257",
  "$color: #735c0f": "#bba257",
  "$color: #b08800": "#cb4",
  "$color: #ca9800": "#cb4", // graphql explorer
  "$color: #dbab09": "#cb4",
  "$color: #dca874": "#cb4",
  "$color: #f9c513": "#cb4",
  "$color: #ffd33d": "#cb4",
  "$color: #e5d999": "#542",
  "$color: #d9d0a5": "#542",
  "$color: #ffe3c8": "#261d08",
  "$color: #faebcc": "#261d08", // zenhub
  "$color: #fcf9e4": "#261d08", // zenhub blocked banner
  "$color: #fff5b1": "#651",
  "$color: #fffbdd": "#261d08",
  "$color: #fffdef": "#261d08",

  // green
  "$color: rgba(108,198,68,.1)": "#002800",
  "$color: rgba(52,208,88,.4)": "#3737",
  "$color: #144620": "#6cc644",
  "$color: #165c26": "#6cc644",
  "$color: #22863a": "#6cc644",
  "$color: #2a8f47": "#595", // new .btn-primary.disabled
  "$color: #2c974b": "#484", // new .btn-primary :hover
  "$color: #2ea44f": "#373", // new .btn-primary
  "$color: #269f42": "#595", // .btn-primary :hover
  "$color: #279f43": "#595", // new/old .btn-primary:active
  "$color: #28a745": "#595",
  "$color: #2cbe4e": "#373",
  "$color: #2fcb53": "#373", // .btn-primary :hover
  "$color: #34d058": "#373", // .btn-primary
  "$color: #94d3a2": "#040", // .btn-primary.disabled
  "$color: #a2cbac": "#040",
  "$color: #dcffe4": "#002800",
  "$color: #f0fff4": "#002800",

  // ==========================================================================
  // Background
  // ==========================================================================
  "$background: #ffe": "#181818",
  "$background: #fdfdfd": "#181818",
  "$background: #fafafb": "#181818",
  "$background: #fafbfc": "#181818", // .bg-gray-light
  "$background: #f9f9f9": "#181818",
  "$background: #f8f8f8": "#202020", // zenhub
  "$background: #efefef": "#202020",
  "$background: #f6f8fa": "#222",
  "$background: #f5f5f5": "#222", // gitako
  "$background: #f4f5f5": "#242424", // zenhub
  "$background: #f4f4f4": "#242424",
  "$background: #eff3f6": "#242424",
  "$background: #eee": "#242424", // graphql explorer
  "$background: #e9ecef": "#404040",
  "$background: #e9e9e9": "#343434", // zenhub
  "$background: #e6ebf1": "#444",
  "$background: #ddd": "#383838",
  "$background: #d6e2f1": "#444",
  "$background: #d3e2f4": "#383838",
  "$background: #ccc": "#484848",
  "$background: #c6cbd1": "#484848",
  "$background: #6a737d": "#444",
  "$background: #586069": "#343434",
  "$background: #2f363d": "#282828",
  "$background: #24292e": "#181818",

  "$background: rgba(225,228,232,0.31)": "#282828",
  "$background: linear-gradient(180deg,rgba(242,248,254,0),rgba(242,248,254,.47))": "linear-gradient(180deg,#181818,#181818)",
  "$background: linear-gradient(#fafafa,#eaeaea)": "linear-gradient(#202020, #181818)",
  "$background: linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%)": "linear-gradient(-180deg, #202020 0%, #181818 90%)", // status
  "$background: linear-gradient(#f7f7f7, #e2e2e2)": "#222", // graphql explorer
  "$background: linear-gradient(#f9f9f9, #ececec)": "linear-gradient(#303030, #282828)", // graphql explorer
  "$background: linear-gradient(#fdfdfd, #d2d3d6)": "linear-gradient(#303030, #282828)", // graphql explorer
  "$background: linear-gradient(#e6e6e6, #c3c3c3)": "linear-gradient(#404040, #383838)", // graphql explorer
  "$background: linear-gradient(#ececec, #d5d5d5)": "linear-gradient(#404040, #383838)", // graphql explorer
  "$background: linear-gradient(#ccc,#d5d5d5)": "linear-gradient(#303030, #282828)",
  "$background: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%)": "linear-gradient(#404040, #383838)",

  "$background: rgba(27,31,35,.08)": "rgba(220,220,220,.15)",
  "$background: rgba(27,31,35,.1)": "rgba(220,220,220,.17)",
  "$background: rgba(27,31,35,.15)": "rgba(220,220,220,.22)",

  "$background: initial": "initial",

  // ==========================================================================
  // Border
  // ==========================================================================

  "$border: rgba(27,31,35,.5)": "rgba(220,220,220,.5)",
  "$border: rgba(27,31,35,.35)": "rgba(220,220,220,.35)",
  "$border: rgba(27,31,35,.3)": "rgba(220,220,220,.4)",
  "$border: rgba(27,31,35,.25)": "rgba(220,220,220,.25)",
  "$border: rgba(27,31,35,.2)": "rgba(220,220,220,.2)",
  "$border: rgba(27,31,35,.15)": "rgba(220,220,220,.15)",
  "$border: rgba(27,31,35,.1)": "rgba(220,220,220,.1)",
  "$border: rgba(27,31,35,.05)": "rgba(220,220,220,.05)",

  "$border: rgba(0,0,0,.125)": "rgba(220,220,220,.125)",

  "$border: #444d56": "#484848",
  "$border: #484848": "#afafaf", // github blog
  "$border: #959da5": "#484848",
  "$border: #bbb": "#484848",
  "$border: #c3c8cf": "#484848",
  "$border: #ddd": "#343434",
  "$border: #d6d6d6": "#343434", // graphql explorer
  "$border: #d0d0d0": "#343434", // graphql explorer
  "$border: #d3d6db": "#343434", // graphql explorer
  "$border: #e0e0e0": "#343434", // graphql explorer
  "$border: #e5e5e5": "#343434",
  "$border: #e6ebf1": "#343434",
  "$border: #e9e9e9": "#343434", // zenhub
  "$border: #eaeaea": "#343434",
  "$border: #eee": "#343434",
  "$border: #f6f8fa": "#202020",
  "$border: #f8f8f8": "#343434",
  "$border: #2f363d": "#282828",

  "border-top: 8px solid rgba(27,31,35,.15)": "border-top-color: rgba(220,220,220,.15)",

  // ==========================================================================
  // Box-Shadow
  // ==========================================================================

  "box-shadow: 0 1px 0 rgba(255,255,255,0.7),inset 0 0 0 1px rgba(0,0,0,0.1),inset 0 1px 1px 1px rgba(0,0,0,0.12),inset 0 0 5px rgba(0,0,0,0.1)": `
     box-shadow: 0 0 0 1px #484848;
  `, // graphql explorer
  "box-shadow: inset 0 2px 3px rgba(0,0,0,.075)": "box-shadow: inset 0 2px 3px rgba(255,255,255,.075)",

  "box-shadow: 0 0 0 .2em rgba(3,102,214,.3)": `
     box-shadow: 0 0 0 .2em rgba(79,140,201,.5);
     box-shadow: 0 0 0 .2em rgba(/*[[base-color-rgb]]*/, .5);
  `,

  "box-shadow: 0 0 0 .2em #c8e1ff": `
     box-shadow: 0 0 0 .2em rgba(79,140,201,.3);
     box-shadow: 0 0 0 .2em rgba(/*[[base-color-rgb]]*/, .3);
  `,

  "box-shadow: 0 0 0 3px rgba(3,102,214,.3)": `
     box-shadow: 0 0 0 3px rgba(79,140,201,.3);
     box-shadow: 0 0 0 3px rgba(/*[[base-color-rgb]]*/, .3);
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

  "box-shadow: 0 1px 5px rgba(27,31,35,.15)": "box-shadow: 0 1px 5px #000",
  "box-shadow: 0 0 5px rgba(27,31,35,.3)": "box-shadow: 0 0 5px #000",
  "box-shadow: 0 0 18px rgba(0,0,0,.4)": "box-shadow: 0 0 18px #000",

  "box-shadow: inset 0 1px 0 rgba(225,228,232,.2)": "box-shadow: none",

  "box-shadow: inset 0 -1px 0 #959da5": "box-shadow: inset 0 -2px 0 #383838",

  "box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px inset": "box-shadow: #000 0px 0px 0px inset", // status

  "box-shadow: 0 1px 0 0 #0058a2": "box-shadow: 0 1px 0 0 /*[[base-color]]*/ #4f8cc9",
  "box-shadow: 0 0 0.2em #c8e1ff": "box-shadow: 0 0 .2em /*[[base-color]]*/ #4f8cc9",

  "box-shadow: 0 1px 0 rgba(27,31,35,.04),inset 0 1px 0 hsla(0,0%,100%,.25)": "box-shadow: none", // .btn
  "box-shadow: 0 1px 0 rgba(27,31,35,.1),inset 0 1px 0 hsla(0,0%,100%,.03)": "box-shadow: none", // .btn-primary
  // ==========================================================================
  // Color / Background
  // ==========================================================================

  "$border: currentcolor": "currentcolor",

  "color: #000": "color: #f0f0f0",
  "color: #1b1f23": "color: #dcdcdc",
  "color: #141823": "color: #dcdcdc", // graphql explorer
  "color: #24292e": "color: #cdcdcd", // .btn
  "color: #2f363d": "color: #bebebe",
  "color: #333": "color: #bebebe",
  "color: #3c4146": "color: #bebebe",
  "color: #444d56": "color: #afafaf",
  "color: #555": "color: #afafaf", // graphql explorer
  "color: #586069": "color: #afafaf",
  "color: #666": "color: #949494",
  "color: #6a737d": "color: #949494",
  "color: #959da5": "color: #767676",
  "color: #767676": "color: #767676",
  "color: #808891": "color: #767676",
  "color: #a3aab1": "color: #767676",
  "color: #c3c8cf": "color: #5a5a5a",
  "color: #c6cbd1": "color: #5a5a5a",

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
  "color: rgba(27,31,35,.5)": "color: rgba(230,230,230,.5)",
  "color: rgba(27,31,35,.3)": "color: rgba(230,230,230,.3)",
  "color: rgba(36,41,46,.4)": "color: rgba(210,210,210,.4)",
  "color: rgb(36,41,46)": "color: rgb(210,210,210) !important", // notifications preview

  "fill: #959da5": "fill: #757575",
  "fill: #1074e7": "fill:  /*[[base-color]]*/ #4f8cc9",

  "color: #1074e7": "color: /*[[base-color]]*/ #4f8cc9",
  "color: #1f61a0": "color: /*[[base-color]]*/ #4f8cc9", //  graphql explorer
  "color: rgba(88,96,105,.5)": "color: rgba(148,148,148,.5)",

  "fill: #24292e": "fill: #bebebe",

  "stroke: #24292e": "stroke: #d2d2d2",

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

  // blue (base-color)
  "color: #327fc7": "color: /*[[base-color]]*/ #4f8cc9",
  "color: #b4d6fe": "color: /*[[base-color]]*/ #4f8cc9", // github hovercard
  "$background: #4183c4": "/*[[base-color]]*/ #4f8cc9",
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
  "$background: #79b8ff": "/*[[base-color]]*/ #4f8cc9",
  "box-shadow: 0 0 10px rgba(121,184,255,.7)": `
    box-shadow: 0 0 rgba(79,140,201,.3);
    box-shadow: 0 0 rgba(/*[[base-color-rgb]]*/, .3)
  `,
  "$background: #005cc2": "/*[[base-color]]*/ #4f8cc9",
  "$background: #3072b3": "/*[[base-color]]*/ #4f8cc9",

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

  "$background: rgba(0,0,0,.8)": "#242424", // github hovercard
  "$border: rgba(0,0,0,.8)": "#242424", // github hovercard

  "box-shadow: none": "box-shadow: none",

  "$border: transparent": "transparent",
  "border: 1px solid transparent": "border: 1px solid transparent",
  "$border: 0": "0",
  "border-top: 0": "border-top: 0",
  "border-bottom: 0": "border-bottom: 0",
  "border-left: 0": "border-left: 0",
  "border-right: 0": "border-right: 0",
  "$background: none": "none",
  "$background: transparent": "transparent",
};

const sources = [
  {
    name: "githubstatus.com",
    url: "https://www.githubstatus.com",
    prefix: "body.status",
    match: ["body", ".status"],
  },
  {
    name: "developer.github.com",
    url: "https://developer.github.com",
    prefix: "html[prefix]",
    match: ["html", "[prefix]"],
  },
  {
    name: "graphql.github.com",
    url: "https://graphql.github.com/", // https://developer.github.com/v4/explorer
    prefix: `#graphiql`,
    match: ["#graphiql", ".graphiql-ide"],
  },
  {
    name: "github.com mobile",
    url: "https://github.com/StylishThemes/GitHub-Dark",
    prefix: `body[class="page-responsive"]`,
    match: ["body", ".page-responsive"],
    fetchOpts: {headers: {"User-Agent": "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Mobile Safari/537.36"}},
    strict: true,
  },
  {
    name: "support.github.com",
    url: "https://support.github.com",
    prefix: `body.dotcom`,
    match: ["body", ".dotcom"],
    strict: true,
  },
  {
    name: "help.github.com",
    url: "https://help.github.com",
    prefix: `body.d-lg-flex`,
    match: ["body", "d-lg-flex"],
    strict: true,
  },
  {
    name: "gist.github.com",
    url: "https://gist.github.com",
    strict: true,
  },
  {
    name: "github.com",
    url: "https://github.com",
    strict: true,
  },
  {
    name: "pdf viewer",
    url: [
      "https://render.githubusercontent.com/view/pdf?enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f74706e2f706466732f623037326638386234633836303762343561303866386236393331633037313630623462316466382f41253230436f75727365253230696e2532304d616368696e652532304c6561726e696e672532302863696d6c2d76305f392d616c6c292e706466",
      "https://render.githubusercontent.com/diff/img?commit=0fabf58a4b0a00d048d06113a063738afb674ed7&enc_url1=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f5374796c6973685468656d65732f4769744875622d4461726b2f306661626635386134623061303064303438643036313133613036333733386166623637346564372f696d616765732f73637265656e73686f74732f6265666f72652e706e67&enc_url2=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f5374796c6973685468656d65732f4769744875622d4461726b2f613434323536373337663932303861633263393435613266633561633133666562343536336262332f696d616765732f73637265656e73686f74732f6265666f72652e706e67",
    ],
    prefix: "body[data-render-url]",
    match: ["body", "[data-render-url]"],
    strict: true,
  },
  {
    name: "refined-github",
    crx: "hlepfoohegkhhmjieoechaddaejaokhf",
    prefix: `html.refined-github`,
    match: ["html", "refined-github"],
    contentScriptsOnly: true,
  },
  {
    name: "zenhub",
    crx: "ogcgkffhplmphkaahpmffcafajaocjbd",
    prefix: `body.zh_logged_in`,
    match: ["body", ".zh_logged_in"],
  },
  {
    name: "github hovercard",
    crx: "mmoahbbnojgkclgceahhakhnccimnplk",
    prefix: `html.ghh-theme-classic`,
    match: ["html", ".ghh-theme-"],
  },
  {
    name: "gitako",
    crx: "giljefjcheohhamkjphiebfjnlphnokk",
    prefix: `body.gitako-ready`,
    match: ["body", ".gitako-ready"],
  },
  {
    name: "npmhub",
    crx: "kbbbjimdjbjclaebffknlabpogocablj",
  },
  {
    name: "notifications preview",
    crx: "kgilejfahkjidpaclkepbdoeioeohfmj",
    contentScriptsOnly: true,
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
  validate: true,
};

async function main() {
  let generatedCss = await remapCss(await fetchCss(sources), mappings, remapOpts);
  generatedCss = `  /* begin remap-css rules */\n${generatedCss}\n  /* end remap-css rules */`;
  await writeFile(cssFile, (await readFile(cssFile, "utf8")).replace(replaceRe, generatedCss));
}

main().then(exit).catch(exit);
