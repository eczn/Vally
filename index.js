// var config = require('./config');
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

String.prototype.toTags = function(){
	return this.split(' ').map((elem, idx, its)=>{
		if (elem == ''){
			return false;
		} else {
			return elem.replace(',', ''); 
		}
	}).filter((elem)=>{
		return !!elem; 
	});
}

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


var config = require('./config'); 
log('CONFIG', [config], 'info'); 

var vv = function(QINIU_FLAG){
	fs.readdir(config.path.blog, function(err, list){
		if (err){
			log("BUG", [err], 'debug'); 
			return; 
		}

		var categoryNames = ['all', 'noname']; 
		var blogList = list.map((elem, idx, its) => {
			var blogPath = path.join(config.path.blog, elem); 
			blogPath = path.resolve(blogPath); 

			var blogPathStat = fs.statSync(blogPath); 
			var blog = new Object(); 

			blog.locatedAt = blogPath; 
			blog.stat = blogPathStat;
			blog.fileName = elem; 

			if (blogPathStat.isDirectory()){
				blog.isDirectory = true; 
				return blog; 
			} else { // true file to load it 
				log('COLLECT', [('>> '+blogPath).info], 'verbose');

				blog.isDirectory = false; 
				var blogData = fs.readFileSync(blogPath); 
				var blogText = blogData.toString(); 
				// temp: blogInfo + blogContent or just blogContent 
				var temp = blogText.split('------'); 
				var blogInfo;
				var blogContent; 

				if (temp.length <= 1){ // blog with no info, just blogContent 
					blogInfo = {}; 
					blogContent = temp[0]; 
					blog.category = ['all', 'noname'];
					log('INFO', ['Blog With No Info'], 'info'); 
				} else {
					blogInfo = JSON.parse(temp[0]); 
					blogContent = temp[1]; 
					if (blogInfo.category){
						blog.category = blogInfo.category.toTags(); 
						blog.category.unshift('all'); 

						blog.category.forEach((elem, idx, its) => {
							if (!categoryNames.includes(elem)){
								categoryNames.push(elem); 
							}
						});
					} else {
						blog.category = ['all', 'noname'];
					}
					
					if (blogInfo.tags){
						blog.tags = blogInfo.tags.toTags(); 
					}
				}

				blog.info = blogInfo; 
				blog.content = blogContent; 
				return blog; 
			}
		}).sort(function(a, b){ // 排序
			if (a.stat.birthtime < b.stat.birthtime) {
				return 1; 
			} else if (a.stat.birthtime > b.stat.birthtime) {
				return -1; 
			} else {
				return 0; 
			}
		});

		// blogList 
		setTimeout(vally.preInit, 0, blogList, categoryNames, function(){
			// config.blog.countPerPage
			var pureBlog = blogList.filter(function(elem, idx, its){
				if (elem.isDirectory){ // dir 
					return false; 
				} else { // pureblog  
					return true; 
				}
			}); 
			// log('DEBUG', blogList, 'debug'); 

			// 分页  0  7  14 
			for (let i=0;i*config.blog.countPerPage < pureBlog.length;i++){
				let page = pureBlog.slice(
					i*config.blog.countPerPage,
					(i+1)*config.blog.countPerPage 
				);

				log('DEBUG', [page.length], 'debug');  
				

				let html = vally.render({
					blogs: page,
					// dirty
					total: new Array(parseInt((pureBlog.length) / config.blog.countPerPage) + 1),
					now: i
				}, path.join(config.path.template, "entry", "home")); 


				let j = i; 
				var str_path = path.join(config.path.dist, 'page', `index${j}.html`); 
				if (j == 0){
					str_path = path.join(config.path.dist, `index.html`); 
				}
				fs.writeFile(str_path, html, (err)=>{}); 
				// console.log(html); 
			}

			// entry categoryNames pureBlog
			// log('DEBUG', pureBlog, 'debug'); 
			// console.log(categoryNames)
			var categoryList = categoryNames.map((elem, idx, its) => {
				let new_elem = new Object(); 
				new_elem.name = elem; 


				let list = pureBlog.filter((blog, idx, its) => {
					if (blog.category && blog.category.includes(elem)){
						return true; 
					} else {
						return false; 
					}
				});
				new_elem.list = list; 

				return new_elem;
			}); 

			// entry render 
			setTimeout(function(){ 
				let allhtml = vally.render({
					archives: categoryList.splice(1)  // no all 
				}, path.join(config.path.template, "entry", "entry"));

				let allhtmlPath = path.join(config.path.dist, 'blog', 'all', 'index.html'); 
				fs.writeFile(allhtmlPath, allhtml, {
					flags: 'w+'
				}, function(err) {
					if (err){
						log('ERROR', [err], 'error'); 
					} else {
						log('MERGE', ['>> √  all category merge in /blog/all/index.html'.info], 'verbose'); 
					}
				});
			}, 0);
			
			categoryList.forEach((cate, idx, its)=>{ // no all 
				let tempArr = []; 

				tempArr.push(cate); 

				let allhtml = vally.render({
					archives: tempArr
				}, path.join(config.path.template, "entry", "entry"));
				
				let allhtmlPath = path.join(config.path.dist, 'blog', tempArr[0].name, 'index.html'); 
				fs.writeFile(allhtmlPath, allhtml, {
					flags: 'w+'
				}, function(err) {
					if (err){
						log('ERROR', [err], 'error');  
					}
				});

				// blog rendering 
				// cate.list = cate.list.reverse(); 
				cate.list.forEach((blog, idx, its)=>{
					log('PARSE', [('>> √  ' + blog.fileName + ' ==> ' + path.parse(blog.fileName).name + '.html').info], 'verbose'); 

					// let next = (idx < its.length-1)?(its[idx+1]):(false); 
					// log('INFO', [blog.fileName, next.fileName], 'debug'); 
					
					let nextBlog = its[ (idx+1)%its.length ]; 
					let nextPath = path.parse(nextBlog.fileName); 
					let next_a = path.join('/', 'blog', cate.name, nextPath.name+'.html'); 
					
					let position = {
						next: {
							a: next_a.replace(/\\/g, '/'),
							name: nextPath.name,
							body: nextBlog
						}
					}; 


					let cateInfo = {
						position: position, 
						list: its,
						name: cate.name
					}

					let html = vally.mdRender(blog, cateInfo, QINIU_FLAG);
					let cateDir = path.join(config.path.dist, 'blog', cate.name); 
					let filePath = path.parse(blog.fileName); 
					let dist = path.join(cateDir, filePath.name+'.html'); 
					
					fs.writeFile(dist, html, {
						flags: 'w+'
					}, function(err) {
						if (err) console.log(err); 
					}); 
				}); 
			}); 
			// call back here, vally all done 
			vally.finish(); 
		}); 

	}); 
}

module.exports = vv; 
