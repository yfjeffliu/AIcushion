//Connection with MYSQL
var mysql = require('mysql'); 
var connect_pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost', 
	user: 'root', 
	password: 'capoo', 
	database: 'TEST',
});

//Create a web server
const express = require('express')
const app = express()
let { PythonShell } = require('python-shell')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const shell = require('shelljs')
app.use(express.static('dist'))

var over = 0;
var usr = '';
const { DateTime } = require("luxon");
console.log('Start from here')
//Search `DATE` in database and response back to frontend
var data=[]
var n
var today = new Date()
module.exports = class Figure {
	postdate(req, res, next){
		if (req.body.ready == "OK"){
		 update_pressure.unref()
		 connect_pool.getConnection(function(err,connection){
			if (err) throw err;
			 //console.log(req.body.name)
			 let user = req.body.name;
			 usr = user;
			 let command = 'SELECT DATE FROM ' + user + ' GROUP BY DATE ORDER BY DATE ASC' 
			 connection.query(command, function(err, results) {
	   		if (err) throw err; 
		for (i=0;i<results.length;i++){
			    //Oringinal: Tue Jul 27 2021 00:00:00 GMT+0800 (台北標準時間)
			    //ISOString: 2021-07-26T16:00:00.000Z
			    var isostring = results[i].DATE.toISOString();
			    var iso = DateTime.fromISO(isostring)
			    data[i] = iso.plus({hours: 8}).toISODate()
			}
		})
		connection.release();

		setTimeout(function(){
		    res.send(data)
		    //console.log(data)
		    update_pressure.ref()
		}, 280);
		 } )
		}}
/*		console.log('testclass');
		if (req.body.ready == "OK"){
			connect_pool.getConnection(function(err,connection){
				connection.query('SELECT DATE FROM data2 GROUP BY DATE ORDER BY DATE ASC', function(err, results) { 
					   if (err) throw err; 
		
					   console.log(results);	// typeof(results) = object
					   var x =JSON.stringify(results);		// typeof(x) = string
					   console.log(x);
				
					   console.log(x.length);
					   n = (x.length +1 -2)/36;
					   console.log(n);
					   for(var i=0; i<n; i++){
					   data[i] = x.slice(10+(36*i),20+(36*i));
					   }
				})
				   connection.release(); 
			   
				setTimeout(DE, 370);
				function DE(){
				   for(var i=0; i<n ; i++){
								res.write(data[i])
				   }
				   console.log(data);
				}
			})
		
			   setTimeout(myFunc, 2000);
				function myFunc(){
				 res.end();
					 console.log("respone end")
				}
		   }
		   console.log("END")
*/

	posthistoryfig(req,res,next){
		update_pressure.unref();
		var now = DateTime.fromISO(today.toISOString());
		var week_ago = now.plus({days: -7});
		var x = week_ago.toISODate();
		var u = now.toISODate();
		var y = req.body.name;
		usr = y;
		var z = week_ago.toFormat('TT');
	   	var w = now.toFormat('TT');
		over = 0
		check_input(y,x,z,u,w);
	   	const loop = setInterval(function(){
		    if(over == 1)
	  	    {
			if(result.length == 0){
			//    console.log("no result")
			    res.send("no result")
			}
			else{
		    let spawn = require("child_process").spawn;
				console.log('2')
		 let process2 = spawn('python' , [
	  		"./front/pie.py",result,])
		    process2.stderr.on("data", data => {
    			console.error(`stderr: ${data}`);
		    });
		    process2.stdout.on('data', (data) => {
  			//console.log(`stdout: ${data}`);
			console.log('python is finished');
			res.send('python is finished');
		    });
		}
		clearInterval(loop)
  	    	update_pressure.ref()
	    }
  	    //else{console.log("over=0")}
	},300)
	}

	postwebsite(req,res,next){
	var x = req.body.start_date;
	var u = req.body.end_date;
	var y = req.body.name;
	var z = req.body.start_time;
	var w = req.body.end_time;
	usr = y;
	/*console.log(x);
	console.log(u); 
	console.log(y);
	console.log(z);
	console.log(w);*/

  if (x.length == 0 || u.length == 0){
	res.send("Invalid Value");
  }
  else if (y.length == 0){
	res.send("Please enter an user");
  }
  else{
  	over = 0;
  	check_input(y,x,z,u,w);

  	const loop = setInterval(function(){
	   if(over == 1)
  	   {
  		if(result.length == 0){
			//console.log("no result");
			res.send("no result");
		}
		else{
			let spawn = require("child_process").spawn;
  		/*let process1 = spawn('python' , [
	  		"./testimg.py",
  		]);
		//process1.stdout.on("data", data => {
    		//	console.log(`stdout: ${data}`);
		//});*/
  		
			let process2 = spawn('python' , [
	  			"./front/pie.py",result,
  			]);
		
			process2.stderr.on("data", data => {
    				//console.error(`stderr: ${data}`);
			});
			process2.stdout.on("data", data => {
				//console.log(`stdout: ${data}`);
				res.send("Python is completed");
			});
		}
		clearInterval(loop)
  	   }
      	},300)
  }
		
/*		console.log('I am here');
		let x = req.body.start_date;
		let u = req.body.end_date;
		let y = req.body.name;
		let z = req.body.start_time;
		let w = req.body.end_time;
		console.log(x);
		console.log(u); 
		console.log(y);
		console.log(z);
		console.log(w);

		if (x.length == 0 || u.length == 0){
			console.log("NULL");
			res.send('Invalid Value');
		}
		else{
			shell.exec('pwd')
			console.log('OK_0');
			let spawn = require("child_process").spawn;
			let process1 = spawn('python' , [
				"./front/testimg.py",
			]);
			console.log('OK_1');

			let process2 = spawn('python' , [
				"./front/pie.py",y,x,z,u,w,
			]);
			console.log('OK_2');
			
			res.send('HELLO'+y);
		}
*/
		}

}


Date.prototype.addDays = function day_shift(days) {
    this.setDate(this.getDate() + days);
	
    if ((this.getMonth()+1)<10){
	if(this.getDate()<10){
	    start_date = this.getFullYear()+'-0'+(this.getMonth()+1)+'-0'+this.getDate();
	}
	else{
	    start_date = this.getFullYear()+'-0'+(this.getMonth()+1)+'-'+this.getDate();
	}
    }
    else{
	if(this.getDate()<10){
	    start_date = this.getFullYear()+'-'+(this.getMonth()+1)+'-0'+this.getDate();
	}
	else{
	    start_date = this.getFullYear()+'-'+(this.getMonth()+1)+'-'+this.getDate();
	}
    }
    return start_date;
}


var result = []
var sql_result	= []

function check_input(name, start_date, start_time, end_date, end_time){
    result = 0;
    sql_result = [];
    //console.log(result);
    //console.log('check');
    var sd = new Date(start_date);
    var ed = new Date(end_date);
    var date_interval = (ed.getTime() - sd.getTime())/((1000 * 60 * 60 * 24));
    //console.log("Search for "+ date_interval+" days");

    if(date_interval<0){
        console.log("你的時間是倒著來的嗎?")
    }

    else if(date_interval==0){
	//console.log("else if part");
   	connect_pool.getConnection(function(err,connection){
	// 新增資料SQL語法
            var command = "SELECT `result` FROM "+name+" where `DATE`='"+start_date+"' and TIME between '"+start_time+"' and '"+end_time+"'"
	    //console.log(command)
	    result = sqql(command,connection,0);
	    setTimeout(function chk(){
	    //	console.log(result);
	    	//console.log("result length: "+result.length);
	    },280)
	    connection.release();        
	    over = 1;
     	})
    }

    else{
	console.log("else part")
	//while (date_interval>=0){
	   // console.log("in while loop");
	    //if (date_interval == t) {
  		   // console.log("case t");
	connect_pool.getConnection(function(err,connection){
            command = "SELECT `result` FROM "+name+" where `DATE`='"+start_date+"' and TIME between '"+start_time+"' and '23:59:59'";
	    //console.log(command);
            result = sqql(command,connection,0);
	    setTimeout(function(){
	    	//console.log(result);
		//console.log("result length: "+result.length);
		
		date_interval = date_interval -1;
	    	//console.log(date_interval+" days last");
		start_date = sd.addDays(1);
	    },280)
	    connection.release();
	})
	
	setTimeout(function(){
  	    //console.log("in the second function:")
	    const set_interval = setInterval(function(){
		//console.log("In setInterval...")
		if (date_interval == 0){
		    //console.log("YES")
		    clearInterval(set_interval)
		}
		else{
		    //console.log("NO")
		    connect_pool.getConnection(function(err, connection){
		    	command = "SELECT `result` FROM "+name+" where `DATE`='"+start_date+"'"
		    	//console.log(command)
		    	result = sqql(command, connection, result.length)
		    	setTimeout(function chk(){
			  //  console.log(result);
			//console.log("result length: "+result.length);
			
			    date_interval = date_interval -1
			    //console.log(date_interval+" days last");
			    start_date = sd.addDays(1);
		    	},280)
		    	connection.release();
		    })
		}
	    }, 350)

	    const last_run = setInterval(function(){
	   	if (date_interval == 0){
		    clearInterval(set_interval)
		    //console.log("The last day")
		    connect_pool.getConnection(function(err,connection){
	    	    	command = "SELECT `result` FROM "+name+" where `DATE`='"+start_date+"' and TIME between '00:00:00' and '"+end_time+"'"
		    	//console.log(command)
	 	    	result = sqql(command, connection, result.length)
		    	setTimeout(function chk(){
			    //console.log(result);
			    //console.log("result length: "+result.length);
		    	    clearInterval(last_run)
			    over = 1;
			},280)	
		    connection.release();
		    })
		}
	    }, 300)
       },1000)
   }
}

function sqql(command,connection,pre_length){
	connection.query(command, function(err, results) { 
		if (err) throw err; 
		//console.log(results);	// sql results
			
		var i=0;
		while (i<results.length){
		    sql_result[pre_length+i] = results[i].result;
		    i++;
		}
	})
	return sql_result;
}

var point_pressure = []
const update_pressure = setInterval(function python1(){
  connect_pool.getConnection(function(err,connection){
	if(usr != ''){
  	command = "SELECT * FROM `current` where user='" + usr + "'"
	//console.log(command)
	connection.query(command, function(err,results){
		if (err) throw err;
		//console.log(results);
		if(results != []){
		point_pressure[0] = results[0].a;
		point_pressure[1] = results[0].b;
		point_pressure[2] = results[0].c;
		point_pressure[3] = results[0].d;
		point_pressure[4] = results[0].e;
		point_pressure[5] = results[0].f;
		point_pressure[6] = results[0].g;
		point_pressure[7] = results[0].h;
		point_pressure[8] = results[0].i;
		point_pressure[9] = results[0].result;
		//console.log(point_pressure);
		}
	})
	setTimeout(function chk(){
	  let spawn = require("child_process").spawn;
	  let process1 = spawn('python' , [
		"./front/pressure.py", point_pressure
	  ]);
	  process1.stderr.on("data", data => {
		 // console.error(`stderr: ${data}`);
	  });
	  process1.stdout.on("data", data => {
		 // console.log(`stdout: ${data}`);
	  });
	  connection.release();
	},200)
  }})
},20000)



//node.js 的檔案系統，能夠幫助存取、讀取檔案
var fs = require('fs');

//真實用戶ID 必然是隨機生成且不重複的，這邊我先用手動強制規定的方式生成
var newUser = {
    "id": 3,
    "points": 0,
    "erc": 0,
    "cards": "none"
}


var userJSON = require('./time.json');

for(var i = 0; i < userJSON.userInfo.length; i++) {
	if(userJSON.userInfo[i].id == 1){
		//console.log(userJSON.userInfo[i].points);
	}
}

