// vblog.js
const md = require('./md')
    , _ = require('ramda')
    , md5 = require('md5')

function introGetter(content){
	return content.slice(0, 300); 
}

var informator = (jsonStr, content) => {
	let info = JSON.parse(jsonStr); 

	// Date 
	info.date = new Date(info.date); 
	
	// timeStamp Hex 
	info.ts = (+info.date).toString(16); 

	// id 
	info.id = md5(info.title); 

	// tags 
	if (!info.tags){
		// 不存在 tags 
		info.tags = []; 
	} else if (typeof info.tags === 'string'){
		// 或者 
		info.tags = info.tags.split(',').map(e => e.trim()); 
	} else {
		info.tags = '[[ 非法标签写法 ]]'; 
	}

	info.intro = introGetter(content);

	return info; 
}

var v = blog => {
	// 分隔 
	var temp = blog.split('------'); 

	// vblog info 
	var vblog = informator(temp[0], temp[1]); 
	// markdown 渲染  
	vblog.content = md.render(temp[1]); 


	return vblog; 
}

module.exports = v; 

