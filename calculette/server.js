var express = require("express"),
    path = require('path');

// creation de l'application express
var app = express();

app.get('/', function(req,res){
    res.send("bonjour depuis exress");
});

app.get('/add/:param1/:param2', function(req,res){
    var result = (parseInt(req.params.param1) + parseInt(req.params.param2));
    res.send("" + result);
});

app.get('/sub/:param1/:param2', function(req,res){
    var result = (parseInt(req.params.param1) - parseInt(req.params.param2));
    res.send("" + result);
});

app.get('/mul/:param1/:param2', function(req,res){
    var result = (parseInt(req.params.param1) * parseInt(req.params.param2));
    res.send("" + result);
});

app.get('/div/:param1/:param2', function(req,res){
    var result;
    if(req.params.param2 == 0){
        result = "impossible de divisé par 0";
    }else{
        result = (parseInt(req.params.param1) / parseInt(req.params.param2));
    }

    res.send("" + result);
});

//sert a servir des fichier statiques (html, js, image, etc...)
app.use('/public/', express.static(path.join(__dirname, './public/')));

var server = app.listen(process.env.PORT || 8081, function(){
    var port = server.address().port;
    console.log("serveur démarré : http://localhost: " + port);
});
