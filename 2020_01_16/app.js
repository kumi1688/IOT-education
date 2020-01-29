var http = require('http');
var fs = require('fs');
var url =  require('url');
var qs = require('querystring');

function foundlist(filelist){
    var i=0;
    var list="<ol>";
    while(i<filelist.length){
      list=list+`<li><a href="?id=${filelist[i]}">${filelist[i]}</a></li>`
      i++;
    }
    list=list+"</ol>";
  return list;
}

function makeHTML(list, fileId, detail){
    var htmlfile = `<!doctype html>
          <html>
          <head>
            <title>WEB1 - Main</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h1><a href="/create">Add File</a></h1>
            <h2>${fileId}</h2>
            <p>${detail}</p>
          </body>
          </html>`;
          return htmlfile;
}

var app = http.createServer(function(request,response){
    var r_url = request.url;
    var queryData = url.parse(r_url,true).query;
    var pathname = url.parse(r_url,true).pathname;
    var fileId = queryData.id;
    if(pathname == '/'){
      if(fileId==undefined){
        fs.readdir('./data', function(err, filelist){
          var list=foundlist(filelist);
          var fileId="Home";
          var detail="Welcome";
          var htmlfile = makeHTML(list, fileId, detail);
          response.writeHead(200);
          response.end(htmlfile);
        });
      } 
      else{
        fs.readdir('./data', function(err, filelist){
          var list=foundlist(filelist);
          fs.readFile(`data/${fileId}`,'utf8', function (err, detail) {
            if (err) throw err;
            var htmlfile = makeHTML(list, fileId, detail);
          response.writeHead(200);
          response.end(htmlfile);
          });
        });
      } 
    } else if ( pathname == '/create'){
        fs.readdir('./data', function(err, filelist){
            var list=foundlist(filelist); 
            var detail = fs.readFileSync('./form/addform', 'utf8');
            var fileId = "Add File";
            var htmlfile = makeHTML(list, fileId, detail);
            response.writeHead(200);
            response.end(htmlfile);
            });
      } else if ( pathname == '/addfile'){
          var body="";
          request.on('data', function(data){
              body = body+data;
          })
          var poststr = qs.parse(body);
          request.on('end', function(){
              //var poststr = qs.parse(body);
              //console.dir(poststr);
              const data = new Uint8Array(Buffer.from(poststr.detail));
              fs.writeFileSync(`./data/${poststr.fileId}`, data, 'utf8');
          })
          response.writeHead(200);
          
          response.write("<a href='/'>back to main page</a><br>", 'utf8', null);
          response.end("post data send success");
      }
    else{
      response.writeHead(404);
      response.end("Path Not Found");
      return;
    }
    //console.log(__dirname + r_url);  
    //response.end(fs.readFileSync(__dirname + r_url));
});
app.listen(3000);