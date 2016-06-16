bin = ./node_modules/.bin
sources = $(shell find ./lib -name "*.js")


browserify:
	@${bin}/browserify lib/boot/app.js \
		-t [ babelify --presets [ react ] ] \
		| sed 's/_require/require/' \
		> gui/static/squidmotion-app.js

test: build
	@${bin}/mocha -R nyan build/test

build:
	@${bin}/babel \
		--presets es2015,react \
		--ignore node_modules,gui,build . \
		-q -d build

lint:
	@${bin}/eslint ${sources}

.PHONY: test build
