var path = require('path');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var babelify = require('babelify');
var less = require('gulp-less');
var rename = require('gulp-rename');

var staticDir = path.join(__dirname, 'gui', 'static');
var specs = [
 {
   src: './lib/style/main.less',
   processors: [
    less({
      paths: [ './lib/style' ]
    }),
    rename('squidmotion-app.css')
   ]
 },
 {
   src: 'lib/boot/app.js',
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

    stream.pipe(gulp.dest(staticDir));
  });
});
