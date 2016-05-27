bin = ./node_modules/.bin

test: build
	@${bin}/mocha -R nyan build/test

browserify:
	@${bin}/browserify lib/boot/app.js \
		-t [ babelify --presets [ es2015 react ] ] \
		| sed 's/_require/require/' \
		> gui/static/squidmotion-app.js

build:
	@${bin}/babel \
		--presets es2015,react \
		--ignore node_modules,gui,build . \
		-q -d build


.PHONY: test build
