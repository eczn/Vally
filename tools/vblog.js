// vblog.js
var path = require('path')
  , fs = require('then-fs')
  , md5 = require('md5')
  , template = require('art-template')
  , _ = require('ramda')
  , config = require('../config')


// markdown 渲染器 
var md = require('./md');


// 解析 vally 博客的文件格式 
var vParse = function(blogPath){
	let text = fs.readFileSync(blogPath).toString()
	  , temp = text.split('------')
	  , vblog = {}; 

	if (temp.length <= 1) throw new Error(`${blogPath} Is NOT The Vally's Blog Format !!! `); 

	// content Parse 
	vblog.markdown = temp[1]; 
	vblog.content = md.render(temp[1]); 

	// info Parse 
	vblog.info = JSON.parse(temp[0]); 
	vblog.info.date	= new Date(vblog.info.date); 

	// tag parse 
	// "tags": "JavaScript, FE",
	if (vblog.info.tags) vblog.info.tags = vblog.info.tags.split(',').map(str => str.trim());
	else vblog.info.tags = []; 

	// category init 
	vblog.info.category = vblog.info.category || '_'; 
	vblog.info.categoryLink = path.join('/categories', vblog.info.category + '.html'); 
	vblog.info.cateIntro = vblog.info.cateIntro || `该分类无介绍 创建于 ${+vblog.info.date} 0v0`; 

	// blog id 
	vblog.info.id = md5(vblog.info.title); 

	// blog link 
	vblog.info.link = '/blog/' + vblog.info.title + '.html'; 

	return vblog; 
}

// art.helper('md5', md5);
// art.helper('path', path); 

template.defaults.imports.yyyymmdd = function(date, sep = '-'){
	return [
		date.getFullYear(),
		date.getMonth()+1,
		date.getDate()
	].map(d => d.toString())
	.map(d => ('00' + d).slice(d.length >= 4 ? -4 : -2)).join(sep); 
};

var normalOpt = {
	root: config.path.view,
	escape: false,
	cache: false,
	bail: true
}


// 创建文件夹，如果存在则跳过 
function mkdir(dir, cb){
	try { fs.mkdirSync(dir) } catch (e){ cb && cb(e) }
}

module.exports = {
	vParse: vParse,
	render: md.render,
	homeRender: data => {
		let source = fs.readFileSync(
			path.join(config.path.view, 'html', 'entry', 'home.html')
		).toString(); 

		return template.render(source, data, normalOpt); 
	},
	blogRender: data => {
		let source = fs.readFileSync(
			path.join(config.path.view, 'html', 'blog', 'blog.html')
		).toString(); 

		return template.render(source, data, normalOpt); 
	},
	categoryRender: data => {
		let source = fs.readFileSync(
			path.join(config.path.view, 'html', 'category', 'single.html')
		).toString(); 

		return template.render(source, data, normalOpt); 
	},
	entryRender: data => {
		let source = fs.readFileSync(
			path.join(config.path.view, 'html', 'category', 'cates.html')
		).toString(); 

		return template.render(source, data, normalOpt); 
	},
	template: template,
	mkdir: mkdir
}; 
