// random-arr.js 
define([], function(){
	function randomArr(a, b = []){
		let len = a.length; 

		if (a.length){
			let target = parseInt(Math.random() * len);

			let item = a.splice(target, 1)[0]; 
			
			b.push(item); 

			return randomArr(a, b); 
		} else {
			return b; 
		}
    }
    
    return randomArr; 
}); 