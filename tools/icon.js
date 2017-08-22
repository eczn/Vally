// icon.js
const config = require('../config')
	, path = require('path')
	, VIEW_BASE = config.path.view 
	, ICON_BASE = path.join(VIEW_BASE, 'icon')
	, fs = require('then-fs')


module.exports = function(){
	return fs.readdirSync(ICON_BASE).map(e => {
		let iconWhere = path.join(ICON_BASE, e);
		let iconName = path.parse(iconWhere).name; 

		return {
			iconName: iconName, 
			content: fs.readFileSync(iconWhere).toString()
		}
	}).reduce((icon, cur) => {
		icon['icon_' + cur.iconName] = cur.content; 
		return icon; 
	}, {}); 
}
