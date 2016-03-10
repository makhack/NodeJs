var express = require('express'),
    mongoose = require('mongoose'),
    config = require('./server/configure.js'); // c'est ici que l'on configurera le serveur
    
var app = express();

app.set('port', process.env.PORT || 8081);
app.set('views', __dirname + 'views');

app = config(app);

mongoose.connect('mongodb://localhost/ecommerce'); //connection a la base mongodb
mongoose.connection.on('open', function(){
    console.log("connection a la base réussie");
    var server = app.listen(app.get('port'), function() {
    console.log("serveur démarré sur http://localhost:" + app.get('port')); 
    });
})
