var fs = require('fs');

module.exports = {
    create : function(req, res){
        console.log("title" + req.body.title);
        console.log("description" + req.body.description);
        console.log("filename=" + req.files[0].originalname);
        console.log("chemin fichier temporaire" + req.files[0].path);
        res.redirect('/');
    }
};