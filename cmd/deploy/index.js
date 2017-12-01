// deploy.js
const config = require('../../config'); 

function deploy(toLog = true){
	const git = require('simple-git')(config.path.dist);

	return new Promise(res => {
		git.add('.')
			.commit('0v0 - automatic simple-git')
			.push(['origin', 'master'], function(){
				toLog && console.log('SUCCESS, Watch Your Static Site: ', config.blog.url); 

				res(); 
			}) 
	})
}


module.exports = deploy; 
