module.exports = async () => ({
  // ==========================================================================
  //                         Short How-to
  // `$border: value`: Any occurance of `value` in a `border` property.
  // `$background: value` Any occurance of `value` in a `background` property.
  // `$box-shadow: value` Any occurance of `value` in a `box-shadow` property.
  // `$value: value`: Any occurance of `value`.
  // `color | fill | background | etc: value`: Any occurance of `value` in a `color | fill | background | etc` property.
  //
  // ==========================================================================
  // Color anywhere
  // ==========================================================================

  // focus line
  "$value: #f9826c": "#fff",

  // monochrome
  "$value: rgba(209,213,218,0)": "transparent",
  "$value: rgba(255,255,255,0)": "transparent",
  "$value: rgba(209,213,218,.5)": "rgba(90,90,90,.5)",
  "$value: rgba(149,157,165,.2)": "rgba(0,0,0,.2)", // modal backdrop
  "$value: rgba(149,157,165,.3)": "rgba(0,0,0,.3)", // .box-shadow-extra-large
  "$value: rgba(149,157,165,.15)": "rgba(0,0,0,.15)", // .box-shadow-medium
  "$value: rgba(0,0,0,0.2)": "rgba(255,255,255,.7)",
  "$value: hsla(0,0%,100%,.875)": "hsla(0,0%,0%,.875)",
  "$value: hsla(0,0%,100%,.8)": "hsla(0,0%,0%,.8)",
  "$value: hsla(0,0%,100%,.6)": "hsla(0,0%,0%,.6)",
  "$value: hsla(0,0%,100%,.5)": "hsla(0,0%,0%,.5)",
  "$value: hsla(0,0%,100%,.2)": "hsla(0,0%,0%,.2)",
  "$value: hsla(0,0%,100%,.125)": "hsla(0,0%,0%,.125)",
  "$value: hsla(0,0%,100%,.05)": "hsla(0,0%,0%,.05)",
  "color: hsla(0,0%,100%,.875)": "color: hsla(0,0%,100%,.125)",
  "color: hsla(0,0%,100%,.8)": "color: hsla(0,0%,100%,.2)",
  "color: hsla(0,0%,100%,.6)": "color: hsla(0,0%,100%,.4)",

  "$background: #fff": "#181818",
  "$border: #fff": "var(--ghd-bg-color)",
  "$box-shadow: #fff": "var(--ghd-bg-color)",
  "color: #fff": "color: #fff",

  "$value: #fcfcfc": "#1d1d1d",
  "$value: #f7f7f7": "#202020",
  "$value: #f3f4f6": "#242424",
  "$value: #f0f3f6": "#242424",
  "$value: #eff1f3": "#242424",
  "$value: #eeeeee": "#2c2c2c",
  "$value: #edeff2": "#2c2c2c",
  "$value: #eaecef": "#343434",
  "$value: #e1e4e8": "#343434",
  "$value: #e0e0e0": "#343434",
  "$value: #dfe2e5": "#404040",
  "$value: #dddddd": "#404040",
  "$value: #d8dee2": "#404040",
  "$value: #d1d5da": "#404040",
  "$value: #c6cbd1": "#505050",
  "$value: #cccccc": "#5a5a5a",
  "$value: #cfcfcf": "#5a5a5a",
  "$value: #bbbbbb": "#606060",
  "$value: #999999": "#505050",
  "$value: #24292e": "#c6c6c6", // actions

  // #444d56 is used for various dark-ish parts like actions. only invert text color for it
  "color: #444d56": "color: #afafaf", // .full-commit .commit-desc pre
  "$border: #444d56": "#343434",
  "$background: #444d56": "#343434",
  "$box-shadow: #444d56": "#343434",

  // blue (base color)
  "$value: rgba(3, 47, 98, 0.55)": "/*[[base-color]]*/", // gitako
  "$value: rgba(3,102,214,.5)": "rgba(/*[[base-color-rgb]]*/, .5)",
  "$value: #044289": "rgba(/*[[base-color-rgb]]*/, .5)", // help sidebar
  "$value: #3b5998": "/*[[base-color]]*/",
  "$value: #0058a2": "/*[[base-color]]*/",
  "$value: #005cc2": "/*[[base-color]]*/",
  "$value: #005b9e": "/*[[base-color]]*/",
  "$value: #1f61a0": "/*[[base-color]]*/",
  "$value: #2a65a0": "/*[[base-color]]*/",
  "$value: #0366d6d0": "/*[[base-color]]*/", // gitako
  "$value: #0361cc": "/*[[base-color]]*/",
  "$value: #0366d6": "/*[[base-color]]*/", // gitako
  "$value: #1074e7": "/*[[base-color]]*/",
  "$value: #006eed": "/*[[base-color]]*/", // notification icon
  "$value: #0679fc": "/*[[base-color]]*/",
  "$value: #3072b3": "/*[[base-color]]*/",
  "$value: #327fc7": "/*[[base-color]]*/",
  "$value: #4183c4": "/*[[base-color]]*/",
  "$value: #2188ff": "/*[[base-color]]*/",
  "$value: #54a3ff": "/*[[base-color]]*/", // notification icon
  "$value: #79b8ff": "/*[[base-color]]*/",
  "$value: #599bcd": "/*[[base-color]]*/",
  "$value: #b4d6fe": "/*[[base-color]]*/", // github hovercard

  // blue
  "$value: rgba(4,66,137,.6)": "#4f8cc9", // .flash .octicon
  "$value: rgba(4,66,137,.2)": "#224466",  // .flash
  "$value: #032f62": "#9daccc",
  "$value: #05264c": "#9daccc", // big commit title
  "$value: #264c72": "#9daccc",
  "$value: #005cc5": "#4f8cc9", // .full-commit .btn
  "$value: #257bf9": "#4f8cc9",
  "$value: #97c1da": "#224466",
  "$value: #d2dff0": "#224466", // org discussion reactions
  "$value: #d8ebf8": "#182030",
  "$value: #dbedff": "#182030",
  "$value: #c0d3eb": "#224466",
  "$value: #c8e1ff": "#224466",
  "$value: #e0f1ff": "#182030",
  "$value: #eaf5ff": "#182030", // .full-commit
  "$value: #f1f8ff": "#182030",

  // red
  "$value: rgba(158,28,35,.6)": "rgba(255,68,68,.6)", // .flash-error .octicon
  "$value: rgba(203,36,49,.4)": "rgba(255,68,68,.4)",
  "$value: rgba(158,28,35,.2)": "rgba(255,68,68,.2)",
  "$value: #86181d": "#d82828",
  "$value: #b11a04": "#d82828", // graphql explorer
  "$value: #cb2431": "#d82828",
  "$value: #d73a49": "#d82828",
  "$value: #cea0a5": "#d82828",
  "$value: #f97583": "#f88",
  "$value: #ffdce0": "#300",
  "$value: #ffe3e6": "#300",
  "$value: #ffeef0": "#300",

  // orange
  "$value: #a04100": "#f3582c",
  "$value: #d15704": "#f3582c",
  "$value: #e36209": "#fb8532",
  "$value: #fb8532": "#fb8532",

  // yellow / brown
  "$value: rgba(47,38,6,.5)": "#cb4",
  "$value: rgba(176,136,0,.2)": "#542", // .flash-warn
  "$value: rgba(115,92,15,.5)": "rgba(204,187,68,.5)",
  "$value: rgba(255,223,93,.2)": "rgba(132,70,0,.2)",
  "$value: #613a00": "#bba257",
  "$value: #735c0f": "#bba257",
  "$value: #6d6c60": "#c95", // .compare-pr-placeholder
  "$value: #9c997d": "#c95", // .compare-pr-placeholder
  "$value: #b08800": "#cb4",
  "$value: #ca9800": "#cb4", // graphql explorer
  "$value: #dbab09": "#cb4",
  "$value: #dca874": "#cb4",
  "$value: #f9c513": "#cb4",
  "$value: #ffd33d": "#cb4",
  "$value: #ffea7f": "#542",
  "$value: #e5d999": "#542",
  "$value: #d9d0a5": "#542",
  "$value: #ffe3c8": "#261d08",
  "$value: #faebcc": "#261d08", // zenhub
  "$value: #fcf9e4": "#261d08", // zenhub blocked banner
  "$value: #fff5b1": "#651",
  "$value: #fffbdd": "#261d08",
  "$value: #fffdef": "#261d08",

  // green
  "$value: rgba(108,198,68,.1)": "#002800",
  "$value: rgba(52,208,88,.4)": "#3737",
  "$value: #144620": "#6cc644",
  "$value: #165c26": "#6cc644",
  "$value: #22863a": "#6cc644",
  "$value: #2a8f47": "#595", // new .btn-primary.disabled
  "$value: #2c974b": "#484", // new .btn-primary :hover
  "$value: #2ea44f": "#373", // new .btn-primary
  "$value: #269f42": "#595", // .btn-primary :hover
  "$value: #279f43": "#595", // new/old .btn-primary:active
  "$value: #28a745": "#484", // green labels, issue icons
  "$value: #2cbe4e": "#373",
  "$value: #2fcb53": "#373", // .btn-primary :hover
  "$value: #34d058": "#373", // .btn-primary
  "$value: #94d3a2": "#040", // .btn-primary.disabled
  "$value: #a2cbac": "#040",
  "$value: #dcffe4": "#002800",
  "$value: #e6ffed": "#002800",
  "$value: #f0fff4": "#002800",

  // purple
  "$value: #6f42c1": "#73589a",
  "$value: #8b2bb9": "#73589a", // graphql explorer
  "$value: #8a63d2": "#53387a",
  "$value: #d5c8ed": "#53387a",
  "$value: #f8f4ff": "#251533",
  "$value: #f6f1ff": "#231233",
  "$value: #f5f0ff": "#221133",

  // blurple
  "$value: #3b41af": "#6570e2",
  "$value: #5e60ba": "#5560d2", // zenhub
  "$value: #6570e2": "#4550c2",

  // pink
  "$value: #99306f": "#e6b",
  "$value: #ec6cb9": "#c49",
  "$value: #ffeef8": "#170711",

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
  "$background: #3c4146": "#181818",
  "$background: #f0f5fa": "#202020",
  "$background: #f8fafd": "#202020",

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
  "box-shadow: 0 1px 0 rgba(27,31,35,.04),inset 0 1px 0 rgba(255,255,255,.25)": "box-shadow: none",
  "box-shadow: inset 0 -1px 0 #959da5": "box-shadow: inset 0 -2px 0 #383838",
  "box-shadow: 0 8px 24px rgba(0,0,0,.2)": "box-shadow: 0 8px 24px rgba(0,0,0,.4)",
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
  "color: #c8e1ff": "/*[[base-color]]*/",
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
  "$value: var(--color-border-primary)": "var(--color-border-primary)",
});
