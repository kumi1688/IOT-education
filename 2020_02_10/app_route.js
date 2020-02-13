var express = require('express');
var app = express();
var blocks = require('./routes/block');
var mains = require('./routes/main');
var logins = require('./routes/login');

app.use('/block', blocks);
app.use('/main', mains);
app.use('/login', logins);

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res){
    res.send("this is a home page");
})

app.listen(3000, function(req, res){
    console.log('server is running');
})