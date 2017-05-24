// alias.js
var o = {
	js: 'JavaScript',
	JavaScript: 'JavaScript',
	javascript: 'JavaScript',
	css: 'CSS',
	html: 'HTML'
}

module.exports = key => o[key] || key 
