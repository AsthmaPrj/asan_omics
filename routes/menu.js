const { response } = require('express');
var express = require('express');
var router = express.Router();
var addDataController = require('../controllers/AddDataController');
var datasetsController = require('../controllers/datasetsController');
var coreaController = require('../controllers/coreaController');
var prismUKController = require('../controllers/prismUKController');
var prismKRController = require('../controllers/prismKRController');
var util = require('./util');

var session = require('express-session'); 
// var isAuthenticated = function(req, res, next){
//   if(req.session.passport){
//     var id = req.session.passport.user;
//     if(req.isAuthenticated()){
//       // return next();
//       if(id == 'asthma_omics' || id == 'asthma_user'){
//         return next();
//       }
//       res.redirect("/");
//     }
//   }
//   res.redirect("/users/login");
// };

// var isAuthenticatedForClinicalInformationKR = function(req, res, next){
//   if(req.session.passport){
//     var id = req.session.passport.user;
//     if(req.isAuthenticated()){
//       if(id == 'asthma_omics'){
//         return next();
//       }
//       res.redirect("/")
//     }
//   }
//   res.redirect("/users/login")
// };


/* GET home page. */
router.get('/datasets',util.isAuthenticatedForClinicalInformationKR, datasetsController.selectAllData);

router.get('/prismKR',util.isAuthenticated, function(req, res, next) {
  let session = req.session.passport;
  res.render('prismKR', { title: 'Express', session: session});
});
router.post('/prismKR/ajax', prismKRController.showPrismKRData);
router.get('/prismKR/:omicsName/:file', prismKRController.downloadPrismKRDataZip);

router.get('/prismUK',util.isAuthenticated, function(req, res, next) {
  let session = req.session.passport;
  res.render('prismUK', { title: 'Express', session: session});
});
router.post('/prismUK/ajax', prismUKController.showPrismUKData);
router.get('/prismUK/:omicsName/:file', prismUKController.downloadPrismUKDataZip);

router.get('/corea',util.isAuthenticated, function(req, res, next) {
  let session = req.session.passport;
  res.render('corea', { title: 'Express', session: session});
});
router.post('/corea/ajax',coreaController.showCoreaData);
// router.get('/corea/:omicsName/:fileList',coreaController.downloadCoreaData);
router.get('/corea/:omicsName/:file',coreaController.downloadCoreaDataZip);

router.get('/ubiopred',util.isAuthenticated, function(req, res, next) {
  let session = req.session.passport;
  res.render('ubiopred', { title: 'Express', session: session});
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  let session = req.session.passport;
  res.render('contact', { title: 'Express', session:session });
});

router.get('/Add-data', function(req, res, next) {
  res.render('Add-data', { title: 'Express' });
});

router.get('/Add-data/sample', function(req, res, next) {
  res.render('sample', { title: 'Express' });
});

router.get('/Add-data/protocol', function(req, res, next) {
  res.render('protocol', { title: 'Express'});
});

router.post('/Add-data', addDataController.addDataInformation);
router.post('/Add-data/ajax', addDataController.makeSampleInformationList);
router.post('/Add-data/ajaxRemove', addDataController.removeSampleInformationList);
router.post('/Add-data/sample', addDataController.addSampleInformation);

router.post('/Add-data/protocol', addDataController.addProtocol);

module.exports = router;