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
console.log(config); 

fs.readdir(config.path.blog, function(err, list){
	if (err){
		log("BUG", [], 'debug'); 
		console.log(err); 
		return; 
	}
	log('forEach List', []); 

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
		} else { // true file  to load it 
			console.log(idx.toString().info); 
			console.log(blogPath.verbose); 

			blog.isDirectory = false; 
			var blogData = fs.readFileSync(blogPath); 
			var blogText = blogData.toString(); 
			var temp = blogText.split('------'); 
			var blogInfo;
			var blogContent; 

			if (temp.length <= 1){ // blog with no info
				blogInfo = {}; 
				blogContent = temp[0]; 
				blog.category = ['all', 'noname'];  
				console.log('blog with no info'.info);
			} else {
				blogInfo = JSON.parse(temp[0]); 
				blogContent = temp[1]; 
				if (blogInfo.category){
					blog.category = blogInfo.category.toTags(); 
					// blog.category.unshift['noname']; 
					blog.category.unshift('all'); 

					
					blog.category.forEach((elem, idx, its) => {
						console.log(categoryNames); 
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
	});; 

	// blogList 
	setTimeout(preInit, 0, blogList, categoryNames, function(){
		blogList.forEach((elem, idx, its)=>{
			if (!elem.isDirectory){
				log('PARSE', [('>> √  ' + elem.fileName + ' ==> ' + path.parse(elem.fileName).name + '.html').info], 'verbose'); 
				let html = vally.mdRender(elem);

				elem.category.forEach((categoryName, idx, its)=>{
					let categoryDirectory = path.join(config.path.dist, 'blog', categoryName); 
					let filePath = path.parse(elem.fileName); 
					let dist = path.join(categoryDirectory, filePath.name+'.html'); 

					fs.writeFile(dist, html, {
						flags: 'w+'
					}, function(err) {
						if (err){
							console.log(err); 
						}
					}); 
				}); 
			}
		});

		// config.blog.countPerPage
		var pureBlog = blogList.filter(function(elem, idx, its){
			if (elem.isDirectory){ // dir 
				return false; 
			} else { // pureblog  
				return true; 
			}
		}); 
		// log('DEBUG', blogList, 'debug'); 

		// 分页
		for (let i=0;i*config.blog.countPerPage < pureBlog.length;i++){
			let page = pureBlog.slice(i*config.blog.countPerPage, (i+1)*config.blog.countPerPage); 
			let html = vally.render({
				blogs: page,
				total: new Array(parseInt((pureBlog.length) / config.blog.countPerPage)),
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
		
		categoryList.push(categoryList.shift()); 
		categoryList.forEach((elem, idx, its)=>{ // no all 
			let tempArr = []; 
			tempArr.push(elem); 

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
		}); 
	

		// log('DEBUG: categoryList', [], 'debug'); 
		// console.log(categoryList); 
	}); 
}); 

function preInit(blogList, categoryNames, cb){
	// console.log(blogList); 
	// console.log(categoryNames);

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

server.start(); 
