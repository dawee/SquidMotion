bin = ./node_modules/.bin

test: build
	@${bin}/mocha -R nyan build/test

browserify:
	@${bin}/browserify lib/boot/app.js -o gui/static/squidmotion-app.js -t [ babelify --presets [ es2015 react ] ]

build:
	@${bin}/babel -q --presets es2015,react -d build/ --ignore node_modules,gui,build .


.PHONY: test build
