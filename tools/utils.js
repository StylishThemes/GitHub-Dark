"use strict";

const fastGlob = require("fast-glob");
const fetch = require("fetch-enhanced")(require("node-fetch"));
const {platform} = require("os");
const {resolve} = require("path");
const {writeFile, truncate} = require("fs").promises;

// special version of writeFile that preserves metadata on WSL and Cygwin platforms
module.exports.writeFile = async (file, content) => {
  if (platform() === "win32") {
    try {
      await truncate(file);
      await writeFile(file, content, {flag: "r+"});
    } catch {
      await writeFile(file, content);
    }
  } else {
    await writeFile(file, content);
  }
};

module.exports.exit = (err) => {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
};

module.exports.glob = (pattern) => {
  return fastGlob.sync(pattern, {cwd: resolve(__dirname, ".."), absolute: true});
};

let chromeVersion;
module.exports.userAgent = async (mobile) => {
  if (!chromeVersion) {
    const res = await fetch(`https://chromedriver.storage.googleapis.com/LATEST_RELEASE`);
    if (!res.ok) throw new Error(res.statusText);
    chromeVersion = await res.text();
  }

  return `Mozilla/5.0 (${mobile ? "Linux; Android 10; Pixel" : "Windows NT 10.0; Win64; x64"}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
};
