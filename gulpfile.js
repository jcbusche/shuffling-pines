"use strict";

//Include gulp
var gulp = require('gulp');

//include plugins
var jshint = require('gulp-jshint');

//lint task
gulp.task('lint', function(){
	return gulp.src('src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('watch', function(){
	gulp.watch('src/**/*.js', ['lint']);
});


//default
gulp.task('default', ['lint']);
