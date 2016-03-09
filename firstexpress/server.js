var express = require("express"),
    path = require('path');

// creation de l'application express
var app = express();



app.get('/', function(req,res){
    res.send("bonjour depuis exress");
});

app.get('/info', function(req,res){
    res.send("Serveur tournant sous node js et express");
});

app.get('/add/:param1/:param2', function(req,res){
    var result = req.params.param1 + req.params.param2;
    res.send(result);
});

app.get('/test/:param1', function(req, res){
    res.send("vous avez demandé " + req.params.param1);
});

//sert a servir des fichier statiques (html, js, image, etc...)
app.use('/public/', express.static(path.join(__dirname, './public/')));

var server = app.listen(process.env.PORT || 8081, function(){
    var port = server.address().port;
    console.log("serveur démarré : http://localhost: " + port);
});
