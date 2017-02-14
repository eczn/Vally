var template = require('art-template');
var fs = require('fs'); 
var path = require('path')
var hljs = require('highlight.js'); // https://highlightjs.org/
var md5 = require('md5'); 
var config = require('./config'); 
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
	xhtmlOut: true,
	breaks: true,
	linkify: true,
	typographer: true
}).use(require('markdown-it-toc-and-anchor').default, {
	
});

function log(name, disArr, color){
	if (!color){
		color = 'verbose'; 
	}
	console.log(new Date().parse()+' '+name[color]); 
	disArr.forEach(function(elem){
		console.log(elem); 
	}); 
	// console.log((name+"End")[color]); 
}
// var md = require('markdown-it')({
// 	html: true,
// 	linkify: true,
// 	typographer: true
// });

function yearMonthDay(date){
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
	let time = yearMonthDay(date.mtime); 
	if (time.month < 10) {
		time.month = '0' + time.month.toString();
	}
	if (time.day < 10) {
		time.day = '0' + time.day.toString(); 
	}

	let str = '' + time.year + '-' + time.month + '-' + time.day; 
	return str;
});

template.helper('path', path); 

template.helper('md5', md5); 
function toQiniu(name){
	// config 
	return path.join(config.qiniu.url, name); 
}; 

template.helper('dateNormalize', function (date, format) {
	let time = yearMonthDay(date); 
	if (time.month < 10) {
		time.month = '0' + time.month.toString();
	}
	if (time.day < 10) {
		time.day = '0' + time.day.toString(); 
	}

	let str = '' + time.year + '-' + time.month + '-' + time.day; 
	return str;
});


var preInit = function(blogList, categoryNames, cb){
	var dist = path.join(config.path.dist, 'blog');
	var pageDir = path.join(config.path.dist, 'page');
	// var noname = path.join(config.path.dist, 'blog', 'noname');
	try { fs.mkdirSync(dist) } catch (e){}
	try { fs.mkdirSync(pageDir) } catch (e){}
	// try { fs.mkdirSync(noname) } catch (e){}

	log('To create category directory', [`>> Create at ${dist}`.verbose], 'info');

	categoryNames.forEach((elem, idx, its)=>{
		try {
			fs.mkdirSync(path.join(dist, elem))
			log(`Create ${elem} succeed`, [], 'verbose'); 
		} catch (e){
			let temp = [
				`>> Faild to create category directory ${elem}.`.warn, 
				'   May the directory already exists'.warn
			];
			log('WARNING', temp, 'warn'); 
		}
	});

	var static = path.resolve(config.path.static);
	try {fs.mkdirSync(path.join(config.path.dist, 'images'));} catch (e){}
	log(`To copy static files`, [], 'info'); 

	setTimeout(function(){
		try {fs.mkdirSync(path.join(config.path.dist, 'css'));} catch (e){}
		var cssList = fs.readdirSync(path.join(static, 'css'));
		cssList.forEach((elem) => {
			fs.readFile(path.join(static, 'css', elem), (err, data) => {
				// data is binary data 
				fs.writeFile(path.join(config.path.dist, 'css', elem), data, (err) => {
					if (err){
						log(`COPY ERR`, [err], 'error');
					} else {
						log(`COPY`, [`>> √  ${elem}`.info], 'verbose');
					}
				});
			}); 
		});
	}, 0);

	setTimeout(function(){
		try {fs.mkdirSync(path.join(config.path.dist, 'js')); } catch (e){}
		var jsList = fs.readdirSync(path.join(static, 'js'));
		jsList.forEach((elem) => {
			fs.readFile(path.join(static, 'js', elem), (err, data) => {
				// data is binary data 
				fs.writeFile(path.join(config.path.dist, 'js', elem), data, (err) => {
					if (err){
						log(`COPY ERR`, [err], 'error');
					} else {
						log(`COPY`, [`>> √  ${elem}`.info], 'verbose');
					}
				}); 
			})
		}); 
	}, 0); 

	cb(); 
}

const cheerio = require('cheerio'); 
const url =require('url'); 
var imgList = []; 
function imgCatcher(html){
	let $ = cheerio.load(html); 
	$('img').each(function(idx, elem){
		var newSrc = $(this).attr('src'); 
		// newSrc 不能是 undefined 
		// 原列表不包含 newSrc 
		// newSrc 不包含 http:// https:// 等外链图 
		if (newSrc && !imgList.includes(newSrc) && newSrc.slice(0, 4) !== 'http'){
			imgList.push(newSrc);

			let path_newSrc = path.parse(newSrc); 
			let qiniuSrc = path.join(config.qiniu.url, path_newSrc.base); 

			qiniuSrc = 'http://' + qiniuSrc; 

			qiniuSrc = url.format(url.parse(path.format(path.parse(qiniuSrc)))); 

			$(this).attr('src', qiniuSrc); 

			log('INFO', [('>> ADD: ' + newSrc).info], 'info'); 
		}
	});

	return $.html(); 
}


// var upload = require('./upload');

module.exports = {
	preInit: preInit, 
	imgList: imgList, 
	finish: function(){
		var str = imgList.join('\n'); 

		fs.writeFileSync(path.join('temp', 'list.dat'), str, {
			flag: 'w+'
		}); 

		// fs.writeFile(path.join('temp', 'list.dat'), str, {
		// 	flags: 'w+'
		// }, function(err) { // !@#$ 
		// 	if (err) {
		// 		console.log(err); 
		// 	} else {
		// 		// true 
		// 	}
		// }); 
	}, 
	mdRender: (blog, cate, QINIU_FLAG) => {
		// cate.position, cate.list
		var mdContent = md.render(blog.content);
		blog.md = mdContent; 

		// birthtime spec 
		if (blog.info.date) {
			var specTime  = new Date(blog.info.date); 
			blog.stat.birthtime = specTime; 
		}

		// console.log(blog)
		blog.id = md5(blog.fileName); // 唯一标识符 

		var data = {
			msg: 'blogs',
			cate: cate,
			// md: mdContent,
			blog: blog // info
		}
		template.config('base', __dirname);
		template.config('escape', false);
		template.config('encoding', 'utf-8'); 
		template.config('cache', false); 
		// template.config('compress', false); 
		var html = template(config.path.template+"/blog/blog", data);

		var qiniuSrcHtml = imgCatcher(html);

		if (QINIU_FLAG){
			return qiniuSrcHtml; 
		} else {
			return html; 
		}
	},
	render: (data, templatePath) => {
		template.config('base', __dirname);
		template.config('escape', false);
		template.config('encoding', 'utf-8'); 
		template.config('cache', false); 
		// template.config('compress', false); 

		var html = template(templatePath, data);
		return html; 
	}
}

