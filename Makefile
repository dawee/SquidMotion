bin = ./node_modules/.bin
sources = $(shell find ./lib -name "*.js")


browserify:
	@${bin}/browserify lib/component/app.js | sed 's/_require/require/' > boot/static/squidmotion-app.js

test:
	@${bin}/mocha -R nyan test

lint:
	@${bin}/eslint ${sources}

.PHONY: test build
