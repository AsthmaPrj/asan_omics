var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');
const sampleModel = require('../models/searchData');
const clinicalModel = require('../models/clinicalData');
var util = require('./util');

// var isAuthenticated = function(req, res, next){
//   if(req.session.passport){
//     var id = req.session.passport.user;
//     if(req.isAuthenticated()){
//       // return next();
//       if(id == 'asthma_omics'){
//         return next();
//       }
//       res.redirect("/")
//     }
//   }
//   res.redirect("/users/login")
// };
/* GET search page. */
router.get('/', util.isAuthenticatedForClinicalInformationKR, function(req, res, next) {
  const keyword = req.query["query"];
  const tab = "tab1";
  const id = req.query.query;
  let session = req.session.passport;
  console.log(session);
  sampleModel.searchData(keyword, 1).then((result => {
    clinicalModel.searchClinicalData(id).then((clinicalResult =>{
      res.render('search', {session:session, keyword: keyword, id: tab, tables:[{data: {results:result, clinicalResults:clinicalResult}}]});
    }));
  }));  
});

// router.post('/:tab', util.isAuthenticatedForClinicalInformationKR, searchController.searchData);
// router.get('/:id/:file', searchController.downloadData);
router.post('/:query/ajax', searchController.searchClinicalData);
router.get('/chart', util.isAuthenticatedForClinicalInformationKR, searchController.searchDetailedValue);    




module.exports = router;