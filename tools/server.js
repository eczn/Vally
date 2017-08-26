// server.js
var config = require('../config'); 
var gulp = require('gulp');
var connect = require('gulp-connect'); 
var path = require('path'); 
var chokidar = require('chokidar'); 
// var collector = require('./collector');
var render = require('./render'); 
// var copy = require('./copy'); 
var logger = require('./logger'); 
var write = require('./write'); 

var reloadLog = logger.bucket('RELOAD'); 
var blank = n => new Array(n).fill(' ').join(''); 

var fillTo = (str, n) => {
	// var m = parseInt(str.length / 2); 
	var d = n - str.length; 
	if (d % 2 === 0){
		var temp = blank(parseInt(d / 2)); 
		return temp + str + temp; 	
	} else {
		var temp = blank(parseInt(d / 2)); 
		return temp + str + temp + ' '; 
	}
}

var reloadSuc = now => {
	let end = new Date(); 
	
	logger.clear(); 

	[
		blank(38).bgWhite.black, 
		fillTo('RELOAD SUCCESS', 38).bgWhite.black, 
		fillTo(`In ${end - now} ms`, 38).bgWhite.black,
		blank(38).bgWhite.black, 
		''
	].forEach(e => {
		console.log(e)
	}); 
}

function start(){
	connect.server({
		root: config.path.dist,
		port: 4444,
		livereload: true
	});

	// Watch For config.path.dist 
	var toWatch = [
		path.join(config.path.dist, '**/*'), 
		'!' + path.join(config.path.dist, '**/*.css')
	]

	var toWatchCSS = path.join(config.path.dist, '**/*.css'); 

	console.log(toWatch)

	gulp.watch(toWatch, ['reload']); 
	gulp.watch(toWatchCSS, ['reload-css']); 

	gulp.task('reload-css', function(){
		// console.log('Reload CSS'); 
		return gulp.src([toWatchCSS])
			.pipe(connect.reload())
	})

	gulp.task('reload', function(){
		// console.log('Reload All'); 
		return gulp.src(toWatch)
			.pipe(connect.reload());
	});

	// Watch For config.path.view 
	chokidar.watch([path.join(config.path.view, '**/*.html')], {
		ignored: /[\/\\]\./,
		persistent: true,
		ignoreInitial: true
		// awaitWriteFinish: true
	}).on(['all'], function(name, where, stat){
		let now = new Date(); 

		reloadLog('Reloading Template ... ');

		// render 重载
		render.reload({
			name: path.parse(where).name, 
			tpl: where
		}); 

		write().then(() => {
			reloadSuc(now); 

			console.log(`[ ${ name.toUpperCase() } ] Finish `.green); 
			console.log(`  ${'*'.grey} ${ where.yellow } `)
		});
	});

	// Watch For Blogs 
	gulp.watch(path.join(config.path.blog, '**/*'), ['blog-reload']); 
	gulp.task('blog-reload', function(){
		let now = new Date(); 

		reloadLog('Reloading Blogs ... ');

		write().then(() => {
			reloadSuc(now); 

			console.log(`[ MOD ] Edit Blogs`); 
		});
	}) 

	// Watch For JS/CSS 
	chokidar.watch(
		[
			path.join(config.path.view, '**/*.js'), 
			path.join(config.path.view, '**/*.css')
		], {
		ignored: /[\/\\]\./,
		persistent: true,
		ignoreInitial: true
		// awaitWriteFinish: true
	}).on(['all'], function(name, where, stat){
		// config.path.dist
		var ext = path.parse(where).ext.slice(1); 

		var end = path.join(config.path.dist, ext); 

		console.log(`[ RELOAD ] ${where} ${name}, Reloaded`);

		// Copy 
		gulp.src(where)
			.pipe(gulp.dest(end))
	})
}

module.exports = start; 
