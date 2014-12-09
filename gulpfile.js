/**
 * Created by tomasnagy on 09/12/14.
 */
/**
 * Created by tomasnagy on 09/12/14.
 */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del');

gulp.task('clean', function(cb) {
    del(['public/javascripts/build'], cb)
});

gulp.task('js', function () {
    return gulp.src(['public/javascripts/**/*.js', '!public/javascripts/**/*.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('public/javascripts/build'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('js');
});