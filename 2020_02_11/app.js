var http = require('http');
var cookie = require('cookie');

http.createServer(function(req, res){
    //console.log(req.headers.cookie);
    
    var cookies = [];
    if(req.headers.cookie != undefined){
        cookies = cookie.parse(req.headers.cookie);
        console.log(cookies);
    }

    
    res.writeHead(200, {
         'Set-Cookie' : ['yummy_cookie=choco', 'tasty_cookie=strawberry',
                        `Permanent=cookies; Max-Age=${60*60*24}`, 'secure_cookie = secure_cookie; Secure',
                    'http_cookie = http_cookie; HttpOnly']
     });
    
    res.end('create cookie sample');
}).listen(3000);