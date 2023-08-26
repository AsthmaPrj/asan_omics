const express = require('express');
const views = '../views/';
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var zip = new require('node-zip')();

module.exports = {
    showCoreaData: function(req, res, next){
        var body = req.body;
        const omicsName = body.omicsName;
        var filedir = '';

        if (omicsName == 'RNA-seq(PBMC)'){
            filedir = '/data/projects/asan_omics/corea/rna-seq';
        }
        else if(omicsName == 'Methyl-seq(Blood)'){
            filedir = '/data/projects/asan_omics/corea/methyl_seq';
        }
        else if(omicsName == 'GWAS'){
            filedir = '/data/projects/asan_omics/corea/gwas/CELfile_593sample_compress';
        }
        else if(omicsName == 'proteomics(Plasma)'){
            // filedir = '/data/projects/asan_omics/corea/proteomics/compress';
            filedir = '/data/projects/asan_omics/corea/proteomics';
        }
        else if(omicsName == 'Metabolomics(plasma)'){
            filedir = '/data/projects/asan_omics/corea/metabolomics';
        }

        fs.readdir(filedir, function(error, filelist){
            res.json(filelist);
        })
    },

    // downloadCoreaData: function(req, res, next){
    //     const omicsName = req.params.omicsName.split('=')[1];
    //     const fileListString = req.params.fileList.split('=')[1];
    //     const fileList = fileListString.split(',');
    //     var dir = '';
    //     var file = '';

    //     if (omicsName == 'RNA-seq(PBMC)'){
    //         filedir = '/data/projects/asan_omics/corea/rna-seq/compress';
    //     }
    //     else if(omicsName == 'Methyl-seq(Blood)'){
    //         filedir = '/data/projects/asan_omics/corea/methyl_seq/compress';
    //     }
    //     else if(omicsName == 'GWAS'){
    //         filedir = '/data/projects/asan_omics/corea/gwas/compress';
    //     }
    //     else if(omicsName == 'proteomics(Plasma)'){
    //         filedir = '/data/projects/asan_omics/corea/proteomics/compress';
    //     }
    //     else if(omicsName == 'Metabolomics(plasma)'){
    //         filedir = '/data/projects/asan_omics/corea/metabolomics/compress';
    //     }
    
    //     for (var value of fileList) {
    //         file = dir + "/" + value;

    //         try{
    //             if (fs.existsSync(file)) { 
    //                 var filename = path.basename(file); 
    //                 var mimetype = mime.getType(file); 

    //                 res.setHeader('Content-disposition', 'attachment; filename=' + filename); 
    //                 res.setHeader('Content-type', mimetype); 
                    
    //                 var filestream = fs.createReadStream(file);
    //                 filestream.pipe(res);
    //             } else {
    //                 res.send('해당 파일이 없습니다.');  
    //                 return;
    //             }
    //         } catch (e) { 
    //             console.log(e);
    //             res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
    //             return;
    //         } 


    //         zip.file(file, value);
    //     }

    //     // var data = zip.generate({base64:false, compression:'DEFLATE'}); 
    //     // fs.writeFileSync('test.zip', data, 'binary');
    //     // console.log(data);

    //     // // res.setHeader('Content-disposition', 'attachment; filename=test.zip');
    //     // res.download('test.zip');
    // },

    downloadCoreaDataZip: function(req, res, next){
        const omicsName = req.params.omicsName.split('=')[1];
        const file = req.params.file.split('=')[1];

        if (omicsName == 'RNA-seq(PBMC)'){
            filedir = '/data/projects/asan_omics/corea/rna-seq';
        }
        else if(omicsName == 'Methyl-seq(Blood)'){
            filedir = '/data/projects/asan_omics/corea/methyl_seq';
        }
        else if(omicsName == 'GWAS'){
            filedir = '/data/projects/asan_omics/corea/gwas/CELfile_593sample_compress';
        }
        else if(omicsName == 'proteomics(Plasma)'){
            // filedir = '/data/projects/asan_omics/corea/proteomics/compress';
            filedir = '/data/projects/asan_omics/corea/proteomics';
        }
        else if(omicsName == 'Metabolomics(plasma)'){
            filedir = '/data/projects/asan_omics/corea/metabolomics';
        }

        dir = filedir + "/" + file;

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

    }
}
