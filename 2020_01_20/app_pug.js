var express = require('express');
var app = express();
const port = 3000;
var fs = require('fs');
var path = require('querystring');
var bodyparser = require('body-parser');
const htmlfunction = require('./views/htmlFunction');


app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.set('views', './views');

var currentId;
        
app.get('/', function(req, res){
    fs.readdir('./data', function(err, filelist){
      var list = htmlfunction.foundlist(filelist);
      var fileId = "Home";
      var detail = "Welcome";
      currentId = fileId;
      res.render('template', {list: filelist, fileId : fileId, detail: detail, type: "main"});
    });
});

app.get('/page/:pageId', function(req, res){
    var fileId = req.params.pageId;
    fs.readdir('./data', function(err, filelist){
        var list= htmlfunction.foundlist(filelist);
        currentId = fileId;
        fs.readFile(`./data/${fileId}`,'utf8', function (err, detail) {
            if (err) throw err;
            res.render('template', {list: filelist, fileId : fileId, detail: detail, type: "update"});
          });
    });
});

app.get('/addFile', function(req, res){
    fs.readdir('./data', function(err, filelist){
        var list= htmlfunction.foundlist(filelist);
        if(currentId == "Home"){
            res.render('template', {list: filelist, fileId: currentId, detail: "Welcome", type: "addFile"});
        }else{
            fs.readFile(`./data/${currentId}`,'utf8', function (err, detail) {
                if (err) throw err;
                res.render('template', {list: filelist, fileId : currentId, detail: detail, type: "addFile"});
              });    
        }
    });
});

app.post('/update', function(req, res){
    var fileId = req.body.fileId;
    var detail = req.body.detail;
    console.dir(req.body);

    fs.unlink(`./data/${fileId}`, (err) => {
        if (err) throw err;
      });
    
      const data = new Uint8Array(Buffer.from(detail));
      fs.writeFile(`./data/${fileId}`, data, 'utf8', (err) => {
        if(err) throw err;
    });

    res.redirect(`/page/${fileId}`);
});

app.post('/delete', function(req, res){
    var fileId = req.body.fileId;
    fs.unlink(`./data/${fileId}`, (err) => {
        if(err) throw err;
    });
    res.redirect('/');
    
})

app.post('/form_data', function(req, res){
    var fileId = req.body.fileId;
    var detail = req.body.detail;

    const data = new Uint8Array(Buffer.from(detail));
    //fs.writeFileSync(`./data/${fileId}`, data, 'utf8');
    fs.writeFile(`./data/${fileId}`, data, 'utf8', (err) => {
        if(err) throw err;
    });

    res.redirect(`/page/${fileId}`);
});

app.listen(port, () => {
    `EXAMPLE APP LISTENING ON PORT ${port}!`
});