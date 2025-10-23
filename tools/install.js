import open from "open";
import {createServer} from "node:http";
import {readFileSync} from "node:fs";

const server = createServer((_, res) => {
  res.setHeader("content-type", "text/css");
  res.on("close", () => {
    setTimeout(() => {
      process.exit(0);
    }, 4000);
  });
  res.end(readFileSync(new URL("../github-dark.user.css", import.meta.url), "utf8"));
});

server.listen(() => {
  open(`http://localhost:${server.address().port}/github-dark.user.css`);
});
