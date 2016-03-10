var Models = require('../models');

module.exports = {
    popular : function(callback){
        // find :
        // 1ere param -> where
        // 2eme param -> select(choix des champs)
        // 3eme param -> tri, limit ...
        // last param -> callback
        Models.Image.find({},{},{ sort : {likes : -1}, limit: 5}, function(err, images){
            if (err) throw err;
            callback(null, images);
        });
    }
}