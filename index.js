#!/usr/bin/env node 

const server = require('./tools/server'); 
const collector = require('./tools/collector'); 
const write = require('./tools/write'); 
const logger = require('./tools/logger'); 
const initLog = logger.bucket('INIT'.cyan); 

let now = new Date(); 
write().then(initSuc =>{
	let end = new Date(); 


	initLog(`Init Success, Time: ${end - now} ms`.yellow); 
	server(); 
}); 
