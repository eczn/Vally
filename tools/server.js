// server.js
var config = require('../config'); 
var gulp = require('gulp');
var connect = require('gulp-connect'); 
var path = require('path'); 
var chokidar = require('chokidar'); 
// var collector = require('./collector');
var render = require('./render'); 
// var copy = require('./copy'); 

var write = require('./write'); 

function start(){
	connect.server({
		root: config.path.dist,
		port: 4444,
		livereload: true
	});

	// Watch For config.path.dist 
	var toWatch = path.join(config.path.dist, '**/*');
	gulp.watch(toWatch, ['reload']); 
	gulp.task('reload', function(){
		return gulp.src([toWatch])
			.pipe(connect.reload());
	});

	// Watch For config.path.view 
	chokidar.watch([config.path.view], {
		ignored: /[\/\\]\./,
		persistent: true,
		ignoreInitial: true
		// awaitWriteFinish: true
	}).on(['all'], function(name, where, stat){
		let now = new Date(); 

		console.log('[[ RELOAD ]] Reloading Template ... ');

		// render 重载
		render.reload({
			name: path.parse(where).name, 
			tpl: where
		}); 

		write().then(allDone => {
			let end = new Date(); 
			console.log(`[[ RELOAD ]] Reload Ending, Time: ${end - now} ms`); 
		});
	});

	// Watch For Blogs 
	gulp.watch(path.join(config.path.blog, '**/*'), ['blog-reload']); 
	gulp.task('blog-reload', function(){
		let now = new Date(); 

		console.log('[[ RELOAD ]] Reloading Blogs ... ');

		write().then(allDone => {
			let end = new Date(); 
			console.log(`[[ RELOAD ]] Reload Ending, Time: ${end - now}`);
		});
	}) 
}

module.exports = start; 
