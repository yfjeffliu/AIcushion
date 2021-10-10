<!DOCTYPE html>
<html>
   <meta charset="UTF-8">
   <script src="./node_modules/jquery/dist/jquery.js"></script>
   <script src="./Javascript.js"></script>
   <body>

      <!--<form action="./test" method="get">
	      <input type = "text" name"usr">
		<button type="submit">submit via get</button>
      </form>-->

	<!--<form id="ajax-form">
  		first name: <input type="text" name="fname"><br>
  		last name: <input type="text" name="lname"><br>
  		<button type="submit">submit via ajax</button>
	</form>-->
<div id="ajax-output"></div>

	<form id="ajax_form">
	   <div class="Username">
		 User name: <input type="text" name="name"> <br>
	   </div>
	   <div class="time_interval">
	 	<select id="time_s " name ="start_date">
	      	   <option value="Choose time" selected disabled>--Choose time--</option>
			<?php
				// Connection with database
				$db = mysqli_connect('localhost','root','capoo','TEST');
				if(!$db)
				{
			   		die("Connection failed: " . mysqli_connect_error());
				}
				// Fetch data from database and display in drop down list
        			$sql = "SELECT TIME FROM data2";	   
			   	$records = mysqli_query($db, $sql);
			   	while ($row = mysqli_fetch_array($records))
        			{
			   		echo '<option>' . $row . "</option>"
			   		//echo "<option value='?'>" .  YES . "</option>";
			   		//echo "<option>" . $row['TIME'] . "</option>";  // displaying data in option menu
				   
						      };
				}
				mysqli_close($db);
    			?>
	      			<!--<option value="2021-07-12" selected >20210712</option>
	      			<option value="dog" disabled >DOG</option>
	      			<option value="2021-07-13" >20210713</option>
				<option value="2021-07-16">20210716</option>-->
	 		</select>
			選擇開始時間：<input type="time" name="start_time" value="08:00:00"> <br>

			<select id="time_e" name="end_date">
				<option value="Choose time" disabled > Choose time. </option>
				<option value="2021-07-12" selected > 20210712 </option>
				<option value="2021-07-13"> 20210713 </option>
				<option value="2021-07-16"> 20210716 </option>
			</select>
			選擇結束時間：<input type="time" name="end_time" value="12:00:00">
	 	</div>
         	<div class="radio">
		 	<button id=showfig type="summit"> Let me see see~</button>
      	 	</div>
      	</form>

      <div id="figure">
	      <img src="imager.png">
	      <!--<img src="pie.png">-->
      	      <img src="pie_nonzero.png">
      </div>

   </body>
</html>
