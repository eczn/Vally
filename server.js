// server.js
var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');
var config = require('./config'); 
var gulp = require('gulp');
var connect = require('gulp-connect'); 
var path = require('path'); 
var server; 

module.exports = {
	server: server, 
	start: function(){
		connect.server({
			root: config.path.dist,
			port: 4444,
			livereload: true
		});

		var toWatch = path.join(config.path.dist, '**/*');
		console.log(toWatch.error); 
		gulp.watch(toWatch, ['reload']); 

		gulp.task('reload', function(){
			console.log('reload');
			return gulp.src([toWatch])
				.pipe(connect.reload());
		});
	},
	close: function(cb){
		server.close(cb); 
	}
}
