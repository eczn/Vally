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
	breaks: true,
	linkify: true,
	typographer: false
});

// var md = require('markdown-it')({
// 	html: true,
// 	linkify: true,
// 	typographer: true
// });

function date2str(date){
	var year = date.getFullYear(); 
	var month = date.getMonth() + 1; 
	var day = date.getDate(); 

	return {
		year: year,
		month: month,
		day: day
	}
}

template.helper('dateFormat', function (date, format) {
	let time = date2str(date.birthtime); 
	let str = '' + time.year + '-' + time.month + '-' + time.day; 
    return str;
});

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
		
		try {fs.mkdirSync(dist);} catch (e){}
		try {fs.mkdirSync(path.join(dist, 'noname')); } catch (e){}
		try {fs.mkdirSync(path.join(dist, 'all')); } catch (e){}
		try {fs.mkdirSync(dist); } catch (e) {}

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

		var static = path.resolve(config.path.static);
		try {fs.mkdirSync(path.join(config.path.dist, 'css'));} catch (e){}
		try {fs.mkdirSync(path.join(config.path.dist, 'js')); } catch (e){}
		
		var cssList = fs.readdirSync(path.join(static, 'css'));
		var jsList = fs.readdirSync(path.join(static, 'js'));

		console.log('cssFile'.debug); 
		console.log(cssList); 
		console.log('jsFile'.debug); 
		console.log(jsList); 

		
		cssList.forEach((elem) => {
			fs.readFile(path.join(static, 'css', elem), (err, data) => {
				// data is binary data 
				
				fs.writeFile(path.join(config.path.dist, 'css', elem), data, (err) => {
					if (err){
						console.log("error".error); 
						console.log(err); 
					} else {
						console.log('filecopy succeed'.info);
						console.log(path.join(config.path.dist, 'css', elem).info); 
					}
				}); 
			}); 
		}); 
		jsList.forEach((elem) => {
			fs.readFile(path.join(static, 'js', elem), (err, data) => {
				// data is binary data 
				fs.writeFile(path.join(config.path.dist, 'js', elem), data, (err) => {
					if (err){
						console.log("error".error); 
						console.log(err); 
					} else {
						console.log('filecopy succeed'.info);
						console.log(path.join(config.path.dist, 'js', elem).info); 
					}
				}); 
			})
		}); 

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
	},
	mdRender: (blog) => {
		var mdContent = md.render(blog.content); 
		var data = {
			msg: 'blogs',
			md: mdContent,
			blog: blog.info, // info
			stat: blog.stat
		}
		template.config('base', __dirname);
		template.config('escape', false);
		template.config('encoding', 'utf-8'); 

		var html = template(config.path.template+"/blog/blog", data);
		return html; 
	},
	render: (data, templatePath) => {
		template.config('base', __dirname);
		template.config('escape', false);
		template.config('encoding', 'utf-8'); 

		var html = template(templatePath, data);
		return html; 
	}
}

