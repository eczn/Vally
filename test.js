// test.js
// const cheerio = require('cheerio'); 
// var html = "<img src='1.jpg' /><img src='2.jpg' /><img src='3.jpg' />";
// let $ = cheerio.load(html); 
// var $img = $('img'); 
// var i = 0; 

// var imgList = []; 
// $img.each( function(idx, elem){
// 	imgList[idx] = $(this).attr('src'); 
// }); 
// // console.log(imgList); 
// $img.attr('src', '0v0'); 


// console.log($.html()); 

const qiniu = require('qiniu'); 
const up = require('./upload'); 
var config = require('./config'); 
const path = require('path'); 

// var file = path.join(config.path.dist, 'images', 'bb64.png'); 

up('images/bb64.png', function(err, ret){
	if (err){
		console.log('FAILD ', err); 
	} else {
		console.log(ret.hash, ret.key, ret.persistentId);    
	}
}); 
