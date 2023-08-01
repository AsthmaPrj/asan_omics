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
            filedir = '/data/projects/asan_omics/corea/rna-seq/211122_compress';
            filedir_raw = '/data/projects/asan_omics/corea/rna-seq/211122';
        }
        else if(omicsName == 'Methyl-seq(Blood)'){
            filedir = '/data/projects/asan_omics/corea/methyl_seq/211122_compress';
            filedir_raw = '/data/projects/asan_omics/corea/methyl_seq/211122';

        }
        else if(omicsName == 'GWAS'){
            // filedir = '/data/projects/asan_omics/corea/gwas/CELfile_593sample_compress';
            filedir = '/data/projects/asan_omics/corea/gwas/210803_compress';
            filedir_raw = filedir;
            
        }
        else if(omicsName == 'proteomics(Plasma)'){
            // filedir = '/data/projects/asan_omics/corea/proteomics/compress';
            filedir = '/data/projects/asan_omics/corea/proteomics';
            filedir_raw = filedir;
        }
        else if(omicsName == 'Metabolomics(plasma)'){
            filedir = '/data/projects/asan_omics/corea/metabolomics';
            filedir_raw = filedir;
        }
        else if(omicsName == 'Metagenomics(EBC)'){
            filedir = '/data/projects/asan_omics/corea/metagenomics';
            filedir_raw = filedir;
        }

        // fs.readdir(filedir, function(error, filelist){
        //     res.json(filelist);
        // })
        // var fileExtension = {}
        // fs.readdir(filedir_raw, function(error, filelist){
        //     console.log(filelist)
        //     for(var file of filelist){
        //         var extension = file.split('.').slice(-1)[0];
        //         if (extension in fileExtension){
        //             fileExtension[extension] += 1
        //         }else{
        //             fileExtension[extension] = 1
        //         }
        //     }
        // });
        
        fs.readdir(filedir, function(error, filelist){
            var fileSizelist = [];
            var fileSizeSum = 0;
            for(var file of filelist){
                file_all_dir = filedir + '/'+file;
                var stats = fs.statSync(file_all_dir);
                var fileSize = Math.round(stats.size/(1024*1024)*100)/100;
                var fileSize = stats.size;
                fileSizeSum += fileSize;
                if (fileSize > 1024*1024*1024){
                    fileSize = Math.round(stats.size/(1024*1024*1024)*100)/100;
                    fileSizelist.push(fileSize+' GB');
                }
                else{
                    fileSize = Math.round(stats.size/(1024*1024)*100)/100;
                    fileSizelist.push(fileSize+' MB');
                }
                
            }
            if (fileSizeSum > 1024*1024*1024*1024){
                fileSizeSum = Math.round(fileSizeSum/(1024*1024*1024*1024)*100)/100;
                fileSizeSum = fileSizeSum+' TB';
            }
            else if(fileSizeSum > 1024*1024*1024){
                fileSizeSum = Math.round(fileSizeSum/(1024*1024*1024)*100)/100;
                fileSizeSum = fileSizeSum+' GB';
            }
            else{
                fileSizeSum = Math.round(fileSizeSum/(1024*1024)*100)/100;
                fileSizeSum = fileSizeSum+' MB';
            }

            var fileExtension = {};
            fs.readdir(filedir_raw, function(error, filelist2){
                for(var file of filelist2){
                    var extension = file.split('.').slice(-1)[0];
                    if (extension in fileExtension){
                        fileExtension[extension] += 1;
                    }else{
                        fileExtension[extension] = 1;
                    }
                }
                res.json({filelist:filelist, fileSizelist:fileSizelist, fileExtension:fileExtension, fileSizeSum:fileSizeSum});
            });
            

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
            filedir = '/data/projects/asan_omics/corea/rna-seq/211122_compress';
        }
        else if(omicsName == 'Methyl-seq(Blood)'){
            filedir = '/data/projects/asan_omics/corea/methyl_seq/211122_compress';
        }
        else if(omicsName == 'GWAS'){
            // filedir = '/data/projects/asan_omics/corea/gwas/CELfile_593sample_compress';
            filedir = '/data/projects/asan_omics/corea/gwas/210803_compress';
        }
        else if(omicsName == 'proteomics(Plasma)'){
            // filedir = '/data/projects/asan_omics/corea/proteomics/compress';
            filedir = '/data/projects/asan_omics/corea/proteomics';
        }
        else if(omicsName == 'Metabolomics(plasma)'){
            filedir = '/data/projects/asan_omics/corea/metabolomics';
        }
        else if(omicsName == 'Metagenomics(EBC)'){
            filedir = '/data/projects/asan_omics/corea/metagenomics';
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
