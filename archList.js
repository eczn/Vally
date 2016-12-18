var fs = require('fs'); 
// var path = require('path');
var np = require('path'); 
var config = require('./config'); 

function loadFile(path, cb){
	var archive = [];
	// archive[0].list = 
	// archive[0].name = "no-name"; 
	// archive[0].path = __dirname; // !!
	// archive.count = 1;  

	archive.push({
		list: [], 
		name: 'noname', 
		// path: './blogs'
		path: path
	}); 

	archive.count = 1; 

	fs.readdir(path, (err, files) => {
		// console.log("!!!"); 
		// console.log(__dirname); 
		// console.log(path); 
		// console.log(files); 
		files.forEach((elem) => {
			var i = 0;
			var stat = fs.statSync(path+'/'+elem); 
			if (stat.isDirectory()){
				// console.log(fs.readdirSync(path+'/'+elem))
				archive.push({
					list: fs.readdirSync(path+'/'+elem), 
					name: elem,
					// htmlName: 
					path: path+'/'+elem,
				});
			} else { // no name 
			
				archive[0].list.push(elem);
			}

			
		});

		// console.log(archive);
		
		for (let i=0;i<archive.length;i++){
			// console.log(archive[i]); 
			// console.log(archive[i].list); 

			for (let j=0; j<archive[i].list.length; j++){
				var temp = np.join(archive[i].path, archive[i].list[j]);
				// console.log(temp); 
				var stat = fs.statSync(temp); 
				var str = archive[i].list[j]; 

				archive[i].list[j] = {
					name: str, 
					stat: {
						update: date2str(stat.mtime),
						birth: date2str(stat.birthtime),
					}
				}; 
			}

		}

		cb(archive); 
	});

}

function date2str(date){
	var year = date.getFullYear(); 
	var month = date.getMonth() + 1; 
	var day = date.getDate(); 

	return {
		year: year,
		month: month,
		day: day
	}
}

module.exports = loadFile; 

// loadFile('./blogs', function(arch){
// 	console.log(arch);
// });
