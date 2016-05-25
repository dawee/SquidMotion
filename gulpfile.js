var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var babelify = require('babelify');
var express = require('express');
var rename = require('gulp-rename');
var through = require('through2');


var rules = {
  'static/squidmotion-app.js': {
    src: 'lib/boot/app.js',
    generator: function () {
      return browserify({
        transform: [babelify.configure({presets: ['es2015', 'react']})],
      });
    }
  }
};

function createStream(dest) {
  return gulp
    .src(path.join(__dirname, rules[dest].src))
    .pipe(rules[dest].generator());
}

gulp.task('default', function() {
  Object.keys(rules).forEach(function (dest) {
    createStream(dest)
      .pipe(rename(path.basename(dest)))
      .pipe(gulp.dest('./gui/static'));
  });
});

gulp.task('dev', function() {
  var app = express();

  app.get(/^(.*)$/, function (req, res) {
    var part = req.params[0].replace(/^\//, '');

    if (part in rules) {
      createStream(part).pipe(through.obj(function(file, enc, cb) {
        if (file.isBuffer()) {
          res.write(file.contents);
          res.end();
        } else if (file.isStream) {
          file.contents.pipe(res);
        }

        cb();
      }));
    } else if (part === '') {
      fs.createReadStream('./gui/index.html').pipe(res);
    } else if (fs.existsSync(path.join('./gui', part))) {
      fs.createReadStream(path.join('./gui', part)).pipe(res);
    } else {
      res.status(404).send();
      res.end();
    }
  });

  app.listen(8666);
});

gulp.task('foobar', function () {
  gulp.src('lib/boot/app.js')
    .pipe(through.obj(function(file, enc, cb) {
      this.push(file);
      cb();
    }))
    .pipe(gulp.dest('/tmp'));
});