const express = require('express');
const views = '../views/';
const model = require('../models/datasets');
var session = require('express-session'); 


module.exports = {
  selectAllData: function(req, res, next){
    let session = req.session.passport;
    
    model.selectAllData().then((result => {
        res.render('datasets', {results:result, session:session});
    }));
  }


}

