var mysql = require('mysql');

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : 'ajoumysql123!',
    database : 'testdatabase'
  });

db.connect();  
/*
1. 아이디가 존재하는지 확인
  1.1 아이디가 존재하지 않으면 || 비밀번호 틀리면 오류화면 return
2. 사용자에게 로그인 성공 알림
3. 메인화면으로 전환
*/

db.check = function(req, res, username, password){

  db.query('select * from user where username = ? and password = ?', [username, password], function(err, results){

    if(err) throw err;
    if(results.length == 0 ){ // 아이디가 존재하지 않을 경우
      db.query(`select * from user where username = ?`, [username], function(err, results){
        if(err) throw err;
        if(results.length != 0) { // 아이디가 존재하지만 비밀번호 틀림
          res.render('failure', {name: '로그인', error: '비밀번호가 틀립니다'});
        } else {  // 아이디가 존재하지 않음
          res.render('failure', {name: '로그인', error: '아이디가 존재하지 않습니다'});
        }
      })
    } else{
      //로그인 성공
      res.cookie('username', results[0].username);
      
      res.render('success', {name: '로그인', data: results[0], authInfo: {loginStatus: false}});
    }
  });
};

module.exports = db;
