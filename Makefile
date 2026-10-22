.PHONY: install
install:
	node -e 'const server = require("node:http").createServer((_, res) => { res.setHeader("content-type", "text/css"); res.on("close", () => setTimeout(() => process.exit(), 4000)); res.end(require("node:fs").readFileSync("github-dark.user.css")); }); server.listen(() => require("node:child_process").spawn({darwin: "open", win32: "explorer"}[process.platform] ?? "xdg-open", [`http://localhost:$${server.address().port}/github-dark.user.css`]))'

.PHONY: patch minor major
patch minor major:
	pnpm dlx versions -p $@ github-dark.user.css
