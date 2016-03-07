var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    zlib = require('zlib');
    
    
    var port = process.env.PORT || 8080;
    http.createServer(function(req, res){
        // exemple si j'ai une url http://localhost:8080/toto.txt
        // Il me renvera /toto.txt
        var pathFile = url.parse(req.url).pathname;
        var fname = pathFile.substr(1);
        res.writeHead(200, "'Content-type':'text/html'");
        res.write('<h1> Vous avez demandez '+ fname +'</h1>');
        res.end();
        
    }).listen(port);
    
    console.log("serveur démarré sur http://localhost:" + port);