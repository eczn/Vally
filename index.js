#!/usr/bin/env node 

require('shelljs/global');

var server = require('./tools/server')
  , newblog = require('./cmd/newblog.js')
  , config = require('./config'); 

var argv = require('yargs')
	.command(["serve", "s"], "Opening Vally Server For Edit And Read", function (yargs){  
		echo("Opening Vally Server For Edit And Read");

		server(function(name, from){
			console.log('RELOAD'); 
		}); 
	})
	.command(["new", "n"], "New A File For Edit", function(yargs){
		// Get New Blog Name 
		let argv = yargs.reset().argv; 
		let fileName = argv._[argv._.length-1];

		// Generate New Blog With fileName And open it
		newblog(fileName); 
	})
	.command(["generate", "g"], "Generate The Miniest Code For Vally's Blog", function(yargs){
		// uglify 
		echo("Generating ... "); 
	})
	.command(["deploy", "d"], "Deploy You Vally Site To Git Page", function(yargs){
		echo("Deploying ... ");

		const git = require('simple-git')(config.path.dist);
		git.add('.')
			.commit('0v0 - automatic simple-git')
			.push(['origin', 'master'], function(){
				console.log('SUCCESS, Watch Your Static Site: ', config.blog.url); 
			}) 
	})
	.argv; 
