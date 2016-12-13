var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var del = require('del');
var rename = require('gulp-rename');
var spsave = require('gulp-spsave');

//user information
var settings = require("./settings.js");

var path = {
    src:{
        scripts:["./src/js/**/*.js"],
        styles:["./src/css/**/*.css"],
        upload:["dist/*.*"],
    },
    dist:{
        scripts:'./dist',
        styles:'./dist',
    }
};

gulp.task('clean', function(){
    return del('dist/*');
});

gulp.task('styles',function(){
    return gulp.src(path.src.styles)
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.styles))
        .pipe(notify({message:"Styles completed"}));
});

gulp.task('scripts',function(){
    return gulp.src(path.src.scripts)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.scripts))
        .pipe(notify({message:"Scripts completed"}));
});


gulp.task('upload', function(){
    return gulp.src(["dist/*.*"])
        .pipe(spsave(settings.coreOptions,settings.credentials))
});

gulp.task('upload-scripts', function(){
    return gulp.src(["dist/*.js"])
        .pipe(spsave(settings.coreOptions,settings.credentials))
});

gulp.task('upload-styles', function(){
    return gulp.src(["dist/*.css"])
        .pipe(spsave(settings.coreOptions,settings.credentials))
});
gulp.task('watch', function(){
    gulp.watch(path.src.scripts, ['scripts', 'upload-scripts']);
    gulp.watch(path.src.styles, ['styles', 'upload-styles'] );
})

gulp.task('default',['styles','scripts','upload', 'watch']);