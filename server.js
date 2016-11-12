var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
var server = app.listen(8080, function(){
    console.log("Server started on port 8080");
});

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(session({secret: 'ssshhhhh', resave:true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var io = require('socket.io').listen(server);

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

var connection = mysql.createConnection({
  host  :'localhost',
  user  :'root',
  password :'root',
  database :'chat'
});

connection.connect();

var loginToChat = function(user, passwd, callback)
{
  console.log(request);
  connection.query(request, function(err, rows, cols){
    try {
    if(rows[0].user_name === user){
      if(rows[0].user_passwd === passwd){
        console.log("Successfully logged :D !");
        callback(user);
      } else {
        console.log("Wrong password !");
      }
    } else {
      console.log("Username not found !")
    }} catch(err)
    {
      console.log(err);
    }
  });
}

var sess;

app.get('/', function(req, res){
    sess = req.session;
    if(sess.user){
	res.redirect("/chat");
    } else {
	res.render('index.pug');
    }
});

app.get('/chat', function(req, res){
    sess = req.session;
    console.log("dans /chat :" + sess.user);
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

app.get("/login2", function(req, res){
  res.render("login.pug");
})

app.post("/login_post", function(req, res){
  sess = req.session;
    var user = req.body.user;
    var passwd = req.body.passwd;
    loginToChat(user, passwd, function(user){
      sess.user = user;
      console.log(sess.user);
      res.end("done");
    });
});

app.get('/scripts/chat.js', function(req, res){
    res.redirect("/");
});
app.get('/scripts/login.js', function(req, res){
    res.redirect("/");
});

app.post('/login', function(req, res){
    sess = req.session;
    sess.user = req.body.user;
    res.end('done');
});

app.get(function(req, res){
    redirect("/");
});
