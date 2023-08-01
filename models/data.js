

module.exports = {
    saveData: function(data){
        var mysql = require('mysql');
        var conn = mysql.createConnection({
            "user": "root",
            "password": "cbibioinfo2019",
            "database": "asan_omics",
            "host": "203.252.206.90",
            "port": 6655,
        });
        conn.connect();
        console.log(data);

        for (let i = 0; i < data.sampleInformationList.length; i++){
            var sql = 'INSERT INTO data (title, omicsType, summary, overallDesign, contributors, contactName, organizationName, department, lab, country,\
                sample_name, sample_title, source_name, molecule, label, description,\
                growth_protocol, treatment_protocol, extract_protocol, label_protocol, hyb_protocol, scan_protocol, data_processing, value_definition ) \
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,\
                    ?, ?, ?, ?, ?, ?, \
                    ?, ?, ?, ?, ?, ?, ?, ?)';
            
            var params = [data.title, data.omicsType, data.summary, data.overallDesign, data.contributors, data.contactName, data.organizationName, data.department, data.lab, data.country,
                data.sampleInformationList[i].sample_name, data.sampleInformationList[i].title, data.sampleInformationList[i].source_name, data.sampleInformationList[i].molecule, data.sampleInformationList[i].label, data.sampleInformationList[i].description,
                data.growth_protocol, data.treatment_protocol, data.extract_protocol, data.label_protocol, data.hyb_protocol, data. scan_protocol, data.data_processing, data.value_definition];
            
            conn.query(sql, params, function(err, result, field){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server  Error');
                }
            });
        }
        conn.end();
    }
}