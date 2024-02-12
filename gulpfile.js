const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  return gulp.src([
      'js/**/*.js',
      '!js/**/*.min.js', // exclude the .min file
      ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});