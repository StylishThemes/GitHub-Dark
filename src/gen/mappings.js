module.exports.mappings = {
  // ==========================================================================
  //                         Short How-to
  // `$border: value`: Any occurance of `value` in a `border` property.
  // `$background: value` Any occurance of `value` in a `background` property.
  // `$box-shadow: value` Any occurance of `value` in a `box-shadow` property.
  // `$color: value`: Any occurance of `value`.
  // `color | fill | background | etc: value`: Any occurance of `value` in a `color | fill | background | etc` property.
  //
  // ==========================================================================
  // Color anywhere
  // ==========================================================================

  // focus line
  "$color: #f9826c": "#fff",

  // monochrome
  "$color: rgba(209,213,218,0)": "transparent",
  "$color: rgba(255,255,255,0)": "transparent",
  "$color: rgba(209,213,218,.5)": "rgba(90,90,90,.5)",
  "$color: rgba(149,157,165,.2)": "rgba(0,0,0,.2)", // modal backdrop
  "$color: rgba(149,157,165,.3)": "rgba(0,0,0,.3)", // .box-shadow-extra-large
  "$color: rgba(149,157,165,.15)": "rgba(0,0,0,.15)", // .box-shadow-medium
  "$color: rgba(0,0,0,0.2)": "rgba(255,255,255,0.7)",
  "$color: hsla(0,0%,100%,.8)": "hsla(0,0%,100%,.8)",
  "$color: hsla(0,0%,100%,.6)": "hsla(0,0%,0%,.6)",
  "$color: hsla(0,0%,100%,.5)": "hsla(0,0%,0%,.5)",
  "$color: hsla(0,0%,100%,.125)": "hsla(0,0%,0%,.125)",
  "$color: hsla(0,0%,100%,.05)": "hsla(0,0%,0%,.05)",

  "$background: #fff": "#181818",
  "$border: #fff": "var(--ghd-bg-color)",
  "$box-shadow: #fff": "var(--ghd-bg-color)",
  "color: #fff": "color: #fff",

  "$color: #f3f4f6": "#242424",
  "$color: #eff1f3": "#242424",
  "$color: #eeeeee": "#2c2c2c",
  "$color: #edeff2": "#2c2c2c",
  "$color: #eaecef": "#343434",
  "$color: #e1e4e8": "#343434",
  "$color: #e0e0e0": "#343434",
  "$color: #dfe2e5": "#343434",
  "$color: #dddddd": "#343434",
  "$color: #d8dee2": "#343434",
  "$color: #d1d5da": "#404040",
  "$color: #c6cbd1": "#505050",
  "$color: #cccccc": "#5a5a5a",
  "$color: #bbbbbb": "#606060",

  // #444d56 is used for various dark-ish parts like actions. only invert text color for it
  "color: #444d56": "color: #afafaf", // .full-commit .commit-desc pre
  "$border: #444d56": "#343434",
  "$background: #444d56": "#343434",
  "$box-shadow: #444d56": "#343434",

  // blue (base color)
  "$color: rgba(3, 47, 98, 0.55)": "/*[[base-color]]*/", // gitako
  "$color: rgba(3,102,214,.5)": "rgba(/*[[base-color-rgb]]*/, .5)",
  "$color: #044289": "rgba(/*[[base-color-rgb]]*/, .5)", // help sidebar
  "$color: #3b5998": "/*[[base-color]]*/",
  "$color: #0058a2": "/*[[base-color]]*/",
  "$color: #005cc2": "/*[[base-color]]*/",
  "$color: #005b9e": "/*[[base-color]]*/",
  "$color: #1f61a0": "/*[[base-color]]*/",
  "$color: #2a65a0": "/*[[base-color]]*/",
  "$color: #0366d6d0": "/*[[base-color]]*/", // gitako
  "$color: #0361cc": "/*[[base-color]]*/",
  "$color: #0366d6": "/*[[base-color]]*/", // gitako
  "$color: #1074e7": "/*[[base-color]]*/",
  "$color: #006eed": "/*[[base-color]]*/", // notification icon
  "$color: #0679fc": "/*[[base-color]]*/",
  "$color: #3072b3": "/*[[base-color]]*/",
  "$color: #327fc7": "/*[[base-color]]*/",
  "$color: #4183c4": "/*[[base-color]]*/",
  "$color: #2188ff": "/*[[base-color]]*/",
  "$color: #54a3ff": "/*[[base-color]]*/", // notification icon
  "$color: #79b8ff": "/*[[base-color]]*/",
  "$color: #599bcd": "/*[[base-color]]*/",
  "$color: #b4d6fe": "/*[[base-color]]*/", // github hovercard
  "$color: #c8e1ff": "/*[[base-color]]*/",

  // blue
  "$color: rgba(4,66,137,.6)": "#4f8cc9", // .flash .octicon
  "$color: rgba(4,66,137,.2)": "#224466",  // .flash
  "$color: #005cc5": "#4f8cc9", // .full-commit .btn
  "$color: #257bf9": "#4f8cc9",
  "$color: #eaf5ff": "#182030", // .full-commit
  "$color: #d2dff0": "#224466", // org discussion reactions

  // red
  "$color: rgba(203,36,49,.4)": "rgba(255,68,68,.4)",
  "$color: #86181d": "#d82828",
  "$color: #b11a04": "#d82828", // graphql explorer
  "$color: #cb2431": "#d82828",
  "$color: #d73a49": "#d82828",
  "$color: #cea0a5": "#d82828",
  "$color: #f97583": "#f88",
  "$color: #ffeef0": "#300",
  "$color: #ffdce0": "#300",

  // orange
  "$color: #a04100": "#f3582c",
  "$color: #d15704": "#f3582c",
  "$color: #e36209": "#fb8532",
  "$color: #fb8532": "#fb8532",

  // yellow / brown
  "$color: rgba(47,38,6,.5)": "#cb4",
  "$color: rgba(176,136,0,.2)": "#542", // .flash-warn
  "$color: rgba(115,92,15,.5)": "rgba(204,187,68,.5)",
  "$color: rgba(255,223,93,.2)": "rgba(132,70,0,.2)",
  "$color: #613a00": "#bba257",
  "$color: #735c0f": "#bba257",
  "$color: #6d6c60": "#c95", // .compare-pr-placeholder
  "$color: #9c997d": "#c95", // .compare-pr-placeholder
  "$color: #b08800": "#cb4",
  "$color: #ca9800": "#cb4", // graphql explorer
  "$color: #dbab09": "#cb4",
  "$color: #dca874": "#cb4",
  "$color: #f9c513": "#cb4",
  "$color: #ffd33d": "#cb4",
  "$color: #ffea7f": "#542",
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
  "$color: #28a745": "#484", // green labels, issue icons
  "$color: #2cbe4e": "#373",
  "$color: #2fcb53": "#373", // .btn-primary :hover
  "$color: #34d058": "#373", // .btn-primary
  "$color: #94d3a2": "#040", // .btn-primary.disabled
  "$color: #a2cbac": "#040",
  "$color: #dcffe4": "#002800",
  "$color: #f0fff4": "#002800",

  // purple
  "$color: #6f42c1": "#73589a",
  "$color: #8b2bb9": "#73589a", // graphql explorer
  "$color: #8a63d2": "#53387a",
  "$color: #d5c8ed": "#53387a",
  "$color: #f8f4ff": "#251533",
  "$color: #f6f1ff": "#231233",
  "$color: #f5f0ff": "#221133",

  // blurple
  "$color: #3b41af": "#6570e2",
  "$color: #5e60ba": "#5560d2", // zenhub
  "$color: #6570e2": "#4550c2",

  // pink
  "$color: #99306f": "#e6b",
  "$color: #ec6cb9": "#c49",
  "$color: #ffeef8": "#170711",

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
  "$background: #e9ecef": "#404040",
  "$background: #e9e9e9": "#343434", // zenhub
  "$background: #e6ebf1": "#444",
  "$background: #d6e2f1": "#444",
  "$background: #d3e2f4": "#383838",
  "$background: #6a737d": "#444",
  "$background: #586069": "#343434",
  "$background: #2f363d": "#222",
  "$background: #24292e": "#181818",
  "$background: #3c4146": "#181818",

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

  "$background: rgba(27,31,35,.05)": "rgba(220,220,220,.1)", // github hovercard
  "$background: rgba(27,31,35,.08)": "rgba(220,220,220,.15)",
  "$background: rgba(27,31,35,.1)": "rgba(220,220,220,.17)",
  "$background: rgba(27,31,35,.15)": "rgba(220,220,220,.22)",

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

  "$border: #484848": "#afafaf", // github blog
  "$border: #959da5": "#484848",
  "$border: #c3c8cf": "#484848",
  "$border: #d6d6d6": "#343434", // graphql explorer
  "$border: #d0d0d0": "#343434", // graphql explorer
  "$border: #d3d6db": "#343434", // graphql explorer
  "$border: #e0e0e0": "#343434", // graphql explorer
  "$border: #e5e5e5": "#343434",
  "$border: #e6ebf1": "#343434",
  "$border: #e9e9e9": "#343434", // zenhub
  "$border: #eaeaea": "#343434",
  "$border: #f6f8fa": "#202020",
  "$border: #f8f8f8": "#343434",
  "$border: #2f363d": "#282828",

  // ==========================================================================
  // Box-Shadow
  // ==========================================================================

  "$box-shadow: rgba(0, 0, 0, 0.15)": "#000",
  "$box-shadow: rgba(0,0,0,.4)": "#000",
  "$box-shadow: rgba(27,31,35,.3)": "#000",
  "$box-shadow: rgba(27,31,35,.15)": "#000",
  "$box-shadow: rgba(27,31,35,.1)": "#000",
  "$box-shadow: rgba(27,31,35,.04)": "#000",

  "box-shadow: 0 1px 0 rgba(255,255,255,0.7),inset 0 0 0 1px rgba(0,0,0,0.1),inset 0 1px 1px 1px rgba(0,0,0,0.12),inset 0 0 5px rgba(0,0,0,0.1)": "box-shadow: 0 0 0 1px #484848", // graphql explorer
  "box-shadow: inset 0 2px 3px rgba(0,0,0,.075)": "box-shadow: inset 0 2px 3px rgba(255,255,255,.075)",
  "box-shadow: 0 0 0 .2em rgba(3,102,214,.3)": "box-shadow: 0 0 0 .2em rgba(/*[[base-color-rgb]]*/, .5)",
  "box-shadow: 0 0 0 .2em #c8e1ff": "box-shadow: 0 0 0 .2em rgba(/*[[base-color-rgb]]*/, .3)",
  "box-shadow: 0 0 0 3px rgba(3,102,214,.3)": "box-shadow: 0 0 0 3px rgba(/*[[base-color-rgb]]*/, .3)",
  "box-shadow: inset 0 1px 2px rgba(27,31,35,.075),0 0 0 .2em rgba(3,102,214,.3)": "box-shadow: 0 0 0 2px rgba(/*[[base-color-rgb]]*/, .3)",
  "box-shadow: 0 1px 0 0 rgba(16,116,231,.5)": "box-shadow: 0 1px 0 0 rgba(/*[[base-color-rgb]]*/, .5)",

  "box-shadow: inset 0 1px 0 rgba(225,228,232,.2)": "box-shadow: none",
  "box-shadow: 0 1px 0 rgba(27,31,35,.1),inset 0 1px 0 hsla(0,0%,100%,.03)": "box-shadow: none",
  "box-shadow: inset 0 -1px 0 #959da5": "box-shadow: inset 0 -2px 0 #383838",
  // ==========================================================================
  // Color / Background
  // ==========================================================================

  "color: #000": "color: #f0f0f0",
  "color: #1b1f23": "color: #dcdcdc",
  "color: #141823": "color: #dcdcdc", // graphql explorer
  "color: #24292e": "color: #c6c6c6", // .btn
  "color: #2f363d": "color: #c6c6c6",
  "color: #333": "color: #c6c6c6",
  "color: #393939": "color: #c6c6c6",
  "color: #3c4146": "color: #c6c6c6",
  "color: #444": "color: #afafaf",
  "color: #555": "color: #afafaf", // graphql explorer
  "color: #586069": "color: #afafaf",
  "color: #666": "color: #9b9b9b",
  "color: #6a737d": "color: #9b9b9b",
  "color: #959da5": "color: #767676",
  "color: #767676": "color: #767676",
  "color: #808891": "color: #767676",
  "color: #a3aab1": "color: #767676",
  "color: #c3c8cf": "color: #5a5a5a",

  "color: rgba(27,31,35,.85)": "color: rgba(230,230,230,.85)",
  "color: rgba(27,31,35,.7)": "color: rgba(230,230,230,.7)",
  "color: rgba(27,31,35,.6)": "color: rgba(230,230,230,.6)",
  "color: rgba(27,31,35,.5)": "color: rgba(230,230,230,.5)",
  "color: rgba(27,31,35,.3)": "color: rgba(230,230,230,.3)",
  "color: rgba(36,41,46,.4)": "color: rgba(210,210,210,.4)",
  "color: rgb(36,41,46)": "color: rgb(210,210,210) !important", // notifications preview

  "fill: #959da5": "fill: #757575",

  "color: rgba(88,96,105,.5)": "color: rgba(148,148,148,.5)",

  "fill: #24292e": "fill: #c6c6c6",
  "stroke: #24292e": "stroke: #c6c6c6",

  // blue
  "color: #032f62": "color: #9daccc",
  "color: #05264c": "color: #c6c6c6", // big commit title
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
  "$background: #05264c": "#182030",

  // blue (base-color)
  "filter: drop-shadow(-.25em 0 0 #c8e1ff)": "filter: drop-shadow(-.25em 0 0 rgba(/*[[base-color-rgb]]*/, .3))",
  "filter: drop-shadow(0 -.28em 0 #c8e1ff)": "filter: drop-shadow(0 -.28em 0 rgba(/*[[base-color-rgb]]*/, .3))",
  "filter: drop-shadow(-.28em 0 0 #c8e1ff)": "filter: drop-shadow(-.28em 0 0 rgba(/*[[base-color-rgb]]*/, .3))",

  "color: #cce888": "color: /*[[base-color]]*/", // https://github.com/StylishThemes/GitHub-Dark/issues/954

  "box-shadow: 0 0 10px rgba(121,184,255,.7)": "box-shadow: 0 0 10px rgba(/*[[base-color-rgb]]*/, .3)",

  "$background: rgba(0,0,0,.8)": "#242424", // github hovercard
  "$border: rgba(0,0,0,.8)": "#242424", // github hovercard

  // various noop rules to support rules overridden in the original styles
  "box-shadow: none": "box-shadow: none",
  "$background: none": "none",
  "$background: initial": "initial",
  "$background: transparent": "transparent",
  "$border: transparent": "transparent",
  "$border: currentcolor": "currentcolor",
};
