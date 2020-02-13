var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('router block page');
})

router.get('/:name', function(req, res){
    var name =req.params.name;
    res.send(`this is a sub page and name : ${name}`);
})

module.exports=router;
