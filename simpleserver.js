var restify = require('restify'),
	pjson = require('./package.json'),
	server = restify.createServer({
		name: 'SimpleServerSuite',
		version: pjson.version
	});

server
	.use(restify.bodyParser());
server
	.head('/api/test', function(req, res, next) {
		res.send({
			success: true
		});
		return next();
	});
server
	.get('/api/test', function(req, res, next) {
		setTimeout(function() {
			res.send({
				success: true
			});
		}, 500);
		return next();
	});
server
	.post('/api/test', function(req, res, next) {
		setTimeout(function() {
			res.send({
				success: true,
				data: req.params
			});
		}, 500);
		return next();
	});
server
	.put('/api/test', function(req, res, next) {
		setTimeout(function() {
			res.send({
				success: true,
				data: req.params
			});
		}, 500);
		return next();
	});
server
	.del('/api/test', function(req, res, next) {
		setTimeout(function() {
			res.send({
				success: true
			});
		}, 500);
		return next();
	});
server.get(/.*/, restify.serveStatic({
	'directory': './coverage/html',
	'default': 'index.html'
}));



server.listen((pjson.application.port + 1), function() {
	console.log('%s, listening at %s, app version is %s', server.name, server.url, pjson.version);
});