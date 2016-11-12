$(document).ready(function(){
  var user, passw;
  $("#submit").click(function(){
	console.log("Click !");
	user =  $("#username").val();
	passwd = $("#passwd").val();
	$.post("http://localhost:8080/login_post",{user: user, passwd: passwd}, function(data){
      console.log(data);
	    if(data==='done')
	    {
		      window.location.href="/chat";
	    }
	});
    });
});
