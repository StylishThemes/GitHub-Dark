import {userAgent} from "../../tools/utils.js";
import {fileURLToPath} from "node:url";

export default async () => {
  const desktopUserAgent = await userAgent();

  return [
    {
      name: "github.com",
      url: [
        "https://github.com/",
        "https://github.com/StylishThemes/GitHub-Dark/tree/master/src",
        "https://github.com/StylishThemes/GitHub-Dark/blob/master/README.md",
      ],
      file: fileURLToPath(new URL("../src/main.css", import.meta.url)),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "gist.github.com",
      url: "https://gist.github.com/",
      file: fileURLToPath(new URL("../src/gist.css", import.meta.url)),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "graphql.github.com",
      url: "https://graphql.github.com/", // https://developer.github.com/v4/explorer
      file: fileURLToPath(new URL("../src/graphql.css", import.meta.url)),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "support.github.com",
      url: "https://support.github.com/",
      file: fileURLToPath(new URL("../src/support.css", import.meta.url)),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "vscode-auth.github.com",
      url: "https://vscode-auth.github.com/",
      file: fileURLToPath(new URL("../src/vscode-auth.css", import.meta.url)),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "githubstatus.com",
      url: "https://www.githubstatus.com/",
      file: fileURLToPath(new URL("../src/status.css", import.meta.url)),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "notebooks.githubusercontent.com",
      url: [
        "https://notebooks.githubusercontent.com/view/ipynb?enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f69626d2d65742f6a7570797465722d73616d706c65732f313735386334373237336536383038343965316638306363636134393638353966643839393638332f656c61737469636974792f456c61737469636974792532304578706572696d656e742e6970796e62&path=elasticity%2FElasticity+Experiment.ipynb"
      ],
      file: fileURLToPath(new URL("../src/render.css", import.meta.url)),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    // Google broke the CRX downloads it seems
    // {
    //   name: "refined-github",
    //   crx: "hlepfoohegkhhmjieoechaddaejaokhf",
    //   prefix: `html.refined-github`,
    //   match: ["html", ".refined-github"],
    //   contentScriptsOnly: true,
    //   file: resolve(__dirname, "../src/extensions.css"),
    //   fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
    // },
    // {
    //   name: "gitako",
    //   crx: "giljefjcheohhamkjphiebfjnlphnokk",
    //   prefix: `body.gitako-ready`,
    //   match: ["body", ".gitako-ready"],
    //   file: resolve(__dirname, "../src/extensions.css"),
    //   fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
    // },
    // {
    //   name: "notifications-preview",
    //   crx: "kgilejfahkjidpaclkepbdoeioeohfmj",
    //   contentScriptsOnly: true,
    //   prefix: `html:root`,
    //   match: ["html", ":root", "[data-color-mode=dark]"],
    //   file: resolve(__dirname, "../src/extensions.css"),
    //   fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
    // },
    // {
    //   name: "octotree",
    //   crx: "bkhaagjahfmjljalopjnoealnfndnagc",
    //   contentScriptsOnly: true,
    //   prefix: `.octotree-sidebar`,
    //   match: [".octotree-sidebar"],
    //   file: resolve(__dirname, "../src/extensions.css"),
    //   fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
    // },
  ];
};
