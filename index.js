// Setup basic express server
var express = require('express');
var app = express();
var http = require('http').createServer(app);
io = require('socket.io')(http, { pingInterval: 500 });
var port = process.env.PORT || 80;

http.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

var id = 0, xx = 0, yy = 0;

io.on('connection', function(socket) {
	socket.ident = id++;
	
	setInterval(function(){
		socket.emit('pos', {
			id: socket.ident,
			x: xx,
			y: yy
		});
	},100);
	
	socket.on('position', function(data) {
		xx = data.x;
		yy = data.y;
	});
	
	socket.on('disconnect', function() {
		console.log(socket.ident + " disconnected");
  });
});