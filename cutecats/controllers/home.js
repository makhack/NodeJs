var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image; // require, par defaut ia chercher index.js

module.exports = {
    
  index: function(req, res) {
      //res.send(200, "<h2>bonjour depuis index</h2>");
      // affichage de la vue index avec pour l'instant un viewModel vide...
      
      /*var viewModel = {
        images: ImageModel.images,
      };*/
      
      // on aura la liste de nos images + un formulaire pour uploader
      var viewModel = {
          image: []
      };
      // requete toutes les images en triant par odre décroissant du timestamp
      ImageModel.find({},{},{sort: {timestamp: -1}}, function(err,images){
         if(err) throw err;
         
         viewModel.images = images;
         sidebar(viewModel, function(err,viewModel){
             if(err) throw err;
             res.render('index', viewModel);
         });
      });
  }
};