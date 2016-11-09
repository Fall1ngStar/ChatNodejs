var socket = io.connect('http://localhost:8080');

var user = prompt("Entrer votre nom d'utilisateur");


socket.on('message', function(message){
    console.log("Reception d'un message");
    var histo = document.getElementById("messages");
    histo.innerHTML = "<p>"+message['date']+" <strong>"+message['user']+"</strong> : "+message["message"] +"</p>" + histo.innerHTML;
});


var sendMessage = function()
{
    var text = document.getElementById("msg").value;
    var now = new Date();
    var timestamp = '[' + now.getHours() + ':' + now.getMinutes() + ']';
    socket.emit("message", {"user": user, "message": text, "date": timestamp});
    var histo = document.getElementById("messages");
    histo.innerHTML = "<p>"+timestamp+" <strong>"+user+"</strong> : "+text+"</p>" + histo.innerHTML;
    document.getElementById("msg").value = '';
}
