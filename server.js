const http = require('http');
const url = require('url');


function startServer(route, handle){
	http.createServer(function(req, res){
		let pathname = url.parse(req.url).pathname;
		console.log(`Request for ${pathname} received`);

		route(handle, pathname, res, req);

	}).listen(3000);
	console.log('Server has started.');
}

exports.start = startServer;