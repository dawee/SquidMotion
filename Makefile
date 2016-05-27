bin = ./node_modules/.bin

test: build
	@${bin}/mocha -R nyan build/test

browserify:
	@${bin}/browserify lib/boot/app.js -t [ babelify --presets [ es2015 react ] ] \
		| sed 's/_require/require/' \
		> gui/static/squidmotion-app.js

build:
	@${bin}/babel -q --presets es2015,react -d build/ --ignore node_modules,gui,build .


.PHONY: test build
