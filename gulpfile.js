'use strict';
var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('style', function() {
    return gulp.src(path.join(__dirname, 'less/*.less'))
        .pipe(less())
        .pipe(gulp.dest(path.join(__dirname, 'css')));
});

gulp.task('default', ['style']);

gulp.task('watch', ['default'], function() {
    return gulp.watch(path.join(__dirname, 'less/**/*.less'), ['style']);
});