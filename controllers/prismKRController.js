const express = require('express');
const views = '../views/';
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var zip = new require('node-zip')();

module.exports = {
    showPrismKRData: function(req, res, next){
        var body = req.body;
        const omicsName = body.omicsName;
        var filedir = '';

        if (omicsName == 'Genomics(Whole Blood)'){
            filedir = '/data/projects/asan_omics/prism_kr/genomics/whole_blood';
        }
        else if(omicsName == 'Transcriptomics(Single cell RNA (PBMC))'){
            filedir = '/data/projects/asan_omics/prism_kr/transcriptomics/single_cell_rna_PBMC/scRNA-Seq_AMC_Kimtaebum/Rawdata/compress'
        }
        else if(omicsName == 'Transcriptomics(Total RNA (PBMC))'){
            filedir = '/data/projects/asan_omics/prism_kr/transcriptomics/total_rna_PBMC';
        }
        else if(omicsName == 'Transcriptomics(Single cell RNA (BALF))'){
            filedir = '/data/projects/asan_omics/prism_kr/transcriptomics/single_cell_rna_BALF';
        }
        else if(omicsName == 'Transcriptomics(Total RNA (BALF, bronchial biopsy))'){
            filedir = '/data/projects/asan_omics/prism_kr/transcriptomics/total_rna_BALF_broncial_biopsy';
        }
        else if(omicsName == 'Proteomics(Sputum)'){
            filedir = '/data/projects/asan_omics/prism_kr/proteomics/sputum';
        }
        else if(omicsName == 'Proteomics(Plasma)'){
            filedir = '/data/projects/asan_omics/prism_kr/proteomics/plasma';
        }    
        else if(omicsName == 'Metabolomics(Plasma)'){
            filedir = '/data/projects/asan_omics/prism_kr/metabolomics/plasma';
        }    
        else if(omicsName == 'Metabolomics(Urine)'){
            filedir = '/data/projects/asan_omics/prism_kr/metabolomics/urine';
        }    
        else if(omicsName == 'Metagenomics(Serum)'){
            filedir = '/data/projects/asan_omics/prism_kr/metagenomics/serum';
        }
        else if(omicsName == 'Metagenomics(Urine)'){
            filedir = '/data/projects/asan_omics/prism_kr/metagenomics/urine';
        }
        else if(omicsName == 'Metagenomics(EBC)'){
            filedir = '/data/projects/asan_omics/prism_kr/metagenomics/ebc';
        }

        fs.readdir(filedir, function(error, filelist){
            res.json(filelist);
        })
    },

    downloadPrismKRDataZip: function(req, res, next){
        const omicsName = req.params.omicsName.split('=')[1];
        const file = req.params.file.split('=')[1];

        if (omicsName == 'Genomics(Whole Blood)'){
            filedir = '/data/projects/asan_omics/prism_kr/genomics/whole_blood';
        }
        else if(omicsName == 'Transcriptomics(Single cell RNA (PBMC))'){
            filedir = '/data/projects/asan_omics/prism_kr/transcriptomics/single_cell_rna_PBMC/scRNA-Seq_AMC_Kimtaebum/Rawdata/compress'
        }
        else if(omicsName == 'Transcriptomics(Total RNA (PBMC))'){
            filedir = '/data/projects/asan_omics/prism_kr/transcriptomics/total_rna_PBMC';
        }
        else if(omicsName == 'Transcriptomics(Single cell RNA (BALF))'){
            filedir = '/data/projects/asan_omics/prism_kr/transcriptomics/single_cell_rna_BALF';
        }
        else if(omicsName == 'Transcriptomics(Total RNA (BALF, bronchial biopsy))'){
            filedir = '/data/projects/asan_omics/prism_kr/transcriptomics/total_rna_BALF_broncial_biopsy';
        }
        else if(omicsName == 'Proteomics(Sputum)'){
            filedir = '/data/projects/asan_omics/prism_kr/proteomics/sputum';
        }
        else if(omicsName == 'Proteomics(Plasma)'){
            filedir = '/data/projects/asan_omics/prism_kr/proteomics/plasma';
        }    
        else if(omicsName == 'Metabolomics(Plasma)'){
            filedir = '/data/projects/asan_omics/prism_kr/metabolomics/plasma';
        }    
        else if(omicsName == 'Metabolomics(Urine)'){
            filedir = '/data/projects/asan_omics/prism_kr/metabolomics/urine';
        }    
        else if(omicsName == 'Metagenomics(Serum)'){
            filedir = '/data/projects/asan_omics/prism_kr/metagenomics/serum';
        }
        else if(omicsName == 'Metagenomics(Urine)'){
            filedir = '/data/projects/asan_omics/prism_kr/metagenomics/urine';
        }
        else if(omicsName == 'Metagenomics(EBC)'){
            filedir = '/data/projects/asan_omics/prism_kr/metagenomics/ebc';
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
