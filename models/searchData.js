module.exports = {
    searchData: function(keyword, visit){
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

            var sql = "select * from prism where PRISM='" + keyword + "' and visit=" + visit;
            
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