var fs = require('fs'); 
// var path = require('path');

function loadFile(path, cb){
	var archive = [];
	// archive[0].list = 
	// archive[0].name = "no-name"; 
	// archive[0].path = __dirname; // !!
	// archive.count = 1;  

	archive.push({
		list: [], 
		name: 'noname', 
		path: './blogs'
	}); 
	archive.count = 1; 

	fs.readdir(path, (err, files) => {
		// console.log(files); 
		
		files.forEach((elem) => {
			var i = 0;
			var stat = fs.statSync(path+'/'+elem); 

			if (stat.isDirectory()){
				
				archive.push({
					list: fs.readdirSync(path+'/'+elem), 
					name: elem,
					// htmlName: 
					path: path+'/'+elem
				});

			} else { // no name 
				archive[0].list.push(elem);
			}

			
		});
		
		cb(archive); 
	});

}


module.exports = loadFile; 

// loadFile('./blogs', function(arch){
// 	console.log(arch);
// });
