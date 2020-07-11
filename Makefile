all: build

test: lint

build: generate usercss install

deps: node_modules

node_modules: yarn.lock
	@yarn --pure-lockfile
	@touch node_modules

lint: node_modules
	yarn -s run eslint --color .
	yarn -s run stylelint --color github-dark.css themes/src

authors:
	bash tools/authors.sh

clean: node_modules
	node tools/clean.js

generate: node_modules
	node tools/generate.js
	node tools/clean.js

themes: node_modules
	node tools/themes.js

update: node_modules
	yarn -s run updates -cu
	yarn -s run rimraf node_modules
	yarn
	@touch yarn.lock

install: node_modules
	node tools/install.js

usercss: node_modules
	node tools/usercss.js

patch: node_modules lint usercss
	yarn -s run versions -pdC patch github-dark.css github-dark.user.css
	git push --tags origin master

minor: node_modules lint usercss
	yarn -s run versions -pdC minor github-dark.css github-dark.user.css
	git push --tags origin master

major: node_modules lint usercss
	yarn -s run versions -pdC major github-dark.css github-dark.user.css
	git push --tags origin master

.PHONY: all test build deps lint authors clean generate themes update install usercss patch minor major
