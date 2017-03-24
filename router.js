const fs = require('fs');
const path = require('path');

const requestImg = ['jpg', 'png'];

function route(handle, pathname, res, req){
	console.log(`About to route a request for ${pathname}`);
	if(typeof handle[pathname] === 'function'){
		
		handle[pathname](res, req);
	} else if ( requestImg.includes(pathname.slice(-3)) ) {

		fs.readFile(path.join(__dirname, pathname),'binary' ,(err, file) => {
			res.writeHead(200,{ 'Content-Type': 'image/jpg' });
			res.write(file, 'binary');
			res.end();

		})
	} else{

		console.log(`No request handler found for ${pathname}`);
		res.writeHead(404,{ 'Content-Type': 'text/plain' });
		res.write('404 Not found');
		res.end();
	}
}

exports.route = route;