var express = require('express');
var http = require('http');
var path = require('path');

var bodyParser = require('body-parser');
var static = require('serve-static');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use('/', static(path.join(__dirname, '/public')));

app.use(function(req, res, next){
    console.log('첫번재 미들웨어에서 요청을 처리함');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'content-type':'text/html;charset=utf-8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다</h1>');
    res.write('<div><p>param id : ' + paramId +  ' </p></div>');
    res.write('<div><p>param password : ' + paramPassword +  ' </p></div>');
    res.end();
});

app.listen(3000, () => {
    `EXAMPLE APP LISTENING ON PORT ${3000}!`
});