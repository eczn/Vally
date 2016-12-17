var imgSel = $(".md img");
var imgDis = $(".img-dis"); 

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



function lineCount(){
	$('.md pre code').each(function(idx, elem){		// 用匿名函数遍历pre和code
		// 行数 
		var lines = $(this).text().split('\n').length;
		var content = $(this).html(); 

		// console.log(content.split('\n')); 
		
		var theLines = content.split('\n'); 
		var targetHTML = ''; 

		var i=0; 
		theLines.forEach(function(aLine){
			var temp = (i<10)?'0' + i.toString():i;

			targetHTML = targetHTML + '<span class="line-count">' +temp+ '</span>' + aLine + '<br />';
			i++; 
		}); 

		$(this).html(targetHTML); 

		// console.dir( $(this)[0] ); 

		// console.log($(this).text().split('\n')); 
		// var $numbering = $('<ul/>').addClass('pre-numbering');

		// $(this)
		// 	.addClass('has-numbering')
		// 	.parent()
		// 	.append($numbering);
		// 每个li结束前加个数字
		// for(i=0;i<lines;i++){
		// 	i = i<10?( '0'+i.toString() ):(i);
		// 	$numbering.append($('<li/>').text(i));
		// }
	});
}

lineCount(); 
