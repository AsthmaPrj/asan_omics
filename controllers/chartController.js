const express = require('express');
const views = '../views/';
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var session = require('express-session'); 
const { executionAsyncResource } = require('async_hooks');
var zip = new require('node-zip')();

module.exports = {
    showChart: async function(req, res, next){
        var filedir_corea = '/data/projects/asan_omics/corea/';
        var filedir_prismkr = '/data/projects/asan_omics/prism_kr/';
        var filedir_prismuk = '/data/projects/asan_omics/prism_uk/';
        var filedir_ubiopred = '/data/projects/asan_omics/u_bio_pred/';
        var filelist_corea = [];
        var filelist_prismkr = [];
        var filelist_prismuk = [];
        var filelist_ubiopred = [];


        function getFileDir(filedir){
            return new Promise(function(resolve, reject){
                fs.readdir(filedir, (err, filelist)=>{
                    resolve(filelist);
                });
                
            });
        }

        function getFileLenth(filedir){
            return new Promise(function(resolve, reject){
                fs.readdir(filedir, (err, filelist)=>{
                    resolve(filelist.length);
                });
                
            });
            
        }
        let array_all_omics = new Array()
        let array_corea = new Array();
        let array_prismkr = new Array();
        let array_prismuk = new Array();
        let array_ubiopred = new Array();
        let omics = new Object();

        // Corea project
        filelist_corea = await getFileDir(filedir_corea);
        for (filename of filelist_corea){
            omics = new Object()
            if (filename == 'gwas'){
                fullfiledir = filedir_corea+filename+'/CELfile_593sample/';
                length = await getFileLenth(fullfiledir);
                // getFileLenth(fullfiledir).then(length);
                filename = "GWAS"
            }
            else if(filename == 'metabolomics'){
                fullfiledir = filedir_corea+filename+'/';
                length = await getFileLenth(fullfiledir);
                filename = "Metabolomics"

            }
            else if(filename == 'metagenomics'){
                fullfiledir = filedir_corea+filename+'/';
                length = await getFileLenth(fullfiledir);
                filename = "Metagenomics"
            }
            else if(filename == 'methyl_seq'){
                fullfiledir = filedir_corea+filename+'/211122/';
                length = await getFileLenth(fullfiledir);
                filename = "Methyl-seq"

            }
            else if(filename == 'proteomics'){
                fullfiledir = filedir_corea+filename+'/';
                length = await getFileLenth(fullfiledir);
                filename = "Proteomics"

            }
            else if(filename == 'rna-seq'){
                fullfiledir = filedir_corea+filename+'/211122/';
                length = await getFileLenth(fullfiledir);
                filename = "RNA-seq"
            }

            omics.name = filename;
            omics.num = length;
            array_corea.push(omics);
        }

        // Prism kr project
        filelist_prismkr = await getFileDir(filedir_prismkr);
        for (filename of filelist_prismkr){
            var omics_name = '';
            if (filename == 'genomics'){
                filelist_sub = await getFileDir(filedir_prismkr+filename+'/');
                for (filename_sub of filelist_sub) {
                    omics = new Object()
                    if (filename_sub == 'whole_blood'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "Genomics(Whoole Blood)";
                    }
                    omics.name = omics_name;
                    omics.num = length;
                    array_prismkr.push(omics);
                }
            }
            else if (filename == 'metabolomics'){
                filelist_sub = await getFileDir(filedir_prismkr+filename+'/');
                for (filename_sub of filelist_sub) {
                    omics = new Object()
                    if (filename_sub == 'plasma'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "Metabolomics(Plasma)";
                    }
                    else if (filename_sub == 'urine'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "Metabolomics(Urine)";
                    }
                    omics.name = omics_name;
                    omics.num = length;
                    array_prismkr.push(omics);
                }
            }
            else if (filename == 'metagenomics'){
                filelist_sub = await getFileDir(filedir_prismkr+filename+'/');
                for (filename_sub of filelist_sub) {
                    omics = new Object()
                    if (filename_sub == 'ebc'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "Metagenomics(EBC)";
                    }
                    else if (filename_sub == 'serum'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "Metagenomics(Serum)";
                    }
                    else if (filename_sub == 'urine'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "Metagenomics(Urine)";
                    }
                    omics.name = omics_name;
                    omics.num = length;
                    array_prismkr.push(omics);
                }
            }
            else if (filename == 'proteomics'){
                filelist_sub = await getFileDir(filedir_prismkr+filename+'/');
                for (filename_sub of filelist_sub) {
                    omics = new Object()
                    if (filename_sub == 'plasma'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "Proteomics(Plasma)";
                    }
                    else if (filename_sub == 'sputum'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "Proteomics(Sputum)";
                    }
                    omics.name = omics_name;
                    omics.num = length;
                    array_prismkr.push(omics);
                }
            }
            else if (filename == 'transcriptomics'){
                filelist_sub = await getFileDir(filedir_prismkr+filename+'/');
                for (filename_sub of filelist_sub) {
                    omics = new Object()
                    if (filename_sub == 'single_cell_rna_BALF'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "     Transcriptomics\n(Single cell RNA(BALF))";
                    }
                    else if (filename_sub == 'single_cell_rna_PBMC'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "      Transcriptomics\n(Single cell RNA(PBMC))";
                    }
                    else if (filename_sub == 'total_rna_BALF_broncial_biopsy'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "              Transcriptomics\n(Total RNA(BALF, broncial biopsy))";
                    }
                    else if (filename_sub == 'total_rna_PBMC'){
                        fullfiledir = filedir_prismkr+filename+'/'+filename_sub+'/';
                        length = await getFileLenth(fullfiledir);
                        omics_name = "  Transcriptomics\n(Total RNA(PBMC))";
                    }
                    omics.name = omics_name;
                    omics.num = length;
                    array_prismkr.push(omics);
                }
            }
        }

        // Prism uk project
        filelist_prismuk = await getFileDir(filedir_prismuk);
        for (filename of filelist_prismuk){
            omics = new Object()
            if (filename == 'genomics'){
                fullfiledir = filedir_prismuk+filename+'/';
                length = await getFileLenth(fullfiledir);
            }
            else if(filename == 'metabolomics'){
                fullfiledir = filedir_prismuk+filename+'/';
                length = await getFileLenth(fullfiledir);
            }
            else if(filename == 'metagenomics'){
                fullfiledir = filedir_prismuk+filename+'/';
                length = await getFileLenth(fullfiledir);
            }
            else if(filename == 'proteomics'){
                fullfiledir = filedir_prismuk+filename+'/';
                length = await getFileLenth(fullfiledir);
            }
            else if(filename == 'transcriptomics'){
                fullfiledir = filedir_prismuk+filename+'/';
                length = await getFileLenth(fullfiledir);
            }

            omics.name = filename;
            omics.num = length;
            array_prismuk.push(omics);
        }

        // U-biopred project
        // filelist_ubiopred = await getFileDir(filedir_ubiopred);
        // for (filename of filelist_ubiopred){
        //     omics = new Object()

        //     // omics.name = filename;
        //     // omics.num = length;
        //     array_ubiopred.push(omics);
        // }

        array_all_omics.push(array_corea)
        array_all_omics.push(array_prismkr)
        // array_all_omics.push(array_prismuk)
        // array_all_omics.push(array_ubiopred)
        


        // console.log(array_all_omics);
        res.json(array_all_omics);

    }

}
