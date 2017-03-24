const fs = require('fs');
const url = require('url');
const path = require('path');
const querystring = require('querystring');
const formidable = require('formidable');

function start(res, req){
	console.log('response start');

	fs.readFile(path.join(__dirname,'./source/index.html'), 'utf8', function(err, data){
		res.writeHead(200,{ 'Content-Type': 'text/html' });
		res.write(data);
		res.end();
	});

}

function upload(res, req){
	console.log('upload');

	let form = new formidable.IncomingForm();
	console.log('About to parse');
	form.parse(req, (err, fields, files) => {
		console.log('parsing done');
		let random = Math.floor(Math.random()*1000);
		fs.renameSync(files.upload.path, path.join(__dirname, `./img/${random}.jpg`));

		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(`<script>window.location.href = 'http://localhost:3000/img/${random}.jpg'</script>'`);
		res.end();
	})

}

function img(res, req){
	console.log('Request handler img was called');
	fs.readdir(path.join(__dirname, './img/'), 'binary', (err, files) => {
		if(err){
			fs.mkdir(path.join(__dirname, './img/'),(err) => {
				if(err){
					res.writeHead(500, { 'Content-Type': 'text/plain' });
					res.write(`${err}\n`);
					res.end();
				} else {
					console.log('mkdir img');
					res.writeHead(200, { 'Content-Type': 'text/plain' });
					res.write('No Image');
					res.end();
				}
			});
		} else {
			if(!files.length){
				console.log('No Image');
				res.writeHead(200, { 'Content-Type': 'text/plain' });
				res.write('No Image');
				res.end();
				return;
			}

			let html = '<ul>';
			files.forEach( (file) => {
				let pathname = url.parse(req.url).pathname;
				html += `<li><img src="${path.join(pathname,file)}"></li>`
			})
			html += '</ul>';

			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(html);
			res.end();
		}
	})

}

exports.start = start;
exports.upload = upload;
exports.img = img;