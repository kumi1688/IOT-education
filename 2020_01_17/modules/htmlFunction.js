const foundlist = (filelist) => {
    var i=0;
    var list="<ol>";
    while(i<filelist.length){
      list=list+`<li><a href="/page/${filelist[i]}">${filelist[i]}</a></li>`
      i++;
    }
    list=list+"</ol>";
  return list;
}

const makeHTML = (list, fileId, detail, path) => {
          var create = `<h1><a href="/create">Add File</a></h1>`;
          var delet = `<form method="post" action="http://localhost:3000/delete">
              
              <input name="fileId" value=${fileId} hidden>
              <button type="submit">삭제</button>
              </form>`
            
        
            //var update = `<h1><a href="/update">Update File</a></h1>`;
            var update = `
            <form method="post" action="http://localhost:3000/update">
              <input name="fileId" value=${fileId} hidden>
              <textarea name="detail" placeholder="업데이트 값 입력"></textarea>
              <button type="submit">업데이트</button>
              </form>
            `
            var isCreate = false;
            var isDelete = false;
            var isUpdate = false;

    if(path == '/'){
      isCreate = true;
    } 
    if ( path.indexOf('page') != -1 ) {
      isDelete = true;
      isUpdate = true;
    } 
          
            
    var htmlfile = `<!doctype html>
          <html>
          <head>
            <title>WEB1 - Main</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${isCreate ? create : ""}
            ${isDelete ? delet : ""}
            ${isUpdate ? update : ""}
            <h2>${fileId}</h2>
            <p>${detail}</p>
          </body>
          </html>`;
          return htmlfile;
}

const addFile = () => {
  console.dir('파일 추가');
  
}

const deleteFile = () => {
  console.dir('파일 삭제');
}


var htmlTemplate = {
    foundlist : foundlist,
    makeHTML : makeHTML
};

//exports.foundlist = foundlist;
//exports.makeHTML = makeHTML;
module.exports = htmlTemplate;