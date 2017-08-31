#!/usr/bin/env node 

const server = require('./tools/server'); 
const collector = require('./tools/collector'); 
const write = require('./tools/write'); 
const logger = require('./tools/logger'); 
const initLog = logger.bucket('INIT'.cyan); 
const deploy = require('./tools/deploy'); 

let argv = process.argv.slice(2); 
let [ operation, ...params ] = argv; 

var todos = {
	new: function(fileName){
		
	}, 
	generate: function(){
		process.env.VALLY = true; 

		let now = new Date(); 
		write().then(initSuc => {
			let end = new Date(); 
			initLog(`Generate Success, Time: ${end - now} ms`.yellow); 
		}); 
	}, 
	serve: function(){
		process.env.VALLY = false; 
		
		let now = new Date(); 
		write().then(initSuc => {
			let end = new Date(); 

			initLog(`Init Success, Time: ${end - now} ms`.yellow); 
			server(); 
		}); 
	}, 
	deploy: function(){
		deploy(); 
	}, 
	help: function(){
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
}

if (todos[operation]){
	todos[operation].apply(todos, params);  
} else {
	todos['help'](); 
}
