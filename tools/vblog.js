// vblog.js
var path = require('path')
  , fs = require('then-fs')
  , md5 = require('md5')
  , template = require('art-template')
  , _ = require('ramda')
  , hljs = require('highlight.js')
  , alias = require('./alias')
  , config = require('../config')

hljs.configure({
	useBR: true
});

var md = require('markdown-it')({
	highlight: function (str, lang) {
		lang = alias(lang); 

		let line = str.split('\n').length - 2; 
		let lefts = ['3em', '3.6em'];

		var lineCount = new Array(line + 1).fill(0).reduce((acc, cur, idx) => {
			idx = idx < 100 ? ('00' + idx.toString()).slice(-2) : idx; 

			return acc + `<li>${idx}</li>`; 
		}, '<div class="lines">') + '</div>'; 

		var left = lefts[Math.floor((line + 1) / 100)] || lefts[1]; 

		if (lang && hljs.getLanguage(lang)) {
			try {
				return `<pre style="padding-left: ${left}" class="hljs ${lang}">${lineCount}<code class="lang-name">${lang}</code><code>` +
							hljs.highlight(lang, str, true).value +
						`</code></pre>`;
			} catch (__) { throw __; }
		}
		return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
	},
	html: true,
	xhtmlOut: true,
	breaks: true,
	linkify: true,
	typographer: true
}).use(require('markdown-it-toc-and-anchor').default, {
	// markdown-it-toc-and-anchor 
});



var vParse = function(blogPath){
	let text = fs.readFileSync(blogPath).toString()
	  , temp = text.split('------')
	  , vblog = {}; 

	if (temp.length <= 1) throw new Error(`${blogPath} Has NOT The Vally's Blog Format !!! `); 

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
