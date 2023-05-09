import {userAgent} from "../../tools/utils.js";
import {resolve, dirname} from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async () => {
  const desktopUserAgent = await userAgent();

  return [
    {
      name: "github.com",
      url: "https://github.com/",
      file: resolve(__dirname, "../src/main.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "gist.github.com",
      url: "https://gist.github.com/",
      file: resolve(__dirname, "../src/gist.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "graphql.github.com",
      url: "https://graphql.github.com/", // https://developer.github.com/v4/explorer
      file: resolve(__dirname, "../src/graphql.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "support.github.com",
      url: "https://support.github.com/",
      file: resolve(__dirname, "../src/support.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "vscode-auth.github.com",
      url: "https://vscode-auth.github.com/",
      file: resolve(__dirname, "../src/vscode-auth.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "code-view",
      url: "https://github.com/StylishThemes/GitHub-Dark/blob/master/.gitattributes",
      file: resolve(__dirname, "../src/code-view.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "code-search",
      url: "https://github.com/search?q=repo%3AStylishThemes%2FGitHub-Dark%20auto&type=code",
      file: resolve(__dirname, "../src/code-search.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "githubstatus.com",
      url: "https://www.githubstatus.com/",
      file: resolve(__dirname, "../src/status.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "notebooks.githubusercontent.com",
      url: [
        "https://notebooks.githubusercontent.com/view/ipynb?enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f69626d2d65742f6a7570797465722d73616d706c65732f313735386334373237336536383038343965316638306363636134393638353966643839393638332f656c61737469636974792f456c61737469636974792532304578706572696d656e742e6970796e62&path=elasticity%2FElasticity+Experiment.ipynb"
      ],
      file: resolve(__dirname, "../src/render.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
    {
      name: "refined-github",
      crx: "hlepfoohegkhhmjieoechaddaejaokhf",
      prefix: `html.refined-github`,
      match: ["html", ".refined-github"],
      contentScriptsOnly: true,
      file: resolve(__dirname, "../src/extensions.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
    },
    {
      name: "zenhub",
      crx: "ogcgkffhplmphkaahpmffcafajaocjbd",
      prefix: `html[class*="zh-"]`,
      match: [
        "html",
        `[class*="zh-"]`,
        ".zh-app--dark",
        ".zh-app--light",
        ".zh-app--visible",
        ".zh-app--fixed-layout",
      ],
      file: resolve(__dirname, "../src/extensions.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
    },
    // disabled because extension was taken down by Google
    // {
    //   name: "github-hovercard",
    //   crx: "mmoahbbnojgkclgceahhakhnccimnplk",
    //   prefix: `html[class*="ghh-"]`,
    //   match: ["html", ".ghh-theme-"],
    //   file: resolve(__dirname, "../src/extensions.css"),
    //   fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
    // },
    {
      name: "gitako",
      crx: "giljefjcheohhamkjphiebfjnlphnokk",
      prefix: `body.gitako-ready`,
      match: ["body", ".gitako-ready"],
      file: resolve(__dirname, "../src/extensions.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
    },
    // disabled because of crx errors
    // {
    //   name: "npmhub",
    //   crx: "kbbbjimdjbjclaebffknlabpogocablj",
    //   file: resolve(__dirname, "../src/extensions.css"),
    //   fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
    // },
    {
      name: "notifications-preview",
      crx: "kgilejfahkjidpaclkepbdoeioeohfmj",
      contentScriptsOnly: true,
      prefix: `html:root`,
      match: ["html", ":root", "[data-color-mode=dark]"],
      file: resolve(__dirname, "../src/extensions.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
    },
    {
      name: "octotree",
      crx: "bkhaagjahfmjljalopjnoealnfndnagc",
      contentScriptsOnly: true,
      prefix: `.octotree-sidebar`,
      match: [".octotree-sidebar"],
      file: resolve(__dirname, "../src/extensions.css"),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
    },
  ];
};
