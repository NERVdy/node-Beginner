const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');


let handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/img'] = requestHandlers.img;

server.start(router.route, handle);