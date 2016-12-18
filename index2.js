var config = require('./config');
var vally = require('./vally'); 
var archTree = require('./archList'); 
var fs = require("fs"); 
var path = require('path'); 
var template = require('art-template');
var server = require('./server'); 

var colors = require('colors');

colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'red',
	info: 'green',
	data: 'blue',
	help: 'cyan',
	warn: 'yellow',
	debug: 'magenta',
	error: 'red'
});

// var log = console.log.bind(console);
console.log('this is an error'.error);
console.log('this is a warning'.warn);
console.log('this is a debug'.debug);
console.log('this is a help'.help);
console.log('this is a silly'.silly);
console.log('this is a input'.input);
console.log('this is a prompt'.prompt);
console.log('this is a data'.data);
console.log('this is a info'.info); 
console.log('this is a verbose'.verbose); 

function DatePro(date){
	var h, m, s; 
	h = date.getHours(); 
	m = date.getMinutes(); 
	s = date.getSeconds(); 

	return 0; 
}

Date.prototype.parse = function(){
	var h, m, s; 
	h = this.getHours(); 
	m = this.getMinutes(); 
	s = this.getSeconds(); 

	h>=10?(''+h):(h='0'+h); 
	m>=10?(''+m):(m='0'+m); 
	s>=10?(''+s):(s='0'+s); 


	return ('['+h+':'+m+':'+s+']').grey; 
};

function log(name, disArr, color){
	if (!color){
		color = 'verbose'; 
	}
	console.log(new Date().parse()+name[color]); 
	disArr.forEach(function(elem){
		console.log(elem); 
	}); 
	console.log((name+"End")[color]); 
}

// vally.generate();
// console.log(config); 
// dist 
// var dist = './build'; 

// arch('./blogs', function(archives){
// 	console.log(archives[0].length);
// });
var config = require('./config'); 
var startVally = function(cb){
	// var path = require('path'); 
	// console.log("!!!"); 
	// console.log(__dirname)
	// console.log(path.resolve('./')); 

	// archTree('./blogs', function(archives){
	archTree(config.path.blog, function(archives){
		// console.log("@@ archives ↓".info); 
		log('@@ archives' ,[archives], 'green'); 
		// console.log("@@ archivesEnd".info); 
		// get the file list(archives) and travel & render it by template: blog.html 
		archName = []; 
		archives.forEach((arch) => {
			// travel 
			// console.log(arch); 
			archName.push(arch.name); 
			arch.list.forEach((file)=>{
				// console.log(arch.path+'/'+file); 
				// console.log("!!");
				// console.log(arch); 
				// console.log(arch.path+'/'+file); 
				// console.log(arch); 
				vally.generate(arch.path+'/'+file.name, function(data){ // Sync
					// console.log(data); 
					var tmp = path.parse(file.name); 

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
		// console.log(archives[0].list[0].stat); 
		// console.log(archives); 
		template.config('base', __dirname);
		template.config('escape', false);
		template.config('encoding', 'utf-8'); 
		template.config('cache', false); 
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
				// console.log("!@!@".warn); 
				// console.log(arch)
				var defaultData = {
					arch: arch,
					archName: archName
				}

				// fs.readFile(config.path.template+"/entry/default.html", function (err, data) {
				// 	console.log(data.toString()); 
				// });
				
				var html = template(config.path.template+"/entry/default", defaultData);

				// console.log(html); 

				fs.writeFile(config.path.dist + '/index.html', html, {
					flags: 'w+'
				}, function(err) {
					if (err){
						console.log(err); 
					}

					// cb(); 
				}); 

				// console.log(arch); 

			}
		});

		// console.log(archives);
		// console.log(html); 
	}); 


}

server.start(); 


var chokidar = require('chokidar'); 

var watcher = chokidar.watch('./work/template', {
	ignored: /[\/\\]\./,
	persistent: true
	// awaitWriteFinish: true
});

watcher.on('change', (event, path) => {
	startVally(); 
	// console.log(connect.reload.toString()); 
});


// function tttt(){
// 	startVally(); 
// }
// setInterval(startVally, 2000)
// setInterval(function(){
// 	console.log('sv');
// }, 2000)
startVally(function(){

}); 
// module.exports = startVally; 
