// home.js
require.config({
	baseUrl: "/js",
	paths: {
		"jquery": "jquery.min", 
		"nav": "nav"
	}
});

define(['jquery', 'nav'], function($, nav){
	$(function(){
		setTimeout(function(){
			nav.init(); 
			// nav.open(); 
		}, 500); 
	}); 
})
