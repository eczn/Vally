#!/usr/bin/env node 

const server = require('./tools/server'); 
const collector = require('./tools/collector'); 
const write = require('./tools/write'); 
const logger = require('./tools/logger'); 
const initLog = logger.bucket('INIT'.cyan); 
const deploy = require('./tools/deploy'); 
const replacer = require('./tools/replacer'); 


let argv = process.argv.slice(2); 
let [ operation, ...params ] = argv; 

function newBlog(fileName){
	const newBlog = require('./tools/new-blog'); 

	newBlog(fileName).then(suc => {
		console.log('Generate A New Blog Success'); 
	}).catch(err => {
		console.log(err); 
	}); 
}

function generate(){
	process.env.VALLY = true; 
	let now = new Date(); 

	write().then(initSuc => {
		replacer(); 
	}); 
}

function serve(){
	process.env.VALLY = false; 
	
	let now = new Date(); 
	write().then(initSuc => {
		let end = new Date(); 

		initLog(`Init Success, Time: ${end - now} ms`.yellow); 
		server(); 
	}); 
}

function help(){
	let helpLog = (h, t) => logger.bucket(h.cyan)(t.yellow); 
	
	[
		[' Create Vally Blog', 'vally new [fileName]'], 
		[' Start Vally Serve', 'vally serve'], 
		['Generate Blog Site', 'vally generate'], 
		['Deploy Site By Git', 'vally deploy']
	].forEach(arr => {
		helpLog.apply(null, arr); 
	}); 
}

var todos = {
	// 创建新博客 
	new: newBlog, 
	n: newBlog,
	// 生成线上博客 
	generate: generate, 
	g: generate,
	// 本地服务
	serve: serve, 
	s: serve, 
	// 部署到线上
	deploy: deploy, 
	d: deploy,
	// Help 
	help: help, 
	h: help
}

if (todos[operation]){
	todos[operation].apply(todos, params);  
} else {
	todos['help'](); 
}
