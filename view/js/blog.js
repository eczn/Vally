// blog.js
require.config({
	baseUrl: "/js",
	paths: {
		"jquery": "jquery.min", 
		"nav": "nav", 
		"btns": "btns"
	}
});

define(['jquery', 'nav', 'btns'], function($, nav, btns){
	$(function(){
		btns.init(); 
		
		setTimeout(function(){
			nav.init();
			// nav.open(); 
		}, 500); 
	}); 
})

