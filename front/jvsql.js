var mysql = require('mysql'); 

var con = mysql.createConnection({ 
	host: 'localhost', 
	user: 'root', 
	password: 'capoo', 
	database: 'TEST'
}); 

con.connect(function(err){
	if (err) throw err;
	con.query('SELECT DATE FROM data2 GROUP BY DATE ORDER BY DATE ASC', function(err, results) { 
		if (err) throw err; 

		console.log(results);	// typeof(results) = object
		var x =JSON.stringify(results);		// typeof(x) = string
		console.log(x);
		
		console.log(x.length);
		var n = (x.length +1 -2)/36;
		console.log(n);
		for( var i=0; i<n; i++){
			console.log(x.slice(10+(36*i),20+(36*i)));
		}
	})
})

