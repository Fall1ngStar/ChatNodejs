var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    fs.readFile('./index.html', 'utf-8', function(error, content){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(content);
    });
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log('Connection d\'un client !');
    socket.emit('message', {content : "Vous êtes connectés au serveur ! ", importance: '1'});
    socket.on('message', function(message){
	console.log(message);
	socket.broadcast.emit('message', message);
    });
});

server.listen(8080);
