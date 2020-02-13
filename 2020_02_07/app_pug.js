var express = require('express');

const port = 3000;
var bodyparser = require('body-parser');
var db = require('./mylib/db');
var clist = require('./mylib/clist');
var functionList = require('./mylib/filelist');
var app = express();

//app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'pug');
app.set('views', './views');

db.connect();
       
app.get('/', function(req, res){
    functionList.getMainPage(req, res);
});


app.get('/page/:pageId', function(req, res){
   functionList.getPageContent(req, res);
});

app.get('/addFile', function(req, res){
    functionList.addFile(req, res);
});

app.post('/update', function(req, res){
  functionList.updateDB(req, res);
});

app.post('/showUpdateForm', function(req,res){
    functionList.showUpdateForm(req, res);
});

app.post('/delete', function(req, res){
    functionList.deleteFromDB(req, res); 
});

app.post('/form_data', function(req, res){
    functionList.insertIntoDB(req, res);
});

app.get('/category/show', function(req, res){
    clist.getCategory(req, res);
})

app.post('/category/showUpdateForm', function(req, res){
    clist.showUpdateForm(req, res);
})

app.post('/category/update', function(req, res){
    clist.updateCategory(req, res);
})

app.post('/category/insert', function(req, res){
    clist.insertCategory(req, res);
})

app.post('/category/delete', function(req, res){
    clist.deleteCategory(req, res);
})



app.listen(port, () => {
    `EXAMPLE APP LISTENING ON PORT ${port}!`
});