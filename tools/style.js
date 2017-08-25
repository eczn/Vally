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
		'home.css', 
		'btn.css'
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
	'__________.css', 
	'nav.css'
].map(file2tag).join(''); 

function addRequireJS(name){
	return `
		<script src="/js/require.min.js" async="true"></script>
		<script async="true" data-main="/js/${name}"></script>
	`; 
}

module.exports = function(name){
	let fileArr = styleTable[name]; 



	return addRequireJS(name) + publicFiles + fileArr.map(file2tag).join(''); 
}
