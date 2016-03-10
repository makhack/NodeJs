var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    multer = require('multer'),
    moment = require('moment');

module.exports = function(app) {
    app.engine('handlebars', exphbs.create( {
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',  // ici je peu définir directement un réperoire
        partialsDir: [app.get('views') + '/partials'], // au cas ou plusieurs, je peux utiliser un tableau
        helpers: {
            timeago: function(timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            }
        }       
    }).engine);
    
    app.use(morgan('dev'));
    
    app.use(bodyParser.urlencoded({'extends' : true}));
    
    app.use(multer({ dest: path.join(__dirname, '../tmp/upload')}).any());
    
    app.use(methodOverride());
    
    app.use(cookieParser('ma-valeur-secrete'));
    
    routes(app);
    
    app.use('/public/', express.static(path.join(__dirname,'../public')));
    
    if('development' === app.get('env')){
        app.use(errorHandler());
    }
    
    return app;
    
    
    
}