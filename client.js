var socket = io.connect('http://localhost:8080');

socket.on('message', function(message){
    alert('Le serveur a un message pour vous');
});

var pokeServer = function()
{
    socket.emit("message", "poke");
}
