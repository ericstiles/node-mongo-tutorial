var express = require('express')
	, mongoose = require('mongoose')
	, cookieParser = require('cookie-parser')	
	, bodyParser = require('body-parser')
	, exSession = require('express-session')
	, app = express();

// parse x-www-form-urlencoded and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookies!
app.use(cookieParser());
app.use(exSession({ secret: 'supersecret' }));

// serve static assets
app.use(express.static(__dirname + '/public'));

// db connection
mongoose.connect('mongodb://localhost/node-mongo-tutorial');

// require all mongoose models
require('fs').readdirSync('./models').forEach(function(file) {
	require('./models/' + file)
});

// open db connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'error:'));
db.once('open', function callback() {

	// simple sinatra-like syntax
	app.get('/', function(request, response) {
		response.sendFile('index.html', { root: __dirname })
	});

	// comment model
	var Comment = mongoose.model('Comment')

	// response helper function
	function respondWith(data, error, response) {
		if (error) {
			response.json({ status: 500, error: error });
		} else {
			response.json({ status: 200, data: data })
		}
	}

	// POST /session/author - cookie author name, return message
	// @params author

	app.post('/session/author', function(req, res) {
		req.session.author = req.body.author
		respondWith({ author: req.session.author }, null, res);
	});

	// POST /comments/create - new comment, responds with comment
	// @params author, text	

	app.post('/comments/create', function(req, res) {
		var commentAttr = req.body;
		commentAttr['author'] = req.session.author || "Anonymous";
		
		new Comment(commentAttr).save(function(error, comment) {
			respondWith(comment, error, res);
		});
	});

	// GET /comments - responds with all comments sorted by create date
	// @params none

	app.get('/comments', function(req, res) {
		Comment.list(function(error, comments) {
			respondWith(comments, error, res);
		});
	});

	// listen for connections
	var server = app.listen(3000, function() {
		console.log('listening on %d', server.address().port);
	});

	// socket server
	var io = require('socket.io')(server);

	// comment listener
	io.on('connection', function(socket) {
		socket.on('comment', function(comment) {
			io.sockets.emit('newComment', comment);
		});
	});

});