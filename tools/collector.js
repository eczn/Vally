// collector.js
const fs = require('then-fs')
	, path = require('path')
	, config = require('../config')
	, _ = require('ramda')
	, v = require('./v')
	// 包装一下针对数组 
	, toVblogs = _.map(v)


const BLOG_BASE = config.path.blog; 

// BLOG_BASE 下的某个文件名是否是文件夹 
var isDirectory = file => fs.statSync(
	path.join(BLOG_BASE, file)
).isDirectory(); 

// blog是否是草稿
var isDraft = blog => blog.info.isDraft; 

// 打印 
var print = e => console.log(e); 
var printArr = _.forEach(print); 

// 读博客为普通的字符串格式 
var readBlog = () => new Promise(goNext => {
	fs.readdir(BLOG_BASE).then(
		// 剔除文件夹 
		_.reject(isDirectory)
	).then(
		// 路径转化成绝对路径
		_.map(file => path.join(BLOG_BASE, file))
	).then(
		// 读取文件 map 到一个 Promise 数组 
		_.map(file => fs.readFile(file))
	).then(
		// Promise All 
		filePromises => Promise.all(filePromises).then(rawFiles => {
			let blogs = rawFiles.map(e => e.toString())

			goNext(blogs); 
		})
	)
}); 

// 验收 
var collector = () => readBlog().then(
	toVblogs
).then(
	// 剔除草稿 
	_.reject(_.prop('isDraft'))
)

collector.readBlog = readBlog; 

// 暴露 
module.exports = collector
