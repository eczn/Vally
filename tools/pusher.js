// upload.js
var qiniu = require('qiniu'); 
var path = require('path'); 
var config = require('../config'); 
var http = require('http'); 
var fs = require('fs'); 

var bucket = config.qiniu.bucket; 
qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY; 
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

// 构建上传策略函数
function getUptoken(bucket, key) {
	var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
	return putPolicy.token();
}

// 构造上传函数
function uploadFile(localFile, key, cb) {
	var extra = new qiniu.io.PutExtra();
	var uptoken = getUptoken(bucket, key);

	qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
		if(!err) {
			// 上传成功， 处理返回值
			cb(ret); 
			// console.log(ret.hash, ret.key, ret.persistentId);       
		} else {
			// 上传失败， 处理返回代码
			console.log(err);
		}
	});
}


// //上传到七牛后保存的文件名
// var key = 'my-nodejs-logo.png';

// //要上传文件的本地路径
// var filePath = './build.js'; 

// //调用uploadFile上传
// uploadFile('./build.js', '__build.js');


var pusher = {}; 
pusher.uploadFile = uploadFile; 
pusher.getDownUrl = function(url){
	var policy = new qiniu.rs.GetPolicy();
	//生成下载链接url
	return policy.makeRequest(url);
}

module.exports = pusher; 
