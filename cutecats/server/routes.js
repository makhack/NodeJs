var  express = require('express'),
     router = express.Router(),
     home = require('../controllers/home'),
     image = require('../controllers/image');
 
module.exports = function(app) {
    
    router.get('/', home.index); // page d'accueil -> methode index du controller home
    router.get('/images/:image_id', image.index); // -> afficher une image et ses commentaires
    router.post('/images', image.create); // upload d'image
    router.post('/images/:image_id/like',image.like);
    router.post('/images/:image_id/comment',image.comment);
    
    app.use(router);  
};