var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image; // require, par defaut ia chercher index.js

module.exports = {
    
  index: function(req, res) {
      //res.send(200, "<h2>bonjour depuis index</h2>");
      // affichage de la vue index avec pour l'instant un viewModel vide...
      
      var viewModel = {
        images: ImageModel.images,
      };
      sidebar(viewModel, function(err, viewModel) {
         if (err) throw err;
         res.render('index', viewModel);
      });
      
  } 
   
};