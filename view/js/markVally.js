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

		// $('#ii').after('<h1>Test!</h1>');
		$('img').each(function(idx, elem){
			// $(elem) === $(this)
			var imgAlt = $(this).attr('alt'); 
			var toAdd = '<mark class="img-intro">' + imgAlt + '</mark>'; 
			$(this).after(toAdd); 
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
	var footInit = function(){
		// collect sub tag to .foot container
		var subs = []; 
		$('sub').each(function(){
			if (!$(this).attr('more')){
				return; 
			}

			$(this).html('<a href="#vally-foot">[' + (subs.length+1) + ']</a>'); 
			subs.push($(this).attr('more')); 
		}); 

		subs.forEach(function(elem, idx, its){
			var temp = makeNode('li', elem); 
			$('#vally-foot').append(temp);
		}); 

		if (subs.length == 0) {
			$('#脚注').remove(); 
		}
		console.info(subs); 
	}

	var makeNode = function(name, content){
		return '<'+name+'>'+content+'</'+name+'>'
	}

	return {
		imgInit: imgInit,
		lineCount: lineCount,
		footInit: footInit
	}
})($); 


mark.imgInit(); 
mark.lineCount(); 
mark.footInit(); 
