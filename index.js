#!/usr/bin/env node 

const server = require('./tools/server'); 
const collector = require('./tools/collector'); 
const write = require('./tools/write'); 


// collector(); 


write().then(
	server
); 
