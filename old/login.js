$(document).ready(function(){
    var user, passw;
    $("#submit").click(function(){
	console.log("Click !");
	user =  $("#pseudo").val();
	passw = $("#password").val();
	$.post("http://localhost:8080/login",{user: user}, function(data){
	    if(data==='done')
	    {
		window.location.href="/chat";
	    }
	});
    });
});
