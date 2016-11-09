var express = require('express');
var session = require('express-session');

var app = express();
var server = app.listen(8080, function(){
    console.log("Server started on port 8080");
});

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(session({secret: 'ssshhhhh'}));

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log('Connection d\'un client !');
    socket.emit('message', {content : "Vous êtes connectés au serveur ! ", importance: '1'});
    socket.on('message', function(message){
	console.log(message);
	socket.broadcast.emit('message', message);
    });
});

var sess;

app.get('/', function(req, res){
    sess = req.session;
    if(sess.user){
	res.redirect("/chat");
    } else {
	res.render('index.pug', {});
    }
});

app.get('/chat', function(req, res){
    res.render('chat.pug');
});
