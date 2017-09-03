// copy.js
const nativeGlob = require('glob')
	, path = require('path')
	, _ = require('ramda')
	, config = require('../config')
	, mkdir = require('./mkdir')
	, fs = require('then-fs')
	, VIEW_BASE = config.path.view
	, BLOG_DIST = config.path.dist

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

// String[] exts -> Promise glob 
var findFileByExt = _.map(describe => {
	let { ext, dist } = describe; 
	
	let pattern = path.join(VIEW_BASE, `**/*.${ext}`)
	  , distFolder = path.join(BLOG_DIST, dist); 

	// new a folder as destination 
	// console.log(distFolder)
	mkdir(distFolder); 

	return glob(pattern).then(list => {
		return {
			list: list, 
			ext: ext, 
			distFolder: distFolder
		}
	}); 
}); 

var readFile = _.map(file => {
	let temp = path.parse(file)
	  , name = temp.base
	  , ext = temp.ext; 

	return fs.readFile(file).then(data => {
		return {
			data: data, 
			name: name
		}
	}); 
}); 

var writeFile = distFolder => _.map(file => {
	let { data, name } = file
	  , dist = path.join(distFolder, name); 

	return fs.writeFile(dist, data); 
}); 

function copy(exts){
	return Promise.all(
		findFileByExt(exts)
	).then(ext_lists => {
		return ext_lists.map(ext_list => {
			let { ext, list, distFolder } = ext_list; 

			var writeToDist = writeFile(distFolder); 

			// console.log(list)

			return Promise.all(
				readFile(list)
			).then(allFiles => {
				return Promise.all(
					writeToDist(allFiles)
				) 
			})
		})
	}).then(all => {
		return Promise.all(all); 
	})
}

module.exports = copy; 
