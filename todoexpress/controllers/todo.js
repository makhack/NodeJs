

module.exports = {
  index: function(req, res) {
      res.render('index', {});
  },
  create: function(req, res) {
      console.log("titre = " + req.body.titre);
      console.log("auteur = " + req.body.auteur);
      console.log("urgence = " + req.body.urgence);
      res.redirect('/todos');
      //res.render('create', {});
      
  },
  liste: function(req, res) {
      var viewModel = {
          taches: [
              { uniqueId: 1, titre: 'courir un semi marathon', auteur: 'bob', urgence: 2},
              { uniqueId: 2, titre: 'lire reddit', auteur: 'bob', urgence: 1},
              { uniqueId: 3, titre: 'apprendre node.js', auteur: 'joe', urgence: 3},
              { uniqueId: 4, titre: 'manger', auteur: 'joe', urgence: 1}
          ]
      }
      res.render('liste', viewModel);
  }
  
};