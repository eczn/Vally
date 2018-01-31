// style.js 
const path = require('path'); 

var file2tag = item => {
	let o = path.parse(item); 
	let ext = o.ext

	if (item.startsWith('//')){
		let temp = {
			'.js': `<script src="${item}"></script>`, 
			'.css': `<link rel="stylesheet" href="${item}">`
		}

		return temp[ext]; 
	} else {
		if (ext === '.js'){
			return `<script src="/js/${item}"></script>`; 
		} else {
			return `<link rel="stylesheet" href="/css/${item}">`
		}
	}
}

let styleTable = {
	home: {
		js: 'home', 
		static: [
			'home.css', 
			'btn.css'
		]
	}, 
	cate: {
		js: 'cate', 
		static: [
			'cate.css'
		]
	}, 
	cates: {
		js: 'cates', 
		static: [
			'cates.css'
		]
	}, 
	blog: {
		js: 'blog', 
		static: [
			'home.css', 
			'btn.css', 
			'mark-vally.css',
			'blog.css'
		]
	},
	index: {
		js: 'index', 
		static: [
			'index.css'
		]
	}
}

let publicFiles = [
	'flexible.min.js', 
	'__________.css', 
	'nav.css',
	'//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js'
].map(file2tag).join(''); 

function addRequireJS(name){
	return `
		<script src="/js/require.min.js" async="true"></script>
		<script async="true" data-main="/js/${name}"></script>
	`; 
}

module.exports = function(name){
	let page = styleTable[name]; 
	let fileArr = page.static; 
	let jsEntry = page.js; 

	return addRequireJS(jsEntry) + publicFiles + fileArr.map(file2tag).join(''); 
}
