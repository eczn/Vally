// nav.js
define(['jquery'], function($){
	var nav = {}
	  , sel = '.nav-btn'
	  , navActive = 'nav-active'

	if (window.innerWidth < 500) {
		$('.nav-container').css('width', '250px'); 
		$('head').append(
			'<style>' + 
				'.nav-active {' + 
				    'transform: translateX(-250px);' + 
				'}' + 
			'</style>'
		);
	}

	nav.init = function(){
		$(sel).click(nav.toggle); 
	}

	$(document).click(function(e){
		var _con = $('.nav-container')
		  , active = $(sel).attr('active')


		if (active && !_con.is(e.target) && _con.has(e.target).length === 0){ 
			// 功能代码
			nav.close('click'); 
		}
	});

	nav.toggle = function(){
		var dom = this; 

		console.log('It Work'); 

		if (dom.getAttribute('active')){
			nav.close(); 
		} else {
			nav.open(); 
		}

		return false; 
	}

	nav.open = function(){
		$(sel).attr('active', '✔'); 
		$('.blog-container').addClass(navActive)
	}

	nav.close = function(){
		$(sel).attr('active', ''); 
		$('.blog-container').removeClass(navActive)
	}

	return nav; 
})
