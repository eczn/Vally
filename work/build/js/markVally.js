var imgSel = $(".md img");
var imgDis = $(".img-dis"); 

imgDis.css("line-height", (window.innerHeight)+"px"); 

imgSel.click(function(ev){
	console.log("img click");
	var src = $(this).attr("src"); 
	$(".img-dis img").attr('src', src); 
	imgDis.removeClass("display-none"); 
});

imgDis.click(function(ev){
	console.log("close")
	imgDis.addClass("display-none"); 
}); 