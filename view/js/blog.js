// blog.js
require.config({
	baseUrl: "/js",
	paths: {
		"jquery": "jquery.min", 
		"nav": "nav", 
		"btns": "btns", 
		"Back": "back2top"
	}
});

define(['jquery', 'nav', 'btns', 'Back'], function($, nav, btns, Back){
	$(function(){
		btns.init(); 

		var back = new Back('.back-2-top', window); 
		back.init(); 
		
		console.log(back); 

		setTimeout(function(){
			nav.init();
			// nav.open(); 
		}, 500); 
	}); 
})

