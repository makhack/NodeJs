var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home')

module.exports = function(app){
    router.get('/', home.index);
    
    app.use(router);
}