all: build

test: lint

build: node_modules
	node tools/clean.js
	node tools/build.js

deps: node_modules

node_modules: yarn.lock
	@yarn -s --pure-lockfile
	@touch node_modules

lint: node_modules
	yarn -s run eslint --color .
	yarn -s run stylelint --color src

authors:
	bash tools/authors.sh

clean: node_modules
	node tools/clean.js

install: node_modules
	node tools/install.js

update: node_modules
	yarn -s run updates -cu
	yarn -s run rimraf node_modules
	yarn -s
	@touch yarn.lock

patch: node_modules lint
	yarn -s run versions -pdC patch github-dark.user.css
	git push --tags origin master

minor: node_modules lint
	yarn -s run versions -pdC minor github-dark.user.css
	git push --tags origin master

major: node_modules lint
	yarn -s run versions -pdC major github-dark.user.css
	git push --tags origin master

.PHONY: all test build deps lint authors clean install update patch minor major
