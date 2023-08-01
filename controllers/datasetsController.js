const express = require('express');
const views = '../views/';
const model = require('../models/datasets');
var session = require('express-session'); 


module.exports = {
  selectAllData: async function(req, res, next){
    let session = req.session.passport;
    result = await model.selectAllData()

    var biologics = []
    biologics = await model.selectBiologics()

    var gender = []
    gender = await model.selectGender()

    var age = []
    age = await model.selectAge()

    res.render('datasets', {results:result, biologics:biologics, gender:gender, age:age, session:session});
    

    // model.selectAllData().then((result => {
    //     res.render('datasets', {results:result, session:session});
    // }));
  }


}

