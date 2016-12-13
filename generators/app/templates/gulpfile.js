var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var del = require('del');
var rename = require('gulp-rename');
var spsave = require('gulp-spsave');

var path = {
    src:{
        scripts:["./src/js/**/*.js"],
        styles:["./src/css/**/*.css"]
    },
    dist:{
        scripts:'./dist',
        styles:'./dist',
        upload:'.dist/*'
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
    return gulp.src(path.src.styles)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.scripts))
        .pipe(notify({message:"Scripts completed"}));
});

gulp.task('upload', function(){
    return gulp.src(path.dist.upload)
        .pipe(spsave(coreOptions, creds));
})