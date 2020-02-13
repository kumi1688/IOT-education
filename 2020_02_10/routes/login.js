var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('login', {userid : 'kumi1688', username : 'kang sung hwan'});
})

router.get('/:name', function(req, res){
    var name =req.params.name;
    res.send(`this is a login page and name : ${name}`);
})

module.exports=router;