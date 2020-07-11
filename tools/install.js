#!/usr/bin/env node
"use strict";

const open = require("open");
const {createServer} = require("http");
const {resolve} = require("path");
const {readFileSync} = require("fs");

const file = readFileSync(resolve(__dirname, "../github-dark.user.css"));

const server = createServer((_, res) => {
  res.setHeader("content-type", "text/css");
  res.end(file);
  res.on("close", () => {
    setTimeout(() => {
      process.exit(0);
    }, 2000);
  });
});

server.listen(() => {
  open(String(Object.assign(new URL("http://x"), {
    hostname: "localhost",
    port: server.address().port,
    pathname: "/github-dark.user.css",
  })));
});
