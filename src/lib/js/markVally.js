function footOn(id){

	var $sel = document.getElementById(id); 
	$sel_now_class = $sel.getAttribute("class"); 
	// alert($sel_now_class); 
	$sel.scrollIntoView()
	$sel.setAttribute('class', 'foot-on'); 
	setTimeout(function(){
		$sel.setAttribute('class', ''); 
	// @keyframes footOn duration 0.4s; 
	}, 400); 
}
