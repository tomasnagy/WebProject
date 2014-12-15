/**
 * Created by tomasnagy on 09/12/14.
 */
/**
 * Created by tomasnagy on 09/12/14.
 */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del');

// Clean build folder
gulp.task('clean', function(cb) {
    del(['public/build'], cb)
});

// Compile sass, auto prefix & minify css
gulp.task('scss', function() {
    return gulp.src('public/stylesheets/style.scss')
        .pipe(sass({ "sourcemap=none": true }))
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('public/build/stylesheets'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('public/build/stylesheets'))
        .pipe(notify({ message: 'Styles minified!'}));
});

// Minify & concat scripts
gulp.task('js', function () {
    return gulp.src(['public/javascripts/**/*.js', '!public/javascripts/**/*.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('public/build/javascript'))
        .pipe(notify({ message: 'Scripts minified!'}));
});

gulp.task('default', ['clean'], function() {
    gulp.start('js', 'scss');
});

// Livereload
gulp.task('Watcher', function() {

    gulp.watch('public/stylesheets/style.scss', ['scss']);

    gulp.watch(['public/javascripts/**/*.js', '!public/javascripts/**/*.min.js'], ['js']);

    livereload.listen();

    gulp.watch(['public/build/**']).on('change', livereload.changed);

});