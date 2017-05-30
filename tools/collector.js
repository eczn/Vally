var fs = require('then-fs')
  , config = require('../config')
  , path = require('path')
  , _ = require('ramda')
  , vBlogTools = require('./vblog')
  , vParse = vBlogTools.vParse
  , entryRender = vBlogTools.entryRender
  , homeRender = vBlogTools.homeRender
  , blogRender = vBlogTools.blogRender
  , categoryRender = vBlogTools.categoryRender
  , mkdir = vBlogTools.mkdir
  , dir = config.path.blog; 



var isDirectory = file => fs.statSync(path.join(dir, file)).isDirectory(); 
var isDraft = blog => blog.info.isDraft; 


function collector() {
	// 读取文件列表  
	fs.readdir(config.path.blog).then(
		// 剔除 
		// lists 里可能含有文件夹 得剔除 
		lists => _.reject(isDirectory)(lists)
	).then(
		// 读取并格式化成 vblog 格式 
		lists => _.map(item => {
			let blog = {}
			  , vblog = {}

			// 博客绝对地址
			blog.locatedAt = path.join(dir, item); 
			// 格式化 
			vblog = vParse(blog.locatedAt);
			blog.info = vblog.info; 
			blog.content = vblog.content; 

			// 取得 stat 
			blog.stat = fs.statSync(blog.locatedAt); 

			// 文件名
			blog.fileName = item; 

			return blog; 
		})(lists)
	).then(
		// blog 可能是草稿 得剔除
		blogsWiehDraft => _.reject(isDraft)(blogsWiehDraft)
	).then(
		// 按写作时间排序
 		blogs => _.sort(
 			(a, b) => b.info.date - a.info.date
 		)(blogs)
	).then(
		// 分类 
		blogs => {
			let categories = _.reduce((acc, blog) => {
				// let blogIdx = _.indexOf(blog)(blogs); 

				if (acc[blog.info.category]) {
					acc[blog.info.category].push(blog); 
				} else {
					acc[blog.info.category] = [blog]; 
				}

				return acc; 
			}, {})(blogs); 

			// 所有分类
			let allCategoriesName = _.map(cateName => {
				// 分类简介 （以该分类下的第一个博文的 cateIntro 为准）
				let cateIntro = categories[cateName].slice(-1)[0].info.cateIntro;
				
				// blogs from cateName
				_.forEach(blog => {
					// 注入 /blog/*.html 
					let blogIdx = _.indexOf(blog)(blogs)
					  , fileName = blog.info.title + '.html'
					  , base = path.join(config.path.dist, 'blog')
					  , html = blogRender({
						blog: blog,
						next: blogs[blogIdx + 1] || blogs[0]
					}); 

					fs.writeFile(path.join(base, fileName), html).then(err => {
						if (err) throw err; 
					}); 
				})(categories[cateName]); 

				// 渲染分类入口 
				// categories/{{cateName}}.html 
				let base = path.join(config.path.dist, 'categories'); 
				let html = categoryRender({
					blogs: categories[cateName],
					cateName: cateName,
					cateIntro: cateIntro
				}); 

				fs.writeFile(path.join(base, cateName + '.html'), html).then(err => {
					if (err) throw err; 
				})

				
				return {
					name: cateName,
					cateIntro: cateIntro,
					count: categories[cateName].length
				}
			})(Object.keys(categories));

			// categories/index.html 
			let base = path.join(config.path.dist, 'categories'); 
			let html = entryRender({
				categories: allCategoriesName,
				count4all: blogs.length
			}); 

			fs.writeFile(path.join(base, 'index.html'), html).then(err => {
				if (err) throw err; 
			})
		
			return blogs; 
		}
	).then(
		// 分页 
		blogs => _.splitEvery(config.blog.countPerPage)(blogs)
	).then(
		// 注入到 HTML 模版渲染 
		pages => _.forEach(page => {
			var pageIdx = _.indexOf(page)(pages)
			  , pagePath = path.join(config.path.dist, 'page')
			  , pagePathIdx = path.join(pagePath, pageIdx.toString())
			  , param = _.reduce(
				(acc, cur) => {
					// console.log(cur.info.title)
					acc.blogs.push(cur); 

					return acc
				}, {
					blogs: []
				}
			)(page); 

			param.pages = new Array(pages.length).fill(0).map((a, i) => {
				return {
					active: pageIdx === i, 
					link: `/page/${i}`
				}
			}); 

			// 渲染 
			let html = homeRender(param);
			
			// 创建文件夹 如果存在则跳过 
			mkdir(pagePath); 
			mkdir(pagePathIdx); 

			// 写入 
			fs.writeFile(path.join(pagePathIdx, 'index.html'), html).then(err => {
				if (err) throw err; 
				console.log(`${pagePathIdx} READY`); 
			}); 

			// 单独把第 0 页复制到根目录 
			if (pageIdx === 0){
				fs.writeFile(path.join(config.path.dist, 'index.html'), html).then(err => {
					if (err) throw err; 
					console.log('INDEX READY'); 
				}); 
			}
			// console.log(html)
		})(pages)
	).then(
		pages => pages.map(page => {
			return page.map(item => item.info.title)
		})
	).then(
		pages => console.log(pages)
	).catch(err => {
		setTimeout(() => {
			throw err
		}); 
	});
}

module.exports = collector; 
