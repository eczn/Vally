var gulp = require('gulp');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

gulp.task('connect', function(){
	connect.server({
		root: './src',
		port: 8080,
		livereload: true
	});
});

var appList = ['app', 'router'];

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
					watch: true
				}))
			.pipe(uglify())
				// .pipe(uglify())
        		.pipe(gulp.dest('src/lib/'))
				.pipe(connect.reload());
});

gulp.task('uglify', function() {
    return gulp.src(['src/lib/js/fastclick.js'])
    .pipe(uglify())
    .pipe(gulp.dest('src/lib/js/*.min.js'));
});

function mapFiles(list, extname) {
	return list.map(function (app){
		return 'src/' + app + '.' + extname;
	});
};

gulp.task('default', ['bundle', 'connect']);
