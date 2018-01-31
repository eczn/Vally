// blog.js
require.config({
	baseUrl: "/js",
	paths: {
		"jquery": "jquery.min"
	}
});

define(['jquery'], function($){
	console.log('onload'); 
})

