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
  1.1 아이디가 존재하면 오류화면 return
2. db에 연결 및 데이터 추가
3. 사용자에게 데이터 추가 성공 알림
4. 메인화면으로 전환
*/

db.register = function(req, res, data){
  db.query('select * from user where username = ?', [data.username], function(err, results){
    if(err) throw err;
    if(results.length != 0 ){
      res.render('failure', {name : '회원가입', error: '이미 아이디가 존재합니다'});
    } 
    else {
      db.query('insert into user ( username, password, realName, age) values ( ?, ?, ?, ? )', [data.username, data.password, data.realName, Number(data.age)], function(err, results){
      if(err) throw err;
      res.cookie('username', data.username);
      res.render('success', {name: '회원가입', data: data, authInfo: {loginStatus: true, username: data.username}});
      })
    }
  })
};

module.exports = db;