// appConfig.js
// Many Global Setting For Vally

// var backEnd = "http://192.168.1.10/ProjectBuilding";
// var backEnd = "http://localhost/ProjectBuilding"; 

var HOST = window.location.href.split('#!')[0]; 


var whereVallyEnd = "vally-backEnd/";

// console.log(HOST+whereVallyEnd); 
var backEnd = HOST+whereVallyEnd;

if (HOST.indexOf("8080")){
	backEnd = "http://localhost/ProjectBuilding/aVally/src/vally-backEnd/"; 
}

// var backEnd = "";

var parser = new HyperDown(); 
// 	mdAfterParse = parser.makeHtml( this.article.body );
