// style.js 
const path = require('path'); 

var file2tag = item => {
	let o = path.parse(item); 
	let ext = o.ext

	if (ext === '.js'){
		return `<script src="/js/${item}"></script>`; 
	} else {
		return `<link rel="stylesheet" href="/css/${item}">`
	}
}

let styleTable = {
	home: [
		'home.css'
	], 
	cate: [
		'cate.css'
	], 
	cates: [
		'cates.css'
	], 
	blog: [
		'blog.css'
	]
}

let publicFiles = [
	'flexible.min.js', 
	'__________.css'
].map(file2tag).join(''); 

module.exports = function(name){
	let fileArr = styleTable[name]; 

	return publicFiles + fileArr.map(file2tag).join(''); 
}
