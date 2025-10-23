import {platform} from "node:os";
import {writeFileSync, truncateSync, globSync} from "node:fs";

// version of writeFile that preserves metadata on WSL and Cygwin platforms
export function writeFile(file, content) {
  if (platform() === "win32") {
    try {
      truncateSync(file);
      writeFileSync(file, content, {flag: "r+"});
    } catch {
      writeFileSync(file, content);
    }
  } else {
    writeFileSync(file, content);
  }
}

export function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}

export function glob(pattern) {
  return globSync(pattern, {cwd: new URL("..", import.meta.url)});
}

let chromeVersion;

export async function userAgent(mobile) {
  if (!chromeVersion) {
    const res = await fetch(`https://chromedriver.storage.googleapis.com/LATEST_RELEASE`);
    if (!res.ok) throw new Error(res.statusText);
    chromeVersion = await res.text();
  }

  return `Mozilla/5.0 (${mobile ? "Linux; Android 10; Pixel" : "Windows NT 10.0; Win64; x64"}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
}
