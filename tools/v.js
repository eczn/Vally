// vblog.js
const md = require('./md')
    , _ = require('ramda')
    , md5 = require('md5')

var informator = jsonStr => {
	let info = JSON.parse(jsonStr); 

	// Date 
	info.date = new Date(info.date); 
	
	// timeStamp Hex 
	info.ts = (+info.date).toString(16); 

	// id 
	info.id = md5(info.title); 

	return info; 
}

var v = blog => {
	// 分隔 
	var temp = blog.split('------'); 

	// vblog info 
	var vblog = informator(temp[0]); 
	// markdown 渲染  
	vblog.content = md.render(temp[1]); 


	return vblog; 
}

module.exports = v; 

