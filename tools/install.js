#!/usr/bin/env node
"use strict";

const open = require("open");
const {createServer} = require("http");
const {resolve} = require("path");
const {readFileSync} = require("fs");

const file = readFileSync(resolve(__dirname, "../github-dark.user.css"));

const server = createServer((_, res) => {
  res.setHeader("content-type", "text/css");
  res.on("close", () => {
    setTimeout(() => {
      process.exit(0);
    }, 2000);
  });
  res.end(file);
});

server.listen(() => {
  open(`http://localhost:${server.address().port}/github-dark.user.css`);
});
