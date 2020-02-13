var express = require('express');
var router = express.Router();
var register_db = require('../db/register_db')

router.get('/', function(req, res){
    res.render('register', {authInfo: {loginStatus : false}});
});

router.post('/register', function(req, res, next){
    var data = req.body;
    if(data.username == ''){
        res.render('failure', {name: '회원가입', error: '아이디는 반드시 입력해야 합니다'});
    } else if(data.password == ''){
        res.render('failure', {name: '회원가입', error: '비밀번호는 반드시 입력해야 합니다'});
    } else if ( isNaN(data.age) == true ) {
        res.render('failure', {name: '회원가입', error: '나이는 숫자로 입력해야 합니다'});
    }
    else register_db.register(req, res, data);
})


module.exports = router;