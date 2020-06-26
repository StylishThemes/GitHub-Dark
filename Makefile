test: lint

build: generate usercss

deps: node_modules

node_modules: yarn.lock
	yarn
	@touch node_modules

lint: node_modules
	yarn -s run eslint --color .
	yarn -s run stylelint --color github-dark.css themes/src

authors:
	bash tools/authors.sh

clean: node_modules perfectionist
	node tools/clean.js

generate: node_modules
	node tools/generate.js
	$(MAKE) clean

perfectionist: node_modules
	yarn -s run perfectionist github-dark.css github-dark.css --indentSize 2 --maxAtRuleLength 250

themes: node_modules
	node tools/themes.js

update: node_modules
	yarn -s run updates -cu
	yarn -s run rimraf node_modules
	yarn
	@touch yarn.lock

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

.PHONY: test build deps lint authors clean generate perfectionist themes update usercss patch minor major
