var template = require('art-template');
var fs = require('fs'); 
var path = require('path')
var hljs = require('highlight.js'); // https://highlightjs.org/

// Actual default values
var md = require('markdown-it')({
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return '<pre class="hljs"><code>' +
					hljs.highlight(lang, str, true).value +
					'</code></pre>';
			} catch (__) {}
		}

		return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
	},
	html: true,
	linkify: true,
	typographer: true
});

// var md = require('markdown-it')({
// 	html: true,
// 	linkify: true,
// 	typographer: true
// });

// var config = require('./config'); 
var config = require('./config'); 

module.exports = {
	// generate a file 
	entry: (toWhere, archives) => {

	}, 
	preDirInit: (cb) => { // Sync mkdir 
		var dist = path.resolve(config.path.dist); 
		dist = path.join(dist, 'blog'); 
		var blogFrom = path.resolve(config.path.blog); 
		
		try {
			fs.mkdirSync(dist); 	
		} catch (e){

		}
		try {
			fs.mkdirSync(path.join(dist, 'noname')); 
		} catch (e){

		}
		try {
			fs.mkdirSync(path.join(dist, 'all')); 
		} catch (e){

		}
		
		try {
			fs.mkdirSync(dist); 
		} catch (e) {

		}

		var fileList = fs.readdirSync(blogFrom); 
		fileList.forEach((elem) => {
			var targetDir = path.join(blogFrom, elem); 
			console.log(targetDir); 
			var targetDirStat = fs.statSync(targetDir); 
			if (targetDirStat.isDirectory()){
				try {
					fs.mkdirSync(path.join(dist, elem))
				} catch (e){}
			}
			// console.log(target); 
		}); 

		// fs.mkdir(dist, (err) => {
		// 	// if err or not that is no problem 
		// 	fs.readdir(blogFrom, (err, fileList) => {
		// 		if (err){
		// 			console.log('init bug'); 
		// 		} else {
		// 			fileList.forEach((elem) => {
		// 				var targetDir = path.join(blogFrom, elem); 
		// 				console.log(targetDir); 
		// 				var targetDirStat = fs.statSync(targetDir); 
		// 				if (targetDirStat.isDirectory()){
		// 					fs.mkdir(path.join(dist, elem), (err) => {
		// 						if (err){
		// 							console.log(err); 
		// 						}
		// 					}); 
		// 				} else {			
		// 				}
		// 				// console.log(target); 
		// 			}); 
		// 		}
		// 	});
		// });

	}, 
	generate: (filePath, cb) => {
		fs.readFile(filePath, (err, mdFileData) => {
			if (err){
				console.log(err); 
			}
			// console.log(mdFileData.toString()); 
			// var parseRes = md.toHTML(mdFileData.toString());
			mdFileText = mdFileData.toString(); 
			mdArr = mdFileText.split('------'); 
			var blog; 
			var parseRes;

			if (mdArr[0] == mdFileText){
				// no config
				blog = {}; 
				parseRes = md.render( mdFileText ); 
			} else {
				blog = JSON.parse(mdArr[0]); 
				// console.log(blog.title); 
				// console.log(blog); 
				parseRes = md.render( mdArr[1] ); 
			}
			
			
			var stat = fs.statSync(filePath); 
			// console.log(stat); 
			// console.log(parseRes); 
			var data = {
				msg: 'blogs',
				md: parseRes,
				blog: blog,
				stat: stat
			}

			// parseRes = template(parseRes, {
			// 	blog: blog
			// });
			// console.log(parseRes);

			template.config('base', __dirname);
			template.config('escape', false);
			template.config('encoding', 'utf-8'); 

			var html = template(config.path.template+"/blog/blog", data);

			// console.log(html); 
			// fs.writeFile(config.dist+'/'+(fileName.split('.'))[0]+'.html', html,  function(err) {
			// 	if (err) {
			// 		return console.error(err);
			// 	}
			// });
			
			cb(html); 
		});
	}
}

