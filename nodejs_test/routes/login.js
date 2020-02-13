var express = require('express');
var router = express.Router();
var login_db = require('../db/login_db');

router.get('/', function(req, res){
    res.render('login', {authInfo: {loginStatus: false}});
});

router.post('/check', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    login_db.check(req, res, username, password);
});

module.exports = router;