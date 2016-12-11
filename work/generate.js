// clear
var template = require('art-template');
var fs = require("fs"); 
var md = require( "markdown" ).markdown;
var config = require('./config');

// console.log(config); 

// dist 
// var dist = './build'; 


// fs.readdir(config.blog, function(err, files){
// 	console.log(files);  // array 
// 						 // file list
// }); 

fs.readFile('./blogs/fir.md', function (err, data) {
	// console.log("异步读取文件数据: \n" + data.toString());
	console.log(err); 
	parseRes = md.toHTML( data.toString() );
	// console.log(parseRes); 

	var data = {
		msg: "hello, world",
		md: parseRes
	};

	template.config('base', __dirname);
	template.config('escape', false);
	template.config('encoding', 'utf-8'); 

	var html = template("./template/test/t", data);

	// console.log(html)

	// console.log(html); 

	fs.writeFile(config.dist+'/t.html', html,  function(err) {
		if (err) {
			return console.error(err);
		}
	});



});



