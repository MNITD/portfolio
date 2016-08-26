'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    map = require('gulp-sourcemaps'),
    size = require('gulp-size'),
    concat = require('gulp-concat'),
    del = require('del'),
    min = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    cache = require('gulp-cached'),
    scsslint = require('gulp-scss-lint'),
    browser = require('browser-sync').create();

var paths = {
    js: './js/**/*.js',
    jsdir: './js',
    scripts: './scripts/**/*.js',
    scss: [
        './scss/**/*.scss',
        '!scss/**/*_scsslint_tmp*.scss'
    ],
    cssdir: './css',
    html: './**/*.html'
};

//Clean
gulp.task('clean', function (cb) {
    del.sync([paths.jsdir,
             paths.cssdir], cb);
});

gulp.task('sassDev', function () {
    return gulp.src(paths.scss)
        .pipe(map.init())
        .pipe(sass.sync({
            sourceComments: 'normal'
        }))
        .on('error', sass.logError)
        .pipe(size({
            showFiles: true
        }))
        .pipe(map.write())
        .pipe(gulp.dest(paths.cssdir))
        .pipe(browser.stream());
});

gulp.task('sassDeploy', function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.cssdir));
});

gulp.task('watch', function () {
    browser.init({
        server: {
            baseDir: './'
        }
        //if you use local server 
        //,proxy: {target: 'http://project.local/',
        //ws :true},
        //online: true
    });
    gulp.watch(paths.scss, ['sassDev']);
    gulp.watch([paths.html]).on('change', browser.reload);
});

gulp.task('jsDev', function () {
    return gulp.src(paths.scripts)
        .pipe(map.init())
        .pipe(size({
            showFiles: true
        }))
        .pipe(concat('all.js'))
        .pipe(map.write())
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest(paths.jsdir));
});

gulp.task('jsDeploy', function () {
    return gulp.src(paths.scripts)
        .pipe(concat('all.js'))
        .pipe(min())
        .pipe(gulp.dest(paths.jsdir));
});

gulp.task('jsHint', function () {
    var jsHint = gulp.src('./scripts/*.js')
        .pipe(watch(paths.scripts))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    return jsHint;
});

// Detect SASS errors
gulp.task('scssLint', function () {
    return gulp.src(paths.scss)
        .pipe(cache('scsslint'))
        .pipe(scsslint({
            /*'bundleExec': false,*/
            'config': 'lint.yml'
        }));
});


//Default
gulp.task('default', ['clean', 'sassDev', 'jsDev', 'jsHint', 'watch']);

//Production
gulp.task('prod', ['clean', 'sassDeploy', 'jsDeploy']);