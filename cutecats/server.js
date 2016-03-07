var express = require('express');
config = require('./server/configure.js'); // c'est ici que l'on configurera le serveur

var app = express();

ap.set('port',process.env.PORT ||8081 );
app.set('views', __dirname + '/views'); // répertoire contenant les vues

var server = app.listener(app.get('port'), function() {
    console.log("serveur démarré sur http://localhost: " + app.get('port'));
});