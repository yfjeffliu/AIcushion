$(document).ready(function(){
     document.getElementById("figure").style.display = "none";
     document.getElementById("showfig").addEventListener("click", function() {
 	     document.getElementById("figure").style.display= "block";     
	     $selectname = $('#pets').val();
	     alert($selectname);
     
     });
	
     console.log('Step1')
     console.log('Step2')
})



