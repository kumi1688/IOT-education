var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : 'ajoumysql123!',
    database : 'nodejs'
  });

connection.connect();

connection.query('select * from file', function(err, results, fields){
    if(err) throw err;
    results.forEach(element => {
        console.log(element);
    });
});
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();