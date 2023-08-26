const express = require('express');
const views = '../views/';
const sampleModel = require('../models/searchData');
const clinicalModel = require('../models/clinicalData');

// 파일 다운로드
var fs = require('fs');
var path = require('path');
var mime = require('mime');

module.exports = {
    searchData: function(req, res, next){
        const keyword = req.query["query"];
        const tab = req.params.tab;
        const id = req.query.query;

        if(tab == 'tab1') {            
            sampleModel.searchData(keyword, 1).then((result => {
                // res.render('search', {keyword: keyword, id: tab, tables:[{data: {results:result}}]});
                clinicalModel.searchClinicalData(id).then((clinicalResult =>{
                    res.render('search', {keyword: keyword, id: tab, tables:[{data: {results:result, clinicalResults:clinicalResult}}]});
                }));
            }));
        }

        else if(tab == 'tab2') {
            sampleModel.searchData(keyword, 2).then((result => {
                clinicalModel.searchClinicalData(id).then((clinicalResult =>{
                    res.render('search', {keyword: keyword, id: tab, tables:[{data: {results:result, clinicalResults:clinicalResult}}]});
                }));
            }));
            // res.render('search', {keyword: keyword, id: tab, tables:[{name:'table1', data: {dataFields:[], results:[]}}]});
        }
        else if(tab == 'tab3'){
            sampleModel.searchData(keyword, 3).then((result => {
                clinicalModel.searchClinicalData(id).then((clinicalResult =>{
                    res.render('search', {keyword: keyword, id: tab, tables:[{data: {results:result, clinicalResults:clinicalResult}}]});
                }));
            }));
        }
        else if(tab == 'tab4'){
            sampleModel.searchData(keyword, 4).then((result => {
                clinicalModel.searchClinicalData(id).then((clinicalResult =>{
                    res.render('search', {keyword: keyword, id: tab, tables:[{data: {results:result, clinicalResults:clinicalResult}}]});
                }));
            }));
        }
        else if(tab == 'tab5'){
            sampleModel.searchData(keyword, 5).then((result => {
                clinicalModel.searchClinicalData(id).then((clinicalResult =>{
                    res.render('search', {keyword: keyword, id: tab, tables:[{data: {results:result, clinicalResults:clinicalResult}}]});
                }));
            }));
        }
        else if(tab == 'tab6'){
            sampleModel.searchData(keyword, 6).then((result => {
                clinicalModel.searchClinicalData(id).then((clinicalResult =>{
                    res.render('search', {keyword: keyword, id: tab, tables:[{data: {results:result, clinicalResults:clinicalResult}}]});
                }));
            }));
        }
        else{
            sampleModel.searchData(keyword, 7).then((result => {
                clinicalModel.searchClinicalData(id).then((clinicalResult =>{
                    res.render('search', {keyword: keyword, id: tab, tables:[{data: {results:result, clinicalResults:clinicalResult}}]});
                }));
            }));
        }
    },

    downloadData: function(req, res, next){
        const id = req.params.id.split('=')[1];
        const file = req.params.file.split('=')[1];
        var organizationId;

        if(id.includes('-')){
            organizationId = id.split('-')[0];
        } else{
            organizationId = id.substr(0, 2)
        }
        // var organizationId = id.split('-')[0];
        var sample = file.substr(1, 1);
        
        switch(sample){
            case "D": 
                sample = "DNA";
                break;
            case "S": 
                sample = "Serum";
                break;
            case "M": 
                sample = "Plasma";
                break;
            case "P": 
                sample = "PBMC";
                break;
            case "H": 
                sample = "Heparin_DNALink ";
                break;
            case "U": 
                sample = "Urine";
                break;
            case "E": 
                sample = "EBC";
                break;
            case "A": 
                sample = "PAXgene";
                break;
            case "N": 
                sample = "Nasal";
                break;
            case "B": 
                sample = "Bronchial_BAL";
                break;
            case "Y": 
                sample = "Bronchial_biopsy";
                break;
            case "T": 
                var substring = file.substr(9, 1);
                if(substring == "S") {sample = "Sputum_Sup";}
                else{sample = "Sputum_pellet";}
                break;
        }

        var dir="/data/projects/asan_omics/" + organizationId + "/" + sample + "/" + file + ".fastq";
        try{
            if (fs.existsSync(dir)) { 
                var filename = path.basename(dir); 
                var mimetype = mime.getType(dir); 
              
                res.setHeader('Content-disposition', 'attachment; filename=' + filename); 
                res.setHeader('Content-type', mimetype); 
              
                var filestream = fs.createReadStream(dir);
                filestream.pipe(res);
            } else {
                res.send('해당 파일이 없습니다.');  
                return;
            }
        } catch (e) { 
            console.log(e);
            res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
            return;
        }
    },

    searchClinicalData: function(req, res, next){
        var body = req.body;
        const visitnm = body.visitnm;
        const id = req.params.id.split('=')[1];

        // console.log("visitnm", visitnm);
        clinicalModel.selectClinicalData(visitnm, id).then((result =>{
            res.json(result[0]);
        }));

    }
}