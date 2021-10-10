
var mysql = require('mysql');
var connection = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'capoo',
        database: 'TEST',
});
var  addSql = 'INSERT INTO data2 (user,DATE,TIME,a,b,c,d,e,f,g,h,i,result) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
var usr = '';
var express = require("express");
module.exports = class Data{
	
 	savedata(req,res,next){
	/*console.log(req.body.user);
        console.log(req.body.a);
        console.log(req.body.b);
        console.log(req.body.c);
        console.log(req.body.d);
        console.log(req.body.e);
        console.log(req.body.f);
        console.log(req.body.g);
        console.log(req.body.h);
        console.log(req.body.i);*/
        addSql = "INSERT INTO "+req.body.user +" (DATE,TIME,result) VALUES(?,?,?)";
        var  addSqlParams = [req.body.date,req.body.time,req.body.result ];
	connection.query(addSql,addSqlParams,function (err, result) {if(err) throw err;});
	
		
	//console.log('test')
        addSql = 'UPDATE current SET';
        addSql=addSql+' a='+req.body.a+', b='+req.body.b+', c='+req.body.c+', d='+req.body.d+', e='+req.body.e+', f='+req.body.f+', g='+req.body.g+', h='+req.body.h+', i='+req.body.i+", DATE='"+req.body.date+"', TIME="+req.body.time +', result=' + req.body.result;
        addSql=addSql+" where user='" + req.body.user + "';"
        connection.query(addSql, function (error, results, fields) {
                if (error) throw error;
        });
        res.send('good');
	}
	readdata(req,res,next){
	usr = req.body.user;
	if (usr!=''){
		var resp = {'result':0};
		let command = "SELECT * FROM `current` where user='" + usr + "';";
//		console.log('test')
//		console.log(command);
	        connection.query(command, function(err,results){
			if (err) throw err;
			if(results != []){
				resp.result = results[0].result;
				//console.log(resp);
				res.send(resp)
			}
		})
		//console.log(result)
		//res.send('result is '+result);
	}
	}

}

