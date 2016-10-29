// appConfig.js
// Global Setting and Functions For Vally

var parser = new HyperDown(); 
var HOST = window.location.href.split('#!')[0]; 
var whereVallyEnd = "vally-backEnd/";
var backEnd = HOST+whereVallyEnd;

if (HOST.indexOf("localhost")){
	backEnd = "http://localhost/ProjectBuilding/aVally/src/vally-backEnd/";
}
console.log(backEnd);

function setCookie(c_name, value, expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString()); 
}

function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start != -1){ 
			c_start = c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1){
				c_end=document.cookie.length
			}
			return unescape(document.cookie.substring(c_start,c_end))
		}
	}
	return "";
}
