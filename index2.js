var config = require('./config');
var vally = require('./vally'); 
var archTree = require('./archList'); 
var fs = require("fs"); 
var path = require('path'); 
var template = require('art-template');
var server = require('./server'); 
// vally.generate();
// console.log(config); 
// dist 
// var dist = './build'; 

// arch('./blogs', function(archives){
// 	console.log(archives[0].length);
// });
var config = require('./config'); 
var startVally = function(){
	// var path = require('path'); 
	// console.log("!!!"); 
	// console.log(__dirname)
	// console.log(path.resolve('./')); 

	// archTree('./blogs', function(archives){
	archTree(config.path.blog, function(archives){
		console.log("@@ "); 
		console.log(archives); 
		// get the file list(archives) and travel & render it by template: blog.html 
		archName = []; 
		archives.forEach((arch) => {
			// travel 
			archName.push(arch.name); 
			arch.list.forEach((file)=>{
				// console.log(arch.path+'/'+file); 
				// console.log("!!");
				// console.log(arch); 
				vally.generate(arch.path+'/'+file, function(data){ // Sync
					// console.log(data); 
					var tmp = path.parse(file); 

					// console.log(arch.name); 
					// var tmp = fs.readdirSync('./build/blog'); 

					// console.log( './build/blog/' + arch.name + '/' + tmp.name + '.html'); 
					// fs.mkdirSync('./build/blog');
					

					fs.writeFile(config.path.dist + '/blog/' + arch.name + '/' + tmp.name + '.html', data, {
						flags: 'w+'
					}, function(err) {
						if (err){
							console.log(err); 
						}
					}); 
				}); 
			}); 

		}); 




		// all 
		var entryData = {
			archives: archives,
			archName: archName
		}
		template.config('base', __dirname);
		template.config('escape', false);
		template.config('encoding', 'utf-8'); 
		// var html = template("./template/entry/entry", entryData);
		// all blogs; all arch 
		var html = template(config.path.template+"/entry/entry", entryData);
		
		fs.writeFile(config.path.dist+'/blog/all/index.html', html, {
			flags: 'w+'
		}, function(err) {
			if (err){
				console.log(err); 
			}
		}); 


		// 单独分类 entry
		archives.forEach((arch) => {
			var tmpArr = new Array(); 
			tmpArr[0] = arch; 
			var subEntryData = {
				archives: tmpArr,
				archName: archName
			}
			var html = template(config.path.template+"/entry/entry", subEntryData);
			fs.writeFile(config.path.dist+'/blog/' + arch.name + '/index.html', html, {
				flags: 'w+'
			}, function(err) {
				if (err){
					console.log(err); 
				}
			}); 
		});

		// 默认分类 config.blog.default 
		archives.forEach((arch) => {
			if (arch.name == config.blog.default){
				var defaultData = {
					arch: arch,
					archName: archName
				}
				var html = template(config.path.template+"/entry/default", defaultData);

				fs.writeFile(config.path.dist + '/index.html', html, {
					flags: 'w+'
				}, function(err) {
					if (err){
						console.log(err); 
					}
				}); 

				console.log(arch); 

			}
		});

		// console.log(archives);
		// console.log(html); 
	}); 


}

server.start(); 
// var chokidar = require('chokidar'); 
// watcher = chokidar.watch('./work/template', {ignored: /[\/\\]\./}).on('all', (event, path) => {
// 	console.log('regene')
// 	startVally(); 
// });


startVally(); 
// module.exports = startVally; 
