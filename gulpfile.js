const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpackConfiguration = require('./webpackConfiguration');

gulp.task('build-js', () =>
    gulp.src('app.jsx')
        .pipe(webpackStream(webpackConfiguration))
        .pipe(gulp.dest('dist/'))
);