// server.js
var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');
var config = require('./config'); 

module.exports = {
	start: function(){
		var server = http.createServer(function (request, response) {
			var pathname = url.parse(request.url).pathname;
			// var realPath = path.join("assets", pathname);
			var realPath = path.join(path.resolve(config.path.dist), pathname); 
			// config.path.dist
			//console.log(realPath);
			var ext = path.extname(realPath);
			ext = ext ? ext.slice(1) : 'unknown';


			if (pathname == '\\' || pathname == '/'){
				pathname = '/index.html'; 
				realPath = path.join(realPath, 'index.html');
			}

			console.log(pathname); 
			console.log(realPath); 
			fs.exists(realPath, function(exists) {
				if (!exists) {
					response.writeHead(404, {
						'Content-Type': 'text/plain'
					});

					response.write("This request URL " + pathname + " was not found on this server.");
					response.end();
				} else {
					fs.readFile(realPath, "binary", function (err, file) {
						if (err) {
							response.writeHead(500, {
								'Content-Type': 'text/plain'
							});
							response.end('500, err');
						} else {
							var contentType = mine[ext] || "text/html";
							response.writeHead(200, {
								'Content-Type': contentType
							});
							response.write(file, "binary");
							response.end();
						}
					});
				}
			});
		}).listen(config.server.PORT);
		
		console.log("vally server now runing at port: " + config.server.PORT);
	}
}
