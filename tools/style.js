// style.js 
const path = require('path'); 

function Style(file){
	this.file = file; 
}

Style.create = function(file){
	return new Style(file); 
}

Style.prototype.toTag = function(){
	let ext = path.parse(this.file);

	if (ext === '.js'){
		return this.toJSTag(); 
	} else {
		return this.toLinkTag(); 
	}
}

Style.prototype.toLinkTag = function(){
	return `<link rel="stylesheet" href="/css/${this.file}">`
}

Style.prototype.toJSTag = function(){
	return `<script src="${this.file}"></script>`; 
}

var item2tag = item => Style.create(item).toTag();

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

].map(item2tag)

module.exports = function(name){
	let fileArr = styleTable[name]; 

	return fileArr.map(item2tag).join('') + publicFiles.join(''); 
}
