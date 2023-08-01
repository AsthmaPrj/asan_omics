module.exports = {
    searchClinicalData: function(id){
        return new Promise ((resolve, reject) =>{
            var mysql = require('mysql');
            var conn = mysql.createConnection({
                "user": "root",
                "password": "cbibioinfo2019",
                "database": "asan_omics",
                "host": "203.252.206.90",
                "port": 6655,
            });
            conn.connect();

            var sql = "select * from clinical where SUBJNO='" + id + "'";
            
            conn.query(sql, function(err, clinicalResult, field){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server  Error');
                }else{
                    resolve(clinicalResult);
                }                
            });
            conn.end();
        });
    },

    selectClinicalData: function(visitnm, id){
        return new Promise ((resolve, reject) =>{
            var mysql = require('mysql');
            var conn = mysql.createConnection({
                "user": "root",
                "password": "cbibioinfo2019",
                "database": "asan_omics",
                "host": "203.252.206.90",
                "port": 6655,
            });
            conn.connect();

            var sql = "select * from clinical where VISITNM='" + visitnm + "' and SUBJNO='" + id + "'";

            
            conn.query(sql, function(err, clinicalResult, field){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server  Error');
                }else{
                    resolve(clinicalResult);
                }                
            });
            conn.end();
        });
    },
    
    selectDetailedValue: function(id, value){
        return new Promise ((resolve, reject) =>{
            var mysql = require('mysql');
            var conn = mysql.createConnection({
                "user": "root",
                "password": "cbibioinfo2019",
                "database": "asan_omics",
                "host": "203.252.206.90",
                "port": 6655,
            });
            conn.connect();

            var sql = "select " + value.split("-")[0] + ", "+ value.split("-")[1] + ", VISITNM from clinical where SUBJNO='" + id + "'";

            
            conn.query(sql, function(err, clinicalResult, field){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server  Error');
                }else{
                    resolve(clinicalResult);
                }                
            });
            conn.end();
        });
    }
}