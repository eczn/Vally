// logger.js
var colors = require('colors');

colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'red',
	info: 'green',
	data: 'blue',
	help: 'cyan',
	warn: 'yellow',
	debug: 'magenta',
	error: 'red'
});

function DatePro(date){
	var h, m, s; 
	h = date.getHours(); 
	m = date.getMinutes(); 
	s = date.getSeconds(); 
	return 0; 
}

Date.prototype.parse = function(){
	var h, m, s; 
	h = this.getHours(); 
	m = this.getMinutes(); 
	s = this.getSeconds(); 

	h>=10?(''+h):(h='0'+h); 
	m>=10?(''+m):(m='0'+m); 
	s>=10?(''+s):(s='0'+s); 

	return ('['+h+':'+m+':'+s+']').grey; 
};

String.prototype.toTags = function(){
	return this.split(' ').map((elem, idx, its)=>{
		if (elem == ''){
			return false;
		} else {
			return elem.replace(',', ''); 
		}
	}).filter((elem)=>{
		return !!elem; 
	});
}

let logger = function(){
	var arr = Array.prototype.slice.call(arguments); 

	console.log.apply(console, arr); 
}; 

logger.create = function(){
	var arr = Array.prototype.slice.call(arguments);
	arr.unshift(console); // as this 

	return (logger.bind).apply(logger, arr); 
}

module.exports = logger; 