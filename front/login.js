var nam
function sendreq2(){
        var account=document.getElementById("acc");
        var email=document.getElementById("email");
        var passwd=document.getElementById("passwd");

        var settings = {
          "url": "/login",
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "email": email.value,
            "password": passwd.value
          }
        };

        $.ajax(settings).done(function (response) {
          alert(response.result.status +"\n"+response.result.loginMember );
	console.log(response.result.sta)
		if (response.result.sta == "success"){
        nam = response.result.name
		console.log(nam)
		gotowebsite();}
	
        });
}
function gotowebsite(){
  window.location.href = "./website.html?name=" + nam;
}
