const express = require('express')
const views = '../views/'
const model = require('../models/data')


var data = new Object();
var sampleInformationList = [];

module.exports = {
  addDataInformation: function(req, res, next){
    var body = req.body;
    data.title = body.title;
    data.omicsType = body.omics_type;
    data.summary = body.summary;
    data.overallDesign = body.overall_design;
    data.contributors = body.contributors;
    data.contactName = body.contact_name;
    data.organizationName = body.organization_name;
    data.department = body.department;
    data.lab = body.lab;
    data.country = body.country;

    res.redirect('Add-data/sample');
  },

  makeSampleInformationList: function(req, res, next){
    var body = req.body;

    var sample_name = body.sample_name;
    var title = body.title;
    var source_name = body.source_name;
    var molecule = body.molecule;
    var label = body.label;
    var description = body.description;

    sampleInformationList.push({"sample_name":sample_name, "title": title, "source_name": source_name, 
                                  "molecule": molecule,"label": label, "description": description});
    console.log(sampleInformationList);                              
  },

  removeSampleInformationList: function(req, res, next){
    console.log("before function");

    var body = req.body;
    var sample_name = body.sample_name;
    // var index = sampleInformationList.indexOf(sample_name);
    var index = getIndex(sample_name)
    function getIndex(sample_name){
      return sampleInformationList.findIndex(
        function(sampleInformationList){return sampleInformationList.sample_name == sample_name}
      );
    }
    console.log(index);
    sampleInformationList.splice(index, 1);
    console.log(sampleInformationList);
  },

  addSampleInformation: function(req, res, next){
    data.sampleInformationList = sampleInformationList;
    res.redirect('protocol');
  }, 

  addProtocol: function(req, res, next){
    var body = req.body;
    data.growth_protocol = body.growth_protocol;
    data.treatment_protocol = body.treatment_protocol;
    data.extract_protocol = body.extract_protocol;
    data.label_protocol = body.label_protocol;
    data.hyb_protocol = body.hyb_protocol;
    data.scan_protocol = body.scan_protocol;
    data.data_processing = body.data_processing;
    data.value_definition = body.value_definition;

    model.saveData(data);
    data = {};
    sampleInformationList = [];

    res.redirect('protocol');
  }

}

