// new-blog.js
const tpl = require('tplser')
    , path = require('path')
    , config = require('../config')
    , fs = require('then-fs')

let newBlogNewer = tpl.fromFile(path.join(__dirname, '../static/New.md')); 

module.exports = function(fileName){
	var res = newBlogNewer({
		blog_title: fileName, 
		date: new Date()
	});

	return fs.writeFile(path.join(config.path.blog, `${fileName}.md`), res)
}
