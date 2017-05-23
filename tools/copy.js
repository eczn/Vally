// copy.js
var config = require('../config')
  , gulp = require('gulp')
  , copy = {}
  , path = require('path'); 

copy.jscss = function(){
	let allViewFiles = path.join(config.path.view, '**/*')
	  , htmlFiles = path.join(config.path.view, 'html/**/*')
	  , htmlDir = path.join(config.path.view, 'html'); 

	gulp.src([allViewFiles, '!' + htmlFiles, '!' + htmlDir]) 
		.pipe(gulp.dest(config.path.dist))
}

module.exports = copy; 
