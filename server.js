var express = require('express');
var app = express();
var server = app.listen(8080);
app.use(express.static('public'));

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log('Connection d\'un client !');
    socket.emit('message', {content : "Vous êtes connectés au serveur ! ", importance: '1'});
    socket.on('message', function(message){
	console.log(message);
	socket.broadcast.emit('message', message);
    });
});

