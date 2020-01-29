const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const htmlfunction = require('./modules/htmlFunction');
const qs = require('querystring');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    fs.readdir('./data', function(err, filelist){
        var list= htmlfunction.foundlist(filelist);
        var fileId="Home";
        var detail="Welcome";
        var htmlfile = htmlfunction.makeHTML(list, fileId, detail, req.path);
        res.send(htmlfile);
    });
});

app.get('/page/:pageId', function(req, res){
    var fileId = path.parse(req.params.pageId).base;
    fs.readdir('./data', function(err, filelist){
        
        var list= htmlfunction.foundlist(filelist);
        fs.readFile(`data/${fileId}`,'utf8', function (err, detail) {
            if (err) throw err;
            var htmlfile = htmlfunction.makeHTML(list, fileId, detail, req.path);
            res.send(htmlfile);
          });

    });
});

app.get('/create', function(req, res){
    fs.readdir('./data', function(err, filelist){
        var list= htmlfunction.foundlist(filelist); 
        var detail = fs.readFileSync('./form/addform', 'utf8');
        var fileId = "Add File";
        var htmlfile = htmlfunction.makeHTML(list, fileId, detail, req.path);
        res.send(htmlfile);
        });
});

app.post('/addfile', function(req, res){
          //console.log(req.body);
          var body = req.body;
          //console.dir(body);
          var fileId = req.body.fileId;
          var detail = req.body.detail;
          
          const data = new Uint8Array(Buffer.from(detail));
          fs.writeFileSync(`./data/${fileId}`, data, 'utf8');

          res.redirect('/');
});

app.post(`/delete/:fileId`, function(req, res){
  var fileId = req.body.fileId;
  
  fs.unlink(`./data/${fileId}`, (err) => {
    if (err) throw err;
    console.log(`${fileId} was deleted`);
  });
  res.redirect('/');
});

app.post('/update', function(req, res){
  
  var fileId = req.body.fileId;
  var detail = req.body.detail;

  fs.unlink(`./data/${fileId}`, (err) => {
    if (err) throw err;
    console.log(`${fileId} was deleted`);
  });

  const data = new Uint8Array(Buffer.from(detail));
          fs.writeFileSync(`./data/${fileId}`, data, 'utf8');
  res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));