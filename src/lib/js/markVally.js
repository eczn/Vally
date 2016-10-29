function footOn(id, isBack){
	var $sel = document.getElementById(id); 
	
	$sel_now_class = $sel.getAttribute("class"); 
	// alert($sel_now_class); 
	$sel.scrollIntoView();

	if (isBack){
		// return; 
	} else {
		$sel.setAttribute('class', 'foot-on'); 
	}

	setTimeout(function(){
		$sel_now_class = $sel_now_class.replace('foot-on', '');
		$sel.setAttribute('class', $sel_now_class); 
	// @keyframes footOn duration 0.4s; 
	}, 400); 
}
