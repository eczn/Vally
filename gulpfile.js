var gulp = require('gulp'); 
var gulpif = require('gulp-if'); 
var webpack = require('gulp-webpack'); 
var named = require('vinyl-named'); 
var connect = require('gulp-connect'); 
var uglify = require('gulp-uglify'); 
var concat = require('gulp-concat'); 
var watch = require('gulp-watch'); 
// var vally = require('./work/index'); 
var minimist = require('minimist'); 
var config = require('./config.js'); 
var path = require('path'); 
var server = require('./server'); 
var fs = require('fs'); 
var vv = require('./index'); 

var opt = minimist(process.argv.slice(2), {
	string: 'dest'
}); 
if (opt.dest == ''){
	opt.dest = './build'; 
}
console.log(opt); 

gulp.task('blog', function(){
	console.log('change')
}); 

gulp.task('vally', function(){
	vv(false); 
}); 

gulp.task('vally-generate', function(){
	vv(config.qiniu.toUse); 
}); 

gulp.task('connect', function(){
	server.start(function(){
		console.log('Blog Reload'); 
		vv(); 
	});
});

gulp.task('listen', function(){
	var blogs = path.join(config.path.blog, '**/*'); 

	return watch(blogs, function () {
        vv(); 
    });
}); 

gulp.task('copy',  function() {
	return gulp.src(['src/**/*', '!src/components/**/*'])
		.pipe(gulp.dest(opt.dest))
});

gulp.task('help', function(){
	setTimeout(function(){
		console.log(" * Vally ? ")
		console.log(" - gulp serve   // open blog server"); 
		console.log(" - gulp deploy  // generate blog to destination configed in config.js"); 
	}, 2000);
}); 

gulp.task('clean', function(){
	// do nothing 
}); 

const git = require('simple-git')(config.path.dist);
gulp.task('git-push', function(){
	git.add('.')
		.commit('0v0 - automatic simple-git')
		.push(['origin', 'master'], function(){
			console.log('SUCCESS, Watch Your Static Site: ', config.blog.url); 
		})
}); 

gulp.task('qiniu', function(){
	// 使用七牛
	const upload = require('./upload'); 

	if (config.qiniu.toUse) { 
		// 读取列表 将图片带上前缀 

		var file = fs.readFileSync(path.join('temp', 'list.dat'));
		var sucPreList; 
		imgList = file.toString().split('\n'); 

		try {
			var sucPre = fs.readFileSync(path.join('temp', 'suc.dat'));
		} catch (ex) {
			sucPre = false; 
		}

		if (sucPre){
			sucPreList = sucPre.toString().split('\n'); 
			imgList = imgList.filter(function(elem, idx, its){
				if (sucPreList.includes(elem)){
					return false; 
				} else {
					return true; 
				}
			}); 
		} else {
			sucPreList = []; 
		}

		var sucList = sucPreList; 
		// 自动 上传 
		if (config.qiniu.autoUpload) { 
			var i = 0; 
			imgList.forEach(function(elem, idx, its){
				// elem 
				upload(elem, function(err, ret){
					i++; 
					if (err){
						console.log('UPLOAD FAILED. ', err); 
					} else {
						console.log('SUCCESS. ', elem); 
						console.log(ret.hash, ret.key, ret.persistentId);
						sucList.push(elem); 
					}

					if (i>=imgList.length){
						let sucList_str = sucList.join('\n'); 
						fs.writeFileSync(path.join('temp', 'suc.dat'), sucList_str, {
							flag: 'w+'
						}); 
					}
				}); 
			}); 
		}
	}
}); 

gulp.task('new', function(){
	
}); 

gulp.task('default', ['help']);

gulp.task('serve', ['vally', 'connect']); 

gulp.task('generate', ['vally-generate']);
gulp.task('deploy', ['clean', 'git-push', 'qiniu']); 
