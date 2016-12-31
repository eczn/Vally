mark = (function($){
	var imgSel = $(".md img");
	var imgDis = $(".img-dis"); 

	var imgInit = function(){
		imgDis.css("line-height", (window.innerHeight)+"px"); 
		// display img
		imgSel.click(function(ev){
			console.log("img click");
			var src = $(this).attr("src"); 
			$(".img-dis img").attr('src', src); 
			imgDis.removeClass("display-none"); 
			setTimeout(function(){
				imgDis.addClass('opa1'); 
			}); 
		});

		// close img 
		imgDis.click(function(ev){
			console.log("close")
			imgDis.removeClass('opa1').addClass("display-none"); 
		}); 
	}
	var lineCount = function(){
		$('.md pre code').each(function(idx, elem){
			var theLines = $(this).html().split('\n'); 
			var targetHTML = ''; 
			var i=0; 
			theLines.forEach(function(aLine){
				var temp = (i<10)?'0' + i.toString():i;
				targetHTML = targetHTML + '<span class="line-count">' +temp+ '</span>' + aLine + '<br />';
				i++; 
			}); 
			$(this).html(targetHTML); 
		});
	}

	return {
		imgInit: imgInit,
		lineCount: lineCount
	}
})($); 

mark.imgInit(); 
mark.lineCount(); 
