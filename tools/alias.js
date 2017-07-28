// alias.js
var o = {
	js: 'JavaScript',
	JavaScript: 'JavaScript',
	javascript: 'JavaScript',
	css: 'CSS',
	html: 'HTML'
}

// 别名 
module.exports = key => o[key] || key 
