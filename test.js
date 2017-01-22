// test.js
var md5 = require('md5'); 

for (let i=0;i<10;i++){
	let ofTheMd5 = md5(i); 
	console.log(ofTheMd5); 
}
