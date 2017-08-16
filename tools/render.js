// render.js
const tpl = require('tplser')
	, path = require('path')
    , config = require('../config')
    , tplConfig = {
    	compress: true
    }
    , createRender = tplPath => tpl.fromFile(tplPath, tplConfig)
    
// Global 
tpl.push({
	config: config
}); 


var blogRender = createRender(
	path.join(__dirname, '../view/blog.html')
)

var homeRender = createRender(
	path.join(__dirname, '../view/home.html')
)

var cateRender = createRender(
	path.join(__dirname, '../view/cate.html')
)

var catesRender = createRender(
	path.join(__dirname, '../view/cates.html')
)


let render = {
	blog: blogRender, 
	home: homeRender, 
	cate: cateRender, 
	cates: catesRender, 
	reload: reload
}

function reload(p){
	let { name, tpl } = p; 

	if (this[name]){
		// 如果存在则reload 
		this[name] = createRender(tpl); 
	} else {
		// 否则警告 
		console.warn(`[[ WARN ]] The Template ${p.name} Not Found In Render`); 
	}

	// this.blog = createRender(
	// 	path.join(__dirname, '../view/blog.html')
	// )

	// this.home = createRender(
	// 	path.join(__dirname, '../view/home.html')
	// )

	// this.cate = createRender(
	// 	path.join(__dirname, '../view/cate.html')
	// )

	// this.cates = createRender(
	// 	path.join(__dirname, '../view/cates.html')
	// )
}

module.exports = render; 
