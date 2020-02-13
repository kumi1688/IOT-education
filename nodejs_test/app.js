var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cookie = require('cookie');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var router_login = require('./routes/login');
var router_register = require('./routes/register');
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyparser.urlencoded({extended:true}));
app.use('/login', router_login);
app.use('/register', router_register);
app.use(session({
    store: new FileStore({}),
    secret: 'secret key',
    resave: false,
    saveUninitialized: true
  }))

app.get('/logout', function(req, res){
   res.clearCookie('username');
   res.clearCookie('password');
   res.redirect('/');
});

app.get('/', function(req, res){
    var loginStatus = false;
    console.log(req.session);
    if(req.session.num == undefined){
        req.session.num = 1;
    }else{
        req.session.num += 1;
    }
    res.send(`${req.session.num} 번째 방문입니다`);
    /*
    if(req.headers.cookie != undefined){
        cookies = cookie.parse(req.headers.cookie);
        loginStatus = true;
        console.log(cookies);
        var authInfo = {loginStatus: loginStatus, username: `${cookies.username}`};
        res.render('main', {authInfo: authInfo});
    }
    else{
        var authInfo = {loginStatus: false, username: null}
        res.render('main', {authInfo: authInfo});
    }
    */
});

app.listen(port, function(req, res){
    console.log(`Server is running on ${port}`);
})