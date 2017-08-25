// writer.js
const collector = require('./collector')
	, config = require('../config')
	, _ = require('ramda')
	, render = require('./render')
	, fs = require('then-fs')
	, path = require('path')
	, DIST = config.path.dist
	, logger = require('./logger')
	, infoLog = e => logger.bucket(e.cyan)
	, glob = require('glob')
	, mkdir = require('./mkdir')
	, copy = require('./copy')

var timeSort = _.sort(
	(a, b) => b.date - a.date
); 

var makePage = _.splitEvery(config.blog.countPerPage)

var cateReduce = _.reduce((acc, cur) => {
	if (acc[cur.category]){
		// Push It 
		acc[cur.category].push(cur)
	} else {
		// Create An Array 
		acc[cur.category] = [ cur ]; 
	}

	return acc; 
}, {}); 

// 没什么特别的 尽管渲染 
var blog2html = vblog => {
	let BLOG_BASE = path.join(DIST, 'blogs'); 
	mkdir(BLOG_BASE); 

	let vblog_location = path.join(BLOG_BASE, vblog.ts); 
	mkdir(vblog_location);

	let html = render.blog({
		blog: vblog
	}); 

	return fs.writeFile(path.join(vblog_location, 'index.html'), html); 
}

// 这里需要分页的 
var home2html = pages => {
	// 创建 /pages 
	let PAGES_BASE = path.join(DIST, 'pages');

	// mkdir 
	mkdir(PAGES_BASE); 

	let status = pages.map((page, pageIdx) => {
		let pageBtns = new Array(pages.length).fill(0).map((_, idx) => {
			return {
				to: idx, 
				now: pageIdx === idx
			} 
		}); 

		let html = render.home({
			blogs: page,
			pageBtns: pageBtns, 
			isActive: now => now ? 'page-active' : '', 
			makeLink: idx => `/pages/${idx}/`
		}); 


		let nowPage = path.join(PAGES_BASE, pageIdx.toString()); 

		mkdir(nowPage); 

		let saving = fs.writeFile(path.join(nowPage, 'index.html'), html); 

		return {
			saving: saving, 
			html: html	
		}
	}); 

	return Promise.all(
		// status.map(e => e.saving).concat(
		// 	fs.writeFile(
		// 		path.join(DIST, 'index.html'),
		// 		status[0].html
		// 	)
		// )
		status.map(e => e.saving)
	).then(allSuc => {
		// console.log(`[[ PAGE ]] All /pages/x/ Generated, Count: ${status.length}`);
		infoLog('PAGE')(`All /pages/x/ Generated, Count: ${status.length}`.yellow); 
	}); 
}

// 分类页面 
var cate2html = cates => {
	let cateNames = Object.keys(cates); 
	let CATE_BASE = path.join(DIST, 'cates'); 

	// 建文件夹
	mkdir(CATE_BASE); 

	let cateIndex = render.cates({
		cates: cateNames
	});

	// Promises 
	return Promise.all([
		fs.writeFile(path.join(CATE_BASE, 'index.html'), cateIndex)
	].concat(
		// All Promises 
		cateNames.map(name => {
			let location = path.join(CATE_BASE, name); 
			mkdir(location); 

			let html = render.cate({
				blogs: cates[name]
			}); 

			return fs.writeFile(path.join(location, 'index.html'), html); 
		})
	)).then(allSuc => {
		// console.log(`[[ CATE ]] Cates Generated, Count: ${cateNames.length}`); 
		infoLog('CATE')(`Cates Generated, Count: ${cateNames.length}`.yellow); 
	})
}

// 一个接一个  
var makeHome = _.pipe(
	timeSort,
	makePage, 
	home2html
); 

var makeCate = _.pipe(
	cateReduce, 
	cate2html
); 

var makeBlog = vblogs => {
	let allPenddings = _.map(blog2html)(vblogs); 

	return Promise.all(
		allPenddings
	).then(allSuc => {
		// console.log(`[[ BLOG ]] All Blogs Generated, Count: ${allPenddings.length}`); 
		infoLog('BLOG')(`All Blogs Generated, Count: ${allPenddings.length}`.yellow); 
	})
}

var makeIndex = () => {
	let html = render.index({
		title: '破站施工中'
	}); 

	return fs.writeFile(
		path.join(DIST, 'index.html'),
		html
	).then(suc => {
		infoLog('INDX')(`/index.html Ready`.yellow); 
	}); 
}

var copyFiles = () => {
	return copy([
		{
			ext: 'js', 
			dist: 'js'
		}, 
		{
			ext: 'css', 
			dist: 'css'
		}, 
		{
			ext: 'svg', 
			dist: 'icon'
		}
	]).then(suc => {
		infoLog('COPY')(`Static Files Copy Finish`.yellow); 
	});
}

// 总督 
var write = vblogs => {
	// Static File Copy 
	let allFilesReady = copyFiles(); 

	// 时间排序 
	let allHomeFinish = makeHome(vblogs); 

	// 按分类归类 
	let allCateFinish = makeCate(vblogs); 

	// 普通的渲染
	let allBlogFinish = makeBlog(vblogs); 

	// INDEX 
	let indexFinish = makeIndex(); 

	return Promise.all([
		allHomeFinish, 
		allCateFinish,
		allBlogFinish,
		allFilesReady,
		indexFinish
	])
}

module.exports = () => collector().then(write); 
