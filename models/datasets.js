module.exports = {
    selectAllData: function(){
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

            var sql = "select * from prism";
        
            conn.query(sql, function(err, result, field){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server  Error');
                }else{
                    resolve(result);
                }                
            });
            conn.end();
        });
    },
    selectBiologics: function(){
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

            // var sql = "select Biologics from prism";
            var sql = "SELECT p2.Biologics, COUNT(p2.Biologics) \
                    FROM (SELECT DISTINCT PRISM, Biologics FROM prism p1) p2\
                    GROUP BY p2.Biologics\
                    ORDER BY COUNT(p2.Biologics) DESC;"
        
            conn.query(sql, function(err, result, field){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server  Error');
                }else{
                    resolve(result);
                }                
            });
            conn.end();
        });
    },
    selectGender: function(){
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

            // var sql = "select Biologics from prism";
            var sql = "SELECT SEX_SYS_VAL, count(SEX_SYS_VAL) FROM (SELECT DISTINCT SUBJNO, SEX_SYS_VAL FROM clinical c1\
                WHERE c1.SUBJNO in (SELECT DISTINCT PRISM FROM prism)) c2\
                GROUP BY c2.SEX_SYS_VAL\
                ORDER BY count(SEX_SYS_VAL) DESC;"
        
            conn.query(sql, function(err, result, field){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server  Error');
                }else{
                    resolve(result);
                }                
            });
            conn.end();
        });
    },
    selectAge: function(){
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

            // var sql = "select Biologics from prism";
            var sql = "select c3.range, count(c3.range) FROM(\
                    SELECT CASE\
                    when AGE_SYS_VAL between 0 and 9 then '~9'\
                    when AGE_SYS_VAL between 10 and 19 then '10~19'\
                    when AGE_SYS_VAL between 20 and 29 then '20~29'\
                    when AGE_SYS_VAL between 30 and 39 then '30~39'\
                    when AGE_SYS_VAL between 40 and 49 then '40~49'\
                    when AGE_SYS_VAL between 50 and 59 then '50~59'\
                    else '60~'\
                    end as 'range'\
                    FROM (SELECT DISTINCT SUBJNO, AGE_SYS_VAL FROM clinical c1\
                    where c1.SUBJNO in (SELECT DISTINCT PRISM FROM prism)) c2) c3\
                    GROUP BY c3.range;"
        
            conn.query(sql, function(err, result, field){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server  Error');
                }else{
                    resolve(result);
                }                
            });
            conn.end();
        });
    }

}