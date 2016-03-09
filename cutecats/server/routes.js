var  express = require('express'),
     router = express.Router(),
     home = require('../controllers/home'),
     image = require('../controllers/image');
 
module.exports = function(app) {
    
    router.get('/', home.index); // page d'accueil -> methode index du controller home
    router.post('/images', image.create); // upload d'image
    
    app.use(router);  
};