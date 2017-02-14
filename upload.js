// upload.js
var qiniu = require('qiniu'); 
var path = require('path'); 
var config = require('./config'); 
var bucket = config.qiniu.bucket; 
qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY; 
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;  


// 构建上传策略函数
function gene_uptoken(bucket, key) {
	var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
	return putPolicy.token();
}

// key:  filePath in bucket 
module.exports = function(filePath, cb){
	var localFile = path.join(config.path.dist, filePath); 
	var localFilePath = path.parse(localFile); 
	var key = localFilePath.base; // fileName 

	var uptoken = gene_uptoken(bucket, key); 
	var extra = new qiniu.io.PutExtra();

	qiniu.io.putFile(uptoken, key, localFile, extra, cb);
}

// function cb(err, ret) {
// 	if(!err) {
// 		// 上传成功， 处理返回值
// 		// console.log(ret.hash, ret.key, ret.persistentId);    
// 		suc(ret);
// 	} else {
// 		// 上传失败， 处理返回代码
// 		console.log(err);
// 	}
// }
