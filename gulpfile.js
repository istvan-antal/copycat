const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpackConfiguration = require('./webpackConfiguration');
const eslint = require('gulp-eslint');
const fs = require('fs');

gulp.task('build-js', () =>
    gulp.src('app.jsx')
        .pipe(webpackStream(webpackConfiguration))
        .pipe(gulp.dest('dist/'))
);

gulp.task('check', () => {
    const eslintrcPath = process.cwd() + '/.eslintrc.json';
    const config = JSON.parse(fs.readFileSync(eslintrcPath));
    return gulp.src(['*.jsx', '*.js', '**/*.js', '**/*.jsx', '!node_modules/**', '!dist/**'])
    .pipe(eslint(config))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});