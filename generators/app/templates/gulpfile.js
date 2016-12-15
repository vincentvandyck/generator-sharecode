'use strict';
var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');
var csslint = require('gulp-csslint');
var del = require('del');
var rename = require('gulp-rename');
var spsave = require('gulp-spsave');

// User information
var settings = require('./settings.js');

var path = {
    src: {
        scripts: ['./src/js/**/*.js'],
        styles: ['./src/css/**/*.css'],
        upload: ['dist/*.*']
    },
    dist: {
        scripts: './dist',
        styles: './dist'
    }
};

gulp.task('clean', function () {
    return del('dist/*');
});

gulp.task('styles', function () {
    return gulp.src(path.src.styles)
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.styles))
        .pipe(notify({message: 'Styles completed'}));
});

gulp.task('scripts', function () {
    return gulp.src(path.src.scripts)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.scripts))
        .pipe(notify({message: 'Scripts completed'}));
});


gulp.task('upload-dist', ['scripts', 'styles'], function () {
    return gulp.src(['dist/*.*'])
        .pipe(spsave(settings.coreOptionsDist, settings.credentials));
});

gulp.task('upload-scripts-dist', ['scripts'], function () {
    return gulp.src(['dist/*.js'])
        .pipe(spsave(settings.coreOptionsDist, settings.credentials));
});

gulp.task('upload-styles-dist', ['styles'], function () {
    return gulp.src(['dist/*.css'])
        .pipe(spsave(settings.coreOptionsDist, settings.credentials));
});

gulp.task('upload-dev', ['scripts', 'styles'], function () {
    return gulp.src(['src/**/*.*'])
        .pipe(spsave(settings.coreOptionsDev, settings.credentials));
});

gulp.task('upload-scripts-dev', ['scripts'], function () {
    return gulp.src(['src/js/**/*.js'])
        .pipe(spsave(settings.coreOptionsDev, settings.credentials));
});

gulp.task('upload-styles-dev', ['styles'], function () {
    return gulp.src(['src/css/**/*.css'])
        .pipe(spsave(settings.coreOptionsDev, settings.credentials));
});

gulp.task('watch-dev', function () {
    gulp.watch(path.src.scripts, ['upload-scripts-dev']);
    gulp.watch(path.src.styles, ['upload-styles-dev']);
});

gulp.task('lint-scripts', function () {
    return gulp.src(path.src.scripts)
        .pipe(eslint({
            "rules": {
                "quotes": [1, "double"],
                "no-console": 2,
                "no-alert": 2,
                "curly": 1,
                "eqeqeq": 2,
                "no-empty-function": 1,
                "no-self-compare": 1,
                "array-bracket-spacing": 1,
                "camelcase": 1,
                "comma-dangle": 1
            },
            "env":["browser"]
        }))
        .pipe(eslint.format('table'))
        .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint-scripts']);

gulp.task('default', ['upload-dev', 'watch-dev']);

gulp.task('build', ['lint-scripts', 'upload-dist'])
