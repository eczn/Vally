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
var chokidar = require('chokidar'); 

module.exports = {
	server: server, 
	start: function(cb){
		connect.server({
			root: config.path.dist,
			port: 4444,
			livereload: true
		});

		var toWatch = path.join(config.path.dist, '**/*');
		gulp.watch(toWatch, ['reload']); 

		gulp.task('reload', function(){
			return gulp.src([toWatch])
				.pipe(connect.reload());
		});

		var watcher = chokidar.watch(['./**/*', config.path.blog], {
			ignored: /[\/\\]\./,
			persistent: true
			// awaitWriteFinish: true
		});

		watcher.on('change', cb);

	},
	close: function(cb){
		server.close(cb); 
	}
}
