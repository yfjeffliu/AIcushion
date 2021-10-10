console.log("Reading Javascript.js......")
var param = ''
$(document).ready(function(){
     document.getElementById("pie_chart").style.display = "none";

     $('Warn').html("");
	var searchParams = new URLSearchParams(window.location.search)
	var param = searchParams.get('name')
     $.post('./date',{
	  name : param,
          ready : "OK",
     },(date,word) => {
	  //console.log(date)
	  //console.log(word)
	  for(var i=0; i<date.length; i++){
		$("#ajax_form [name=start_date]").append('<option>' +date[i]+ '</option>');
		$("#ajax_form [name=end_date]").append('<option>' +date[i]+' </option>');
	  }
     })

     $.post('./history_fig',{name:param,},(check_py_finished) => {
	  if(check_py_finished == "no result"){
		$('#Warn').html("Sorry! We can't find any result in the past week!")
 	  	document.getElementsByClassName("is-active")[0].style.display = "none";
	  }
	  else{
		  if (param != ''){
	  	//console.log(check_py_finished)
	  	setTimeout(updateImage('r'),300)}
	  //showfig()
	  }
     })

     setInterval(function test(){
	     //console.log("loop");
     	     updateImage('l');
     },20000);
	//setInterval(updateImage('l'),1000);

     $('#showfig').click((event)=>{
	event.preventDefault();
	document.getElementsByClassName("is-active")[0].style.display = "block";
	document.getElementById("pie_chart").style.display = "none";
	$('#Warn').html("");
	// Step 9 and step 10 code goes here
	$.post('./website', {
		// Get values which the backend requests
		start_date : $('#ajax_form [name=start_date]').val(),
		start_time : $('#ajax_form input[name=start_time]').val(),
		name : param,
		end_date : $('#ajax_form [name=end_date]').val(),
		end_time : $('#ajax_form [name=end_time]').val(),
		//fname: $('#ajax-form input[name=fname]').val(),
  		//lname: $('#ajax-form input[name=lname]').val(),
	}, (response_from_backend) => {
		//$('#ajax-output').html(response_from_backend)	// Print the response from backend on frontend
		if(response_from_backend == 'Invalid Value' || response_from_backend == 'Please enter an user'){
			alert(response_from_backend);
		}
		else if(response_from_backend == 'no result'){
			document.getElementsByClassName("is-active")[0].style.display = "none";
			$('#Warn').html("Sorry! We cannot find any result in the selected time interval");
		}
		else{
			//$('#figure').removeChild('<img src="imager.png">');
			//$('#figure').append('<img src="imager.png">');
			//$('#figure').append('<img src="pie_nonzero.png">');
			setTimeout(updateImage('r'),300)	
		//	showfig()
		}
	})
        // Step 11 code goes here
     })
})


//var newImage = new Image();
//newImage.src = "./pie_nonzero.png";
function updateImage(which_chart)
{
    	var newImage = new Image();
    	switch(which_chart){
	    case 'r':{
		console.log("update pie chart");
		newImage.src = "./pie_nonzero.png?time=" + new Date().getTime();
		document.getElementById("pie_chart").src = newImage.src;	
		document.getElementsByClassName("is-active")[0].style.display = "none";
		document.getElementById("pie_chart").style.display = "block";
		break;}

	    case 'l':{
		console.log("update pressure chart")
		newImage.src = "./imager.png?time=" + new Date().getTime();
		document.getElementById("pressure_chart").src = newImage.src;
		//$("#pressure_chart").load(newImage.src);
		break;}
	}
	//console.log("update completed")
}

/*
function showfig(){
	//window.location.replace('http://25.56.226.105:3000/pie_nonzero.png')
	updateImage()     
	document.getElementsByClassName("is-active")[0].style.display = "none"
	document.getElementById("pie_chart").style.display = "block";
	//$selectedname = $('#ajax_form [name=name]').val();
	//alert($selectedname);
	
	//time_json=JSON.stringify($selectedname);
	//console.log(time_json);
}*/
