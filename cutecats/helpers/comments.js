var Models = require('../models'),
    async = require('async');

module.exports = {
    newest : function(callback){
        Models.Comment.find({}, {}, { limit : 5, sort:{'timestamp' : -1}}, function(err, comments){
            async.each(comments, 
                function(comment, next){
                    //function appelée pour chaque comment dans comments
                    Models.Image.findOne({_id : comment.image_id}, function(err, image){
                        if(err) throw err;
                        comment.image = image;
                        next(err);
                    });
                },
                function(err){
                // fonction appellée quand tous les callback du each on fini
                if(err) throw err;
                //nous renvoyons le tableau des derniers commentaires
                // enrichis avec leur image associée
                callback(err, comments); 
                }
            );
        });
    }
}