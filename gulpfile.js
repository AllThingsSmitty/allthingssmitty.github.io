const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('concat-scripts', function() {
    return gulp.src([
            './js/*.js',
            '!./js/fontfaceobserver.min.js',
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});

// Sass reference: https://zellwk.com/blog/dart-sass-gulp/