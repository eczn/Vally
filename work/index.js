var config = require('./config');
var vally = require('./vally'); 
var archTree = require('./archList'); 
var fs = require("fs"); 
var path = require('path'); 
var template = require('art-template');

// vally.generate();
// console.log(config); 
// dist 
// var dist = './build'; 

// arch('./blogs', function(archives){
// 	console.log(archives[0].length);
// });



archTree('./blogs', function(archives){
	// fs.readdir(config.blog, function(err, files){
	// 	// console.log(files);

	// archives[0].forEach((mdPath) => {
	// 	// absolute path
	// 	// console.log(mdPath); 
	// 	vally.generate(mdPath, function(data){
	// 		var tmp = path.parse(mdPath); 
	// 		fs.writeFile('./build/'+tmp.name+'.html', data,  function(err) {
	// 			if (err) {
	// 				return console.error(err);
	// 			}
	// 		});
	// 	}); 
	// });


	// get the file list(archives) and travel & render it by template: blog.html 
	// console.log(archives);
	archives.forEach((arch) => {
		// travel 
		arch.list.forEach((file)=>{
			
			// console.log(arch.path+'/'+file); 
			vally.generate(arch.path+'/'+file, function(data){ // Sync
				// console.log(data); 
				var tmp = path.parse(file); 

				// console.log(arch.name); 
				// var tmp = fs.readdirSync('./build/blog'); 

				// console.log( './build/blog/' + arch.name + '/' + tmp.name + '.html'); 

				
				
				// fs.mkdirSync('./build/blog');
				

				fs.writeFile('./build/blog/' + arch.name + '/' + tmp.name + '.html', data, {
					flags: 'w+'
				}, function(err) {
					if (err){
						console.log(err); 
					}
				}); 
			}); 
		}); 

	}); 

	var entryData = {
		archives: archives
	}

	template.config('base', __dirname);
	template.config('escape', false);
	template.config('encoding', 'utf-8'); 

	var html = template("./template/entry/entry", entryData);
	fs.writeFile('./build/index.html', html, {
		flags: 'w+'
	}, function(err) {
		if (err){
			console.log(err); 
		}
	}); 
	// console.log(archives);
	// console.log(html); 
}); 


