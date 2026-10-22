node_modules: pnpm-lock.yaml
	pnpm install
	@touch node_modules

.PHONY: deps
deps: node_modules

.PHONY: lint
lint: node_modules
	pnpm exec stylelint --color *.user.css

.PHONY: lint-fix
lint-fix: node_modules
	pnpm exec stylelint --color *.user.css --fix

.PHONY: install
install:
	node -e 'const server = require("node:http").createServer((_, res) => { res.setHeader("content-type", "text/css"); res.on("close", () => setTimeout(() => process.exit(), 4000)); res.end(require("node:fs").readFileSync("github-dark.user.css")); }); server.listen(() => require("node:child_process").spawn({darwin: "open", win32: "explorer"}[process.platform] ?? "xdg-open", [`http://localhost:$${server.address().port}/github-dark.user.css`]))'

.PHONY: update
update: node_modules
	pnpm exec updates -u
	rm -rf node_modules pnpm-lock.yaml
	pnpm install
	@touch node_modules

.PHONY: patch minor major
patch minor major: node_modules lint
	pnpm exec versions -p $@ *.user.css package.json
