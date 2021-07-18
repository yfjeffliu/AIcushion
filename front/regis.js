function sendreq(){
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
	*/console.log("sendrwq")
	xhr.send("name="+account+"&email"+email+"&password="+passwd);
}


