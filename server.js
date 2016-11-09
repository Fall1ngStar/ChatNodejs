var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var server = app.listen(8080, function(){
    console.log("Server started on port 8080");
});

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var io = require('socket.io').listen(server);

var sendUser;
var lastUserConnection;

io.sockets.on('connection', function(socket){
    console.log('Connection d\'un client !');
    socket.on('message', function(message){
	console.log(message);
	socket.broadcast.emit('message', message);
    });
    socket.on('connectionAttempt',function(){
	socket.emit('userDefine', lastUserConnection);
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
    sess = req.session;
    if(sess.user){
	lastUserConnection = sess.user;
	res.render('chat.pug');
    } else {
	res.redirect('/');
    }
});

app.get('/logout', function(req, res){
    req.session.destroy(function(err){
	if(err){
	    console.log(err);
	} else {
	    res.redirect('/');
	}
    });
});

app.post('/login', function(req, res){
    sess = req.session;
    sess.user = req.body.user;
    res.end('done');
});
