var gulp = require('gulp');
var gulpif = require('gulp-if'); 
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat'); 

var minimist = require('minimist');


var opt = minimist(process.argv.slice(2), {
	string: 'dest'
}); 
if (opt.dest == ''){
	opt.dest = './build'; 
}
console.log(opt); 

gulp.task('connect', function(){
	connect.server({
		root: './src',
		port: 8080,
		livereload: true
	});
});


var appList = ['app', 'router'];

function mapFiles(list, extname) {
	return list.map(function (app){
		return 'src/' + app + '.' + extname;
	});
};

gulp.task('bundle', function(){
	return gulp.src(mapFiles(appList, 'js'))
				.pipe(named())
				.pipe(webpack({
					module: {
						loaders: [{
							test: /\.vue$/,
							loader: 'vue'
						}, {
							test: /\.(png|jpg)$/,
							loader: 'url'
						}]
					},
					watch: opt.dest == undefined
				}))
			.pipe(gulpif( opt.dest != undefined , uglify()))
       		.pipe(gulp.dest('src/lib/'))
			.pipe(connect.reload());
});


gulp.task('lib-uglify', function() {
	return gulp.src(['src/lib/js/fastclick.js', 'src/lib/js/Parser.js', 'src/lib/js/appConfig.js', 'src/lib/js/markVally.js']) 
		.pipe(named('fastclick.min.js'))
		.pipe(uglify())
		.pipe( concat('libs.min.js') )
		.pipe(gulp.dest('src/lib/js/mins'))
});

gulp.task('copy',  function() {
	return gulp.src(['src/**/*', '!src/components/**/*'])
		.pipe(gulp.dest(opt.dest))
});


gulp.task('default', ['bundle', 'connect']);
gulp.task('deploy', ['bundle', 'connect', 'lib-uglify', 'copy']);


// gulp.task('minify_js',["clean"], function() {
//     var jsSrc = ['./lib/*.js','!./lib/*.src.js'];
// 
//     return gulp.src(jsSrc)
//         .pipe(concat('all.js'))    //合并所有js到all.js
//         .pipe(gulp.dest('./lib'))    //输出all.js到文件夹
//         .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
//         .pipe(uglify())    //压缩
//         .pipe(gulp.dest('./lib'));  //输出
// });
