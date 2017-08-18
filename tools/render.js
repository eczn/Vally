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
	config: config,
	style: name => {
		console.log(name); 

		return name; 
	}
}); 


var blogRender = tpl.fromFile(
	path.join(__dirname, '../view/blog.html'), 
	{
		compress: true,
		name: 'blog'
	}
)

var homeRender = tpl.fromFile(
	path.join(__dirname, '../view/home.html'), 
	{
		compress: true,
		name: 'home'
	}
)

var cateRender = tpl.fromFile(
	path.join(__dirname, '../view/cate.html'), 
	{
		compress: true, 
		name: 'cate'
	}
)

var catesRender = tpl.fromFile(
	path.join(__dirname, '../view/cates.html'), 
	{
		compress: true, 
		name: 'cates'
	}
)


let render = {
	blog: blogRender, 
	home: homeRender, 
	cate: cateRender, 
	cates: catesRender, 
	reload: reload
}

function reload(p){
	// let { name, tpl } = p; 

	if (this[p.name]){
		// 如果存在则reload 
		this[p.name] = tpl.fromFile(p.tpl, {
			comress: true, 
			name: p.name
		}); 
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
