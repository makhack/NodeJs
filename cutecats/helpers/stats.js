var Models = require('../models'),
    async = require('async');

module.exports = function(callback) {
    
    async.parallel([
        function(next){
            //je compte les images et rappelle le callback d'async(next) avec le résultat
            Models.Image.count({}, next);
        },
        function(next){
            Models.Comment.count({}, next);
        },
        function(next){
            // aggregation des vues tables
            //c.a.d somme des vues des images
            // 1er argument de aggregate, la spécification du regroupement
            // et le calcul a effectuer
            // 2eme argument: le callback avec en parametre un tableau
            // Dans ce tableau chaques ligne = un group
            // chaque attribut de cette ligne correspond a un des calculs demandés
            // dans la spécification des calculs (ici  seul, viewsTotal) 
            Models.Image.aggregate({ $group : { _id: '1', viewsTotal: { $sum : '$views'}}}, function(err, result){
                if(err) throw err;
                var viewsTotal = 0;
                for (var i = 0; i < result.length; i++) {
                    viewsTotal += result[i].viewsTotal;
                }
                next(null, viewsTotal)
            });
        },
        function(next){
            // aggregation des likes totaux
            Models.Image.aggregate({ $group : { _id: '1', likesTotal: { $sum : '$likes'}}}, function(err, result){
                if(err) throw err;
                var likesTotal = 0;
                for (var i = 0; i < result.length; i++) {
                    likesTotal += result[i].likesTotal;
                }
                next(null, likesTotal)
            });
        }
    ], function(err, results){
        if(err) throw err;
        //nous avons ici les résultats des 4 callback
        // appele âr async collectés dans results
        // nous les retransmettons au controller via le callback fournit
        callback(null , {
            images : results[0],
            comments : results[1],
            views: results[2],
            likes: results[3]
        });
    });
    // var stats = {
    //     images: 15,
    //     comments: 25,
    //     views: 42,
    //     likes: 35
    // };
    // callback(null, stats);
};

