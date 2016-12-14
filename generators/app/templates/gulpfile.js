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


gulp.task('upload', ['scripts', 'styles'], function () {
    return gulp.src(['dist/*.*'])
        .pipe(spsave(settings.coreOptions, settings.credentials));
});

gulp.task('upload-scripts', ['scripts'], function () {
    return gulp.src(['dist/*.js'])
        .pipe(spsave(settings.coreOptions, settings.credentials));
});

gulp.task('upload-styles', ['styles'], function () {
    return gulp.src(['dist/*.css'])
        .pipe(spsave(settings.coreOptions, settings.credentials));
});

gulp.task('watch', function () {
    gulp.watch(path.src.scripts, ['upload-scripts']);
    gulp.watch(path.src.styles, ['upload-styles']);
});

gulp.task('lint-scripts', function () {
    return gulp.src(path.src.scripts)
        .pipe(eslint({
            "extends": "standard"
        }))
        .pipe(eslint.format());
});

gulp.task('test', ['lint-scripts']);

gulp.task('default', ['upload', 'watch']);
