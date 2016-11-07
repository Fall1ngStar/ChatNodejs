var express = require('express');
var app = express();
var server = app.listen(8080);
app.use(express.static('public'));

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log('Un client vient de se connecter');
});
