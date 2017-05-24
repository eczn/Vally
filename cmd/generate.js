// generate.js
var collector = require('../tools/collector')
  , cheerio = require('cheerio')
  , url = require('url')
  , path = require('path')
  , config = require('../config')
  , fs = require('then-fs')
  , _ = require('ramda')
  , pusher = require('../tools/pusher')
  , logger = require('../tools/logger')
  // Global 
  , blogLocated = path.join(config.path.dist, 'blog'); 

var isDirectory = file => fs.statSync(path.join(blogLocated, file)).isDirectory(); 

const succLog = logger.create( '√ '.info, '[UPLOAD SUCCESS]'.input)
    , hashLog = logger.create( '>>'.verbose, 'HASH:'.input)
    , infoLog = logger.create( '>>'.input, '[INFO]'.input)
    , errLog  = logger.create( 'X'.error, '[ERROR]'.error)
    , matchLog= logger.create( '√ '.info, '[MATCH]'.input); 

function getIgnore(){
	var ignoreList; 
	try {
	 	ignoreList = fs.readFileSync(path.join(
			config.path.dist, 'temp', 'list.dat'
		)).toString(); 
	} catch (e){
		return []; 
	}

	return ignoreList.split('\n').filter(e => e !== '')
}

function saveIgnores(ignores){
	var str = ignores.join('\n'); 

	return fs.writeFile(
		path.join(config.path.dist, 'temp', 'list.dat'),
		str
	).then(err => {
		if (err) {
			errLog('ERROR saveIgnores'); 
			setTimeout(_ => {
				throw err
			}); 
		}
	});
}

module.exports = function(){
	// 生成
	// collector(); 

	// 压缩

	// Qiniu 
	let ignores = getIgnore(); 
	fs.readdir(blogLocated).then(
		// 剔除 
		// lists 里可能含有文件夹 得剔除 
		lists => _.reject(isDirectory)(lists)
	).then(
		blogLists => _.map(blogName => {
			var htmlPath = path.join(config.path.dist, 'blog', blogName);
			
			var o = {
				html: fs.readFileSync(htmlPath).toString(),
				htmlPath: path.join(config.path.dist, 'blog', blogName),
				htmlName: blogName
			}

			// return fs.readFileSync(htmlPath).toString();
			return o; 
		})(blogLists)
	).then(
		htmls => _.map(o => {			
			let { html, htmlPath, htmlName } = o
			  , $ = cheerio.load(html)
			  , imgList = [];

			$('img').each(function(idx, elem){
				var newSrc = $(this).attr('src'); 
				// 排除 
				if (newSrc && !imgList.includes(newSrc) && newSrc.slice(0, 4) !== 'http'){
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

					var data = $.html(); 
					fs.writeFile(htmlPath, data).then(err => {
						if (err) errLog('HTML FILE SAVE FAILD'.error); 
						else infoLog(`IMG.SRC REPLACE SUCCESS: ${htmlName}`.input); 
					}); 
				}
			}); 

			return imgList; 
		})(htmls)
	).then(
		// 铺平 
		imgLists => _.flatten(imgLists)
	).then(
		// 过滤
		imgList => _.filter(img => {
			var temp = !ignores.includes(img); 
			if (!temp) matchLog(img); 

			return temp;
		})(imgList)
	).then(
		imgList => {

			if (imgList.length === 0) {
				logger('All Things Done. And Then You Should Run "vally deploy" To Deploy Your Blog To Git Pages'.info)
				return; 
			}
			var count = 0; 

			return _.forEach(img => {
				let imgAbsPath = path.join(config.path.dist, img); 

				let nameOnQiniu = 'vally' + img;
				pusher.uploadFile(imgAbsPath, nameOnQiniu, ret => {
					ignores.push(img); 
					count++; 

					if (count === imgList.length) {
						saveIgnores(ignores); 

						setTimeout(_ => logger(
							'All Things Done. And Then You Should Run "vally deploy" To Deploy Your Blog To Git Pages'.info
						), 2000); 
					}

					succLog(ret.key.yellow); 
					hashLog(ret.hash.data);
				}); 
			})(imgList);
		}
	).catch(err => {
		setTimeout(() => {
			throw err
		}); 
	});
}
