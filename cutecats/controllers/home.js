var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image; // require, par default va chercher dans le index.js du dossier

module.exports = {
    index : function(req,res){
        
        var viewModel = {
            images: ImageModel.images
        };
        
        sidebar(viewModel, function(err, viewModel){
            if(err) throw err;
            
            //res3send('<h1> BONJOUR DEPUIS INDEX</h1>)
            // affichage de la vue index avec pour l'instant un viewModel vide ...
            res.render('index', viewModel);
        });
    }
};