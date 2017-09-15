// replacer.js
const glob = require('./glob-promise')
    , config = require('../config')
    , path = require('path')
    , BLOG_BASE = path.join(config.path.dist, 'blogs')
    , fs = require('then-fs')
    , cheerio = require('cheerio')
    , url = require('url')
    , pusher = require('./pusher')
    , mkdir = require('./mkdir')

function getInfoHtml(){
	return glob(path.join(BLOG_BASE, '**/*.html')).then(htmlPaths => {
		return htmlPaths.map(htmlPath => {
			return Promise.all([
				fs.readFile(htmlPath), 
				fs.readFile(htmlPath.replace(/\.html$/, '.json'))
			]).then(datas => {
				let [html, info] = datas; 
				html = html.toString(); 
				info = info.toString(); 

				return {
					$: cheerio.load(html),
					html: html, 
					info: JSON.parse(info),
					htmlPath: htmlPath,
				}
			})
		})
	})
}

module.exports = function(){
	let haveUploaded = []; 
	let haveUploadedPath = path.join(__dirname, '../temp/imgList.dat'); 

	// mkdir 
	mkdir(path.join(__dirname, '../temp')); 

	try {
		haveUploaded = JSON.parse(
			fs.readFileSync(haveUploadedPath)
		); 
		// console.log('Cache File Items:', haveUploaded.length); 
	} catch (e) {
		// console.log('Cache File Created'); 
	}

	console.log('\n\n    Start To Generate Blog'.warn); 


	return getInfoHtml().then(
		allFiles => Promise.all(allFiles).then(datas => {
			console.log(
				'[?]'.info, 
				'Task Count:'.grey, 
				datas.length.toString().debug
			); 

			console.log(
				'   ', 
				'Task Size:'.grey, 
				`${JSON.stringify(datas).length} Bytes`.debug,
				'\n\n'
			); 

			let imgLists = datas.map(data => {
				let { $, html, htmlPath, info } = data; 
				let imgList = []; 

				$('img').each(function(idx, elem){
					var newSrc = $(this).attr('src'); 

					// console.log(newSrc)

					if (newSrc && !imgList.includes(newSrc) && !newSrc.startsWith('http') && newSrc.startsWith('/images')){
						imgList.push(newSrc); 

						let domain = url.parse(config.qiniu.url);
						domain.protocol = 'http:'; 
						domain.slashes = true; 
						domain.auth = null; 
						domain.hash = null; 
						domain.hostname = config.qiniu.url; 
						domain.search = null; 
						domain.query = null; 
						domain.pathname = domain.path = '/vally' + newSrc; 

						var theQiniuImg = url.format(domain); 

						$(this).attr('src', theQiniuImg); 
					}
				}); 

				fs.writeFileSync(htmlPath, $.html());
				// console.log(`${htmlPath} Generate Success`); 

				return {
					info: info,
					imgList: imgList
				}; 
			}).filter(html => {
				return html.imgList.length !== 0; 
			})

			return uploadByHtml(imgLists); 
		})
	)

	function uploadByHtml(htmls){
		if (htmls.length === 0){
			console.log(
				'[#]'.info, 
				'All Done. And Then You Can Run'.blue, 
				"`vally deploy`".warn,
				'To Deploy Your Blog.'.blue
			); 

			fs.writeFileSync(haveUploadedPath, JSON.stringify(haveUploaded)); 

			return ;
		} else {
			let now = htmls[0]; 
			let { info, imgList } = now; 
			let fromCache = [];

			console.log(`    Generating ... ${info.title}`.warn); 

			Promise.all(
				imgList.map(img => {
					let absImg = path.join(config.path.dist, img); 
					if (haveUploaded.includes(img)){
						fromCache.push(img); 
						return true; 
					} else {
						return pusher.uploadFile(absImg, 'vally' + img).then(ret => {
							let name = path.parse(img).base; 
							console.log(`[✔]`.info, 'Upload Success,'.grey, name.debug); 
							console.log('    File Hash:'.grey, ret.hash.debug); 

							haveUploaded.push(img); 
						})
					}
				})
			).then(imgUploaded => {
				console.log('[o]'.info,
					'Generate Success,'.grey,
					'Uploaded Count:'.debug,
					imgList.length.toString().debug
				); 
				console.log(
					'    From Cache:'.grey,
					fromCache.length.toString().debug, 
					'\n\n'
				);
				uploadByHtml(htmls.slice(1)); 
			})
		}
	}
}
