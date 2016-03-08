var  express = require('express'),
     router = express.Router(),
     todo = require('../controllers/todo');
 
module.exports = function(app) {
    
    router.get('/', todo.index);
    router.get('/todos', todo.liste);
    router.post('/todos', todo.create);
    
    app.use(router);  
};