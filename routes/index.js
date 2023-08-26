var express = require('express');
var router = express.Router();
var session = require('express-session'); 


/* GET home page. */
router.get('/', function(req, res, next) {
  let session = req.session.passport;
  console.log('index.js session', session);
  res.render('index', { title: 'Express', session: session});
});

module.exports = router;
