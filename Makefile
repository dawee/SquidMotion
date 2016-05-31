bin = ./node_modules/.bin
sources = $(shell find ./lib -name "*.js")

test: build
	@${bin}/mocha -R nyan build/test

browserify:
	@${bin}/browserify lib/boot/app.js \
		-t [ babelify --presets [ es2015 react ] ] \
		-t nwjs-browserify \
		-o gui/static/squidmotion-app.js

build:
	@${bin}/babel \
		--presets es2015,react \
		--ignore node_modules,gui,build . \
		-q -d build

lint:
	@${bin}/eslint ${sources}

.PHONY: test build
