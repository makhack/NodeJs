var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    zlib = require('zlib'),
    path = require('path');
    
    
    var port = process.env.PORT || 8080;
    http.createServer(function(req, res){
        // exemple si j'ai une url http://localhost:8080/toto.txt
        // Il me renvera /toto.txt
        var pathFile = url.parse(req.url).pathname;
        var fname = pathFile.substr(1);
        var chemin = path.join(__dirname, "content", fname);
        
        console.log('request vers :' + chemin);
        
        var directoryResponse = function(req, res){
            res.writeHead(200, {"Content-type" : "text/html; charset=utf-8"});
            res.write('<h1> Vous avez demandé '+ fname +'</h1>');
            res.end();
        };
        
        var fileResponse = function(req,res){
            res.writeHead(200, {"Content-type" : "text/html"});
            var lecteur = fs.createReadStream(chemin);
            // ecrit directement dans la reponse le contenu du fichier
            lecteur.pipe(res);
        };
        
        var zipResponse = function (req, res){
            res.writeHead(200,
            {"Content-Type":"application/zip",
            "Content-Disposition" : 'attachment; filename="'+fname+'"'}
            );

            // On enleve le .gz du fichier a lire
            var lecteur = fs.createReadStream(chemin)
            .pipe(zlib.createGzip())
            .pipe(res);
        };
        
        var isZip = false;
        if(chemin.endsWith(".gz")){
            isZip = true;
            chemin = chemin.substr(0, chemin.length -3);
        }
        
        fs.stat(chemin, function(err, stats){
            
            if(err){
                res.writeHead(500);
                res.write("Erreur a l'ouverture du fichier");
                res.end();
            }else{
                if(stats.isDirectory()){ 
                    directoryResponse(req, res);
                }else if(stats.isFile() && isZip){
                    zipResponse(req,res);
                }
                else if(stats.isFile()){
                    fileResponse(req,res);
                }
                else{
                res.writeHead(404);
                res.write("fichier non trouvé") 
                res.end();
                }
            }

            
        });
        
    }).listen(port);
    
    console.log("serveur démarré sur http://localhost:" + port);