var express = require('express');
var router = express.Router();
var session = require('express-session'); 
var chartController = require('../controllers/chartController');



/* GET home page. */
router.post('/', chartController.showChart);
router.get('/', function(req, res, next) {
  let session = req.session.passport;
  console.log('index.js session', session);
  res.render('index', { title: 'Express', session: session});
});




module.exports = router;
