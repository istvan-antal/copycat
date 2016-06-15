const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpackConfiguration = require('./webpackConfiguration');
const eslint = require('gulp-eslint');
const fs = require('fs');

gulp.task('build-js', () =>
    gulp.src('app.js')
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

gulp.task('index.html', () =>
    gulp.src(__dirname + '/index.html')
        .pipe(gulp.dest('dist/'))
);

gulp.task('photon', () =>
    gulp.src(__dirname + '/node_modules/photon/**/*', { base: '.' })
        .pipe(gulp.dest('dist/'))
);

gulp.task('runner-files', ['index.html', 'photon']);

/* eslint no-console: 0 */
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

gulp.task('run', ['runner-files'], () => {
    const config = Object.assign(
        {},
        webpackConfiguration,
        {
            output: {
                filename: 'app.dev.js',
                publicPath: 'dist',
                path: path.resolve(__dirname, 'dist')
            }
        }
    );
    config.entry = {
        'app.dev': './app.dev.js'
    };

    const compiler = webpack(config);

    new WebpackDevServer(compiler, {
        contentBase: path.resolve(__dirname, 'dist')
    }).listen(8080, 'localhost', (err) => {
        if (err) {
            throw err;
        }
        // Server listening
        console.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');

        // keep the server alive or continue?
        // callback();
    });
});