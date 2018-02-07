// blog.js
require.config({
	baseUrl: "/js",
	paths: {
		"jquery": "jquery.min",
		"Timer": "timer", 
		'second': 'index-second',
		'randomArr': 'random-arr'
	}
});

define(['jquery', 'Timer', 'second', 'randomArr'], function($, Timer, second, randomArr){
	let timer = new Timer(); 
	timer.init(); 

	second(timer); 


	let $hm = $('.hm'); 
	let $hh = $hm.find('.hh'); 
	let $mm = $hm.find('.mm'); 
	let $sp = $hm.find('.sp'); 

	timer.on('ticking', time => {
		let { hh, mm, ss } = time; 

		hh = ('00' + hh).slice(-2); 
		mm = ('00' + mm).slice(-2); 


		$('.hm').addClass('tick'); 

		setTimeout(() => $('.hm').removeClass('tick'), 400); 

		// $('.hm').html(`${hh}:${mm}`); 

		$hh.html(hh); 
		$mm.html(mm); 
	})

	/**
	 * @description 遍历 
	 * @param { Node  } $ 
	 * @param { Array } res 
	 */
	function collector($, res = []){
		
		let $children = Array.from($.childNodes).filter(e => e.nodeType === 1); 
		
		if ($children.length === 0 ){
			res.push($); 
		} else {
			$children.forEach($child => {
				collector($child, res); 
			}); 

			return res; 
		}
	}
	
	let $doms_style = randomArr(collector($('body')[0])).map($ => {
		return {
			$, 
			_: {}
		}
	}); 


	function rrr(){
		if (rrr.lock) return; 
		rrr.lock = true; 
		$doms_style.forEach(($dom_style, idx) => {
			let { $, _ } = $dom_style; 
	
			_.opacity = $.style.opacity; 
			_.transform = $.style.transform; 
			
			setTimeout(() => {
				// $dom.style.opacity = null; 
				$.style.opacity = 0; 
				$.style.transform = 'scale(1.5)'; 
			}, idx * 25); 
		})
	
		setTimeout(() => {
			$doms_style.forEach(($dom_style, idx) => {
				let { $, _ } = $dom_style; 
				setTimeout(() => {
					// $dom.style.opacity = null; 
					$.style.opacity = null; 
					$.style.transform = _.transform; 
				}, idx * 25); 
			})
		}, 2000); 

		setTimeout(() => {
			rrr.lock = false; 
		}, $doms_style.length * 30 + 2000); 
	}

	rrr(); 

	$('.main').click(rrr)
})

