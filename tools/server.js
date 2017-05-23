// server.js
var config = require('../config'); 
var gulp = require('gulp');
var connect = require('gulp-connect'); 
var path = require('path'); 
var chokidar = require('chokidar'); 
var collector = require('./collector');
var copy = require('./copy'); 

function start(cb){
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

	var watchView = chokidar.watch([config.path.view], {
		ignored: /[\/\\]\./,
		persistent: true,
		ignoreInitial: true
		// awaitWriteFinish: true
	});

	watchView.on(['all'], function(name, where, stat){
		cb(name, where); 

		copy.jscss(); 

		collector(); 
	});

	

	// Init 
	copy.jscss(); 
	collector(); 
}

module.exports = start; 
