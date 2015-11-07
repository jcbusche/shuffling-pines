"use strict";

//Include gulp
var gulp = require('gulp');
var bower = require('bower');

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

gulp.task('bower', function(cb){
	bower.commands.install([], {save: true}, {})
		.on('end', function(installed){
			cb();
		});
});


//default
gulp.task('default', ['lint']);
