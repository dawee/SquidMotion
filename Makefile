bin = ./node_modules/.bin

test: build
	@${bin}/mocha -R nyan build/test

browserify: build
	@${bin}/browserify build/lib/boot/app.js -o gui/static/squidmotion-app.js

build:
	@${bin}/babel -q --presets es2015,react -d build/ --ignore node_modules,gui .


.PHONY: test build
