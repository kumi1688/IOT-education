var express = require('express');
var app = express();
const port = 3000;
var fs = require('fs');
var path = require('querystring');
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(req, res){
    res.render('template', {text : "template engine", date : Date()});
});

app.listen(port, () => {
    `EXAMPLE APP LISTENING ON PORT ${port}!`
});