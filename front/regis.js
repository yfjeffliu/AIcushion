function sendreq1(){
        var account=document.getElementById("acc");
        var email=document.getElementById("email");
        var passwd=document.getElementById("passwd");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/register', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                // Request finished. Do processing here.
        }
        }
        let str="name="+account.value+"&email="+email.value+"&password="+passwd.value
        console.log(str)


        xhr.send(str);
        }
function sendreq2(){
        var account=document.getElementById("acc");
        var email=document.getElementById("email");
        var passwd=document.getElementById("passwd");

        var settings = {
          "url": "/register",
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "name": account.value,
            "email": email.value,
            "password": passwd.value
          }
        };

        $.ajax(settings).done(function (response) {
          alert(response.result.status);
	        jumptologin(email.value,passwd.value);
          window.location.href = './website.html';
        });
	
}
function jumptologin(email,passwd){
	 var settings = {
          "url": "/login",
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "email": email,
            "password": passwd
          }
        };

        $.ajax(settings).done(function (response) {
          alert(response.result.status +"\n"+response.result.loginMember );
          console.log(response.result.sta)
                if (response.result.sta == "success"){
        nam = response.result.name
                console.log(nam)
                gotowebsite();
}

        });
}
function gotowebsite(){
  window.location.href = "./website.html?name=" + nam;
}

	




