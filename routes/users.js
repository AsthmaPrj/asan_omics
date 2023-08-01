var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; 
var session = require('express-session'); 
var flash = require('connect-flash');

router.get('/logout', function(req, res){
  // req.logout();
  req.session.destroy();
  res.clearCookie('sessionkey');
  console.log('logout');
  res.redirect("/")
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express'});

});

router.post('/login',
  passport.authenticate(
    'local',
    {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    }
  )
);

passport.serializeUser(function (user, done) { // 로그인 성공 시 콜백 함수 호출
  console.log('[SerializeUser]', user);
  done(null, user.id); // 접속한 사용자의 식별 값이, session store에 user.id 저장
});

passport.deserializeUser(function (id, done) { // 로그인 성공한 사용자가 웹 페이지 이동할 때 마다 콜백 함수 호출
  console.log('[DeserializeUser]', id); // authId 인자에는 serializeUser 메소드에서 보낸 user.id 값이 담김
  var mysql = require('mysql');
    var db = mysql.createConnection({
        "user": "root",
        "password": "cbibioinfo2019",
        "database": "asan_omics",
        "host": "203.252.206.90",
        "port": 6655,
    });
    db.connect();
  db.query(
    'SELECT * FROM users WHERE id=?',
    [id],
    function (err, results) {
      if (err) done(err);
      if (!results[0]) done(err);
      var user = results[0];
      done(null, user);
    });
  db.end();
});

passport.use(new LocalStrategy( // Local 저장 방식을 통한 인증 구현
  
  function (username, password, done) {
    var mysql = require('mysql');
    var db = mysql.createConnection({
        "user": "root",
        "password": "cbibioinfo2019",
        "database": "asan_omics",
        "host": "203.252.206.90",
        "port": 6655,
    });
    db.connect();
    
    db.query(
      'SELECT * FROM users WHERE id=?',
      // ['local:' + username],
      [username],
      function (err, results) {
        if (err) {return done(err);} // 입력한 유저정보가 mysql 내 존재하지 않는 경우 1
        if (!results[0]) {return done(err);} // 입력한 유저정보가 mysql 내 존재하지 않는 경우 2
        
        var user = results[0]; // 적절한 유저정보가 존재하는 경우

        if(password === user.password){
          done(null, user); // user 라는 값을 passport.serializeUser의 첫번째 인자로 전송
        } else{
          done(null, false);
        }
    });
    db.end();
}));

module.exports = router;