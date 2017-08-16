// logger.js
var colors = require('colors');
var clear = require('clear'); 

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

// Gray 
Date.prototype.parse = function(){
	var h, m, s; 
	h = this.getHours(); 
	m = this.getMinutes(); 
	s = this.getSeconds(); 

	h >= 10 ? ('' + h) : (h = '0' + h); 
	m >= 10 ? ('' + m) : (m = '0' + m); 
	s >= 10 ? ('' + s) : (s = '0' + s); 

	return ('['+h+':'+m+':'+s+']').grey; 
};

let logger = function(){
	var arr = Array.prototype.slice.call(arguments); 

	console.log.apply(console, arr); 
}

logger.bucket = function(){
	var arr = Array.prototype.slice.call(arguments);
	arr[0] = '[ '.grey + arr[0] + ' ]'.grey;

	arr.unshift(console); // as this 

	return (logger.bind).apply(logger, arr)
}

logger.time = function(){
	var arr = Array.prototype.slice.call(arguments); 	
	arr.unshift(new Date().parse()); 

	console.log.apply(console, arr); 
}

logger.list = function(){
	var arr = Array.prototype.slice.call(arguments);
	
	return function(items, end){
		logger.time(arr[0])

		items.forEach(item => {
			console.log('  --->'.grey, item); 
		})

		end && console.log(end); 
	} 
}

logger.clear = clear; 

module.exports = logger; 
