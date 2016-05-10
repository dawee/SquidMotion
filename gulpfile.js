var gulp = require('gulp');
var browserify = require('gulp-browserify');
 
gulp.task('dist', function() {
  gulp.src('lib/boot/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    .pipe(gulp.dest('./gui/static'))
});
