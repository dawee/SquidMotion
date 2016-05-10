var gulp = require('gulp');
var browserify = require('gulp-browserify');
var nwjsify = require('nwjs-browserify');


gulp.task('dist', function() {
  gulp.src('lib/boot/app.js')
    .pipe(browserify({
    }))
    .pipe(gulp.dest('./gui/static'))
});
