// new.js 
var config = require('../config')
  , fs = require('fs')
  , path = require('path')
  , log = require('../tools/vlog')
  , open = require("open");

module.exports = function(fileName){
	if (fileName.length === 0) fileName = "newblog.md"; 

	fileName = fileName.endsWith('.md') ? '' : fileName+".md"; 

	// Blog Directory Location 
	let blog = config.path.blog; 

	if (fs.existsSync(path.join(blog, fileName))){
		log('ERROR', [
			`${fileName} EXIST !!! `
		], 'prompt'); 

		// EXIST 
		return; 
	} else {
		// Log 
		log('INFO', [
			('Your Blogs Source Located in ' + blog.verbose),
			`And Vally Will Add A New File "${fileName}" To There`.warn
		], 'info'); 
	}

	// New Blog Template
	let data = fs.readFileSync(
		path.join(__dirname, '../', 'view', 'html', 'blog', 'New.md')
	).toString(); 
	data = data.replace('TIMETIMETIME', new Date().toString()); 

	// let data = JSON.stringify(temp); 
	fs.writeFile(path.join(blog, fileName), data, function(err){
		if (err) throw err; 
			
		console.log(
			'NEW SUCCESS: '.verbose,
			`${path.join(config.path.blog, fileName)}`.verbose
		); 
		console.log(
			'NEXT,'.verbose,
			'You Can Use "'.verbose + "vally serve".warn + '" To Start Vally Server'.verbose
		); 
		open(path.join(config.path.blog, fileName)); 
	}); 
}