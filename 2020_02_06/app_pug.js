var express = require('express');
var app = express();
var mysql = require('mysql');
const port = 3000;
var fs = require('fs');
var moment = require('moment');
var path = require('querystring');
var bodyparser = require('body-parser');

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.set('views', './views');

db = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : 'ajoumysql123!',
    database : 'nodejs'
});

db.connect();

var currentId;
var currentFileList;
        
app.get('/', function(req, res){
    currentId = "Home";
    db.query('select * from file', function(err, results, fields){
        if(err) throw err;
        currentFileList = results;

        var home = {
            fileId : "Home",
            detail : "Welcome"
        };
        
        res.render('template', {list: results, data: home, type: "main"});    
    });
});

app.get('/page/:pageId', function(req, res){
    var id = req.params.pageId;
    db.query('select * from file', function(err, results){
        currentFileList = results;
        db.query(`select * from file where id = ?`, [id], function(err, results, fields){
            if(err) throw err;
            res.render('template', {list: currentFileList, data: results[0], type: 'readFile'}); 
        });
    });
});

app.get('/addFile', function(req, res){
    if(currentId == "Home"){
        res.render('template', {list: currentFileList, data: {fileId: "Home", detail: "Welcome"}, type: "addFile"});
    }else{
        db.query(`select * from file where id = ${currentId}`, function(err, results, fields){
            if(err) throw err;
            res.render('template', {list: currentFileList, data: results[0], type: "addFile"});    
        })   
    }
});

app.post('/update', function(req, res){
    var id = req.body.id;
    var detail = req.body.detail;

    db.query(`update file set detail = ? where id=?`, [detail, id], function(err, results){
        if(err) throw err;
        var date = moment().format('YYYY-MM-DD HH:mm:ss');
        db.query(`update file set updated = ? where id=?`, [date, id]);
        res.redirect(`/page/${id}`);    
    });
});

app.post('/showUpdateForm', function(req,res){
    var id = req.body.id;
    var detail = req.body.detail;
    res.render('template', {list: currentFileList, data: {id:id, detail: detail}, type: 'update'});
})

app.post('/delete', function(req, res){
    var id = req.body.id;
    db.query(`delete from file where id=${id}`, function(err, results, fields){
        if(err) throw err;
    })
    res.redirect('/');
});

app.post('/form_data', function(req, res){
    var fileId = req.body.fileId;
    var detail = req.body.detail;
    var user = req.body.user;
    
    var date = moment().format('YYYY-MM-DD HH:mm:ss');

    db.query(`insert into file (fileId, detail, created, updated, user) 
    values ( ?, ?, ?, ?, ?)`, [fileId, detail, date, date, user], function(err, results){
        if(err) throw err;    
    
        res.redirect(`/page/${results.insertId}`);
    });
});

app.listen(port, () => {
    `EXAMPLE APP LISTENING ON PORT ${port}!`
});