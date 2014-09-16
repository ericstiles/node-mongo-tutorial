var express = require('express')
	, mongoose = require('mongoose')
	, app = express();

// serve static assets
app.use(express.static(__dirname + '/public'));

// simple sinatra-like syntax
app.get('/', function(request, response) {
	response.sendFile('index.html', { root: __dirname })
});

// listen for connections
var server = app.listen(3000, function() {
	console.log('listening on %d', server.address().port);
});
