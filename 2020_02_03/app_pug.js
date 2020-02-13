var express = require('express');
var app = express();
var fs = require('fs');
var path = require('querystring');
var bodyparser = require('body-parser');
var mqtt = require('mqtt');
var mysql = require('mysql');


app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.set('views', './views');

app.set('port', 3000);

var options = {
    //port: 8883,
    host: '192.168.64.25',
    protocol: 'mqtt',
    //username:"steve",
    //password:"password",
};

/*
app.get('/', function(req, res){
      res.render('template');
});
*/

app.get('/temperature', function(req,res){
    mysql_connection.query('SELECT DTime, temperature from tbsensor', function(err, rows) {
        if(err) throw err;
        //console.log('The solution is: ', rows);
        res.render('template', {queryData: rows, type: 'temperature'});
      });
});

app.get('/humidity', function(req, res){
    mysql_connection.query('SELECT DTime, humidity from tbsensor', function(err, rows) {
        if(err) throw err;
        //console.log('The solution is: ', rows);
        res.render('template', {queryData: rows, type: 'humidity'});
      });
})

app.get('/light', function(req, res){
    mysql_connection.query('SELECT DTime, Illumination from tbsensor', function(err, rows) {
        if(err) throw err;
        //console.log('The solution is: ', rows);
        res.render('template', {queryData: rows, type: 'light'});
      });
})

app.get(['/all', '/'], function(req, res){
    mysql_connection.query('SELECT * from tbsensor', function(err, rows) {
        if(err) throw err;
        console.log('The solution is: ', rows);
        res.render('template', {queryData: rows, type: 'all'});
      });
})

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
  
var client = mqtt.connect(options);

client.on("connect", () => {	
    console.log("connected "+ client.connected);
})

client.on('message', (topic, message, packet) => {
    //console.log(topic + ": " + message);
    //console.log("topic is "+ topic);
    //console.dir(message);
    arr = uint8arrayToStringMethod(message);
    //console.dir(arr);
    arr = arr.split(",");

    arr.forEach(element => {
        //console.log(element);
    });
    
});


function uint8arrayToStringMethod(myUint8Arr){
    return String.fromCharCode.apply(null, myUint8Arr);
 }

var topic="FA-0/All";
client.subscribe(topic);

var mysql_connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'ajoumysql123!',
//    port     : < port >,
    database : 'dbsensor'
  });
  
  //mysql_connection.connect();
  
  mysql_connection.query('SELECT * from tbsensor', function(err, rows, fields) {
    if (!err){
      //console.log('The solution is: ', rows);
      /*
        rows.forEach(function(element){
            console.dir(element);
        })
        */
    }
    else
      console.log('Error while performing Query.', err);
  });
  
  //mysql_connection.end();

var pub_options = {
    retain:true,
    qos:1
};

//client.publish("nodeJS", "test message", options)