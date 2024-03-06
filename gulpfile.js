const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const cleanTask = () => {
  return src('js/**/*.min.js', {read: false})
    .pipe(clean());
};

const scriptsTask = () => {
  return src([
      'js/**/*.js',
      '!js/**/*.min.js', // exclude the .min file
      ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('./js/'));
};

exports.default = series(cleanTask, scriptsTask);
