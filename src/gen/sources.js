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
      name: "notebooks.githubusercontent.com",
      url: [
        "https://notebooks.githubusercontent.com/view/ipynb?enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f69626d2d65742f6a7570797465722d73616d706c65732f313735386334373237336536383038343965316638306363636134393638353966643839393638332f656c61737469636974792f456c61737469636974792532304578706572696d656e742e6970796e62&path=elasticity%2FElasticity+Experiment.ipynb"
      ],
      file: fileURLToPath(new URL("../src/render.css", import.meta.url)),
      fetchOpts: {headers: {"User-Agent": desktopUserAgent}},
      strict: true,
    },
  ];
};
