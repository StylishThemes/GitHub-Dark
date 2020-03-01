"use strict";

const {writeFile, truncate} = require("fs").promises;
const {platform} = require("os");

// this truncates and appends to existing files on windows to preserve file metadata for WSL
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
