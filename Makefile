node_modules: pnpm-lock.yaml
	pnpm install
	@touch node_modules

.PHONY: test
test: lint
	@:

.PHONY: build
build: node_modules clean
	node tools/build.js

.PHONY: deps
deps: node_modules

.PHONY: lint
lint: node_modules
	pnpm exec eslint-silverwind --color src/gen tools
	pnpm exec stylelint --color src/**/*.css
	pnpm exec tsgo

.PHONY: lint-fix
lint-fix: node_modules
	pnpm exec eslint-silverwind --color src/gen tools --fix
	pnpm exec stylelint --color src/**/*.css --fix
	pnpm exec tsgo

.PHONY: authors
authors:
	bash tools/authors.sh

.PHONY: clean
clean: node_modules
	node tools/clean.js

.PHONY: install
install: node_modules
	node tools/install.js

.PHONY: update
update: node_modules
	pnpm exec updates -cu
	rm -rf node_modules pnpm-lock.yaml
	pnpm install
	@touch node_modules

.PHONY: patch
patch: node_modules test
	pnpm exec versions -pd patch $(wildcard *.user.css) package.json pnpm-lock.yaml
	git push --tags origin master

.PHONY: minor
minor: node_modules test
	pnpm exec versions -pd minor $(wildcard *.user.css) package.json pnpm-lock.yaml
	git push --tags origin master

.PHONY: major
major: node_modules test
	pnpm exec versions -pd major $(wildcard *.user.css) package.json pnpm-lock.yaml
	git push --tags origin master
