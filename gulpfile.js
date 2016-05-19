var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var babelify = require('babelify');
var express = require('express');
var less = require('gulp-less');
var rename = require('gulp-rename');



var specs = [
 {
   /*
    * LESS Processor
    */

   src: './lib/style/main.less',
   processors: [
    less({
      paths: ['./lib/style']
    }),
    rename('squidmotion-app.css')
   ]
 },
 {
   /*
    * Browserify (with babel/react) processor
    */

   src: './lib/boot/app.js',
   processors: [
    browserify({
      transform: [babelify.configure({presets: ['es2015', 'react']})],
    }),
    rename('squidmotion-app.js')
   ]
 }
];

gulp.task('default', function() {
  specs.forEach(function (spec) {
    var stream = gulp.src(spec.src);

    spec.processors.forEach(function (processor) {
      stream = stream.pipe(processor);
    });

    stream.pipe(gulp.dest('./gui/static'));
  });
});

gulp.task('dev', function() {
  var app = express();

  app.get(/^(.*)$/, function (req, res) {
    var part = req.params[0];
    var stream = null;

    if (part === '' || part === '/') {
      stream = fs.createReadStream('./gui/index.html');
    } else {
      stream = fs.createReadStream(path.join('./gui', part));
    }

    stream.pipe(res);
  });

  app.listen(8666);
});
