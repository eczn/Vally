// home.js
require.config({
	baseUrl: "/js",
	paths: {
		"jquery": "jquery.min", 
		"nav": "nav"
	}
});

define(['jquery', 'nav', 'ga'], function($, nav, ga){
	ga(); 

	$(function(){
		setTimeout(function(){
			nav.init(); 
			nav.open(); 

			setTimeout(() => {
				nav.toggle(); 
			}, 300)
		}, 500); 
	}); 
})
