var path = require('path');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var babelify = require('babelify');
var rename = require('gulp-rename');


gulp.task('default', function() {
  var staticDir = path.join(__dirname, 'gui', 'static');

  gulp.src('lib/boot/app.js')
    .pipe(browserify({
      transform: [babelify.configure({presets: ['es2015', 'react']})],
    }))
    .pipe(rename('squidmotion-app.js'))
    .pipe(gulp.dest(staticDir));
});
