// mark-vally.js
$(function(){
	var list = []; 

	$('img').click(function(e){
		var src = $(this).attr('src'); 
		$imgClick = $('.img-clicked'); 
		
		if (window.innerWidth < 700){
			window.open(src); 
			return ; 
		}

		if ($imgClick.attr('active') !== '√'){
			$('html').addClass('no-scroll'); 

			$imgClick.empty(); 
			$imgClick.html('<img src="' + src + '" />').attr('active', '√'); 

			list.push({
				target: e.target,
				close: function(){
					$imgClick.attr('active', '×'); 

					$('html').removeClass('no-scroll'); 
				}
			})
		}
	}); 

	$(document).click(function (e) {
		var target = e.target;

		// 复写 
		list = list.filter(toCheck => {
			var flag = target !== toCheck.target; 

			if (flag){
				toCheck.close(); 
			}
			// close 过的不能保留
			return !flag; 
		}); 

	});

})