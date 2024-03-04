const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('clean', function () {
  return gulp.src('js/**/*.min.js', {read: false})
    .pipe(clean());
});

gulp.task('scripts', function() {
  return gulp.src([
      'js/**/*.js',
      '!js/**/*.min.js', // exclude the .min file
      ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('default', gulp.series('clean', 'scripts'));
