// glob-promise.js	
const nativeGlob = require('glob');

// Promise glob 
function glob(pattern){
	return new Promise((res, rej) => {
		nativeGlob(pattern, (err, list) => {
			if (err) {
				rej(err);
			} else {
				res(list);
			}
		}); 
	})
}

module.exports = glob; 
