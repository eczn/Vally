// style.js
function toLinkTag(cssFile){
	return `<link rel="stylesheet" href="/css/${cssFile}">`
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



module.exports = function(name){
	let cssArr = styleTable[name]; 

	return cssArr.map(toLinkTag).join(''); 
}
