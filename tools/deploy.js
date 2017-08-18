// deploy.js
const config = require('../config'); 

function deploy(){
	const git = require('simple-git')(config.path.dist);
	git.add('.')
		.commit('0v0 - automatic simple-git')
		.push(['origin', 'master'], function(){
			console.log('SUCCESS, Watch Your Static Site: ', config.blog.url); 
		}) 
}

deploy()

module.exports = deploy; 
