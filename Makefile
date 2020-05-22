test: lint

lint:
	yarn -s run eslint --color .
	yarn -s run stylelint --color github-dark.css themes/src

authors:
	bash tools/authors.sh

build: generate usercss

clean: perfectionist
	node tools/clean.js

generate:
	node tools/generate.js
	$(MAKE) -s clean

perfectionist:
	yarn -s run perfectionist github-dark.css github-dark.css --indentSize 2 --maxAtRuleLength 250

themes:
	node tools/themes.js

deps:
	yarn

update:
	yarn -s run updates -cu
	$(MAKE) -s deps

usercss:
	node tools/usercss.js

patch: lint usercss
	yarn -s run versions -pdC patch github-dark.css github-dark.user.css
	git push --tags origin master

minor: lint usercss
	yarn -s run versions -pdC minor github-dark.css github-dark.user.css
	git push --tags origin master

major: lint usercss
	yarn -s run versions -pdC major github-dark.css github-dark.user.css
	git push --tags origin master

.PHONY: test lint authors build clean generate perfectionist themes deps update usercss patch minor major
