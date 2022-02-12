all: build

test: lint

build: node_modules clean
# avoid 'stream/web is an experimental feature' warning
	node --no-warnings tools/build.js

deps: node_modules

node_modules: package-lock.json
	npm install --no-save
	@touch node_modules

lint: node_modules
	npx eslint --color src/gen tools
	npx stylelint --color src/**/*.css

authors:
	bash tools/authors.sh

clean: node_modules
	node tools/clean.js

install: node_modules
	node tools/install.js

update: node_modules
	npx updates -cu
	npm install
	@touch node_modules package-lock.json

patch: node_modules lint
	npx versions -pdC patch $(wildcard *.user.css)
	git push --tags origin master

minor: node_modules lint
	npx versions -pdC minor $(wildcard *.user.css)
	git push --tags origin master

major: node_modules lint
	npx versions -pdC major $(wildcard *.user.css)
	git push --tags origin master

.PHONY: all test build deps lint authors clean install update patch minor major
