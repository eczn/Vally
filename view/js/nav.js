// nav.js 
define(['jquery'], function($){
	var nav = {}
	  , sel = '.nav-btn'
	  , navActive = 'nav-active'
	  , navWidth = 320; 

	if (window.innerWidth < 500) {
		navWidth = 250; 

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
		var $navContainer = $('.nav-container') 

		var startAt, endAt, $nowAt, nowAt, $another, another, inc; 

		$navContainer.on('touchstart', function(e){
			var touch = e.targetTouches[0]; 

			startAt = touch; 

			nowAt = $('.for-tab:checked').val(); 
			$nowAt = $('.nav-container .' + nowAt); 
			if (nowAt === 'about'){
				another = 'list'; 
				$another = $('.nav-container .list');
			} else {
				another = 'about'; 
				$another = $('.nav-container .about');
			}

			$nowAt.removeClass('transition-all'); 
			$another.removeClass('transition-all'); 
		});

		$navContainer.on('touchmove', function(e){
			var touch = e.targetTouches[0]; 

			inc = (touch.clientX - startAt.clientX ) * 100 / navWidth; 

			$nowAt.css('left', inc + '%'); 
		});

		$navContainer.on('touchend', function(e){
			$nowAt.addClass('transition-all'); 
			$another.addClass('transition-all');

			if (Math.abs(inc) > 30){
				console.log('应该 toggle'); 
				$('.for-' + another).click(); 
			}

			$nowAt.css('left', ''); 
			$another.css('left', ''); 
		});
	}

	function clickOtherArea(e){
		var _con = $('.nav-container')
		  , active = $(sel).attr('active')

		if (active && !_con.is(e.target) && _con.has(e.target).length === 0){ 
			// 功能代码
			nav.close('click'); 
		}
	}

	$(document).click(clickOtherArea);
	$(document).on('touchstart', clickOtherArea);

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
		$('.blog-container').addClass(navActive); 
		$('.nav-container').removeClass('opa0'); 
	}

	nav.close = function(){
		$(sel).attr('active', ''); 
		$('.blog-container').removeClass(navActive); 
		setTimeout(function(){
			$('.nav-container').addClass('opa0'); 
		}, 300)
	}

	return nav; 
})
