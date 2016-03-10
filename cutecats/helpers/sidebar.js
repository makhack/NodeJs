var stats = require('./stats');

module.exports = function(viewModel, callback) {
    // l'appel a sidebar collecteras les données nécéssaire à l'affichage
    // de celle-ci, a savoir
    //  1) les statistiques (nbr de likes, views, etc.)
    //  2) les images les plus populaires
    //  3) les derniers commentaires
    // a terme, nous utiliserons async pour requeter ces informations en
    // parallele, pour l'instant, un simple callback
    // par exemple: index -> sidebar(viewModel, callback) -> callback(render....)  
    stats(function(err, result) {
        viewModel.sidebar = {
            stats: result
        };
        callback(err, viewModel);
    });
};