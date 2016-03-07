console.log("index");

// Tous les chargement de modules ce font via require 
// même ,es propre modules seront chargé avec require
var http = require('http');

// Je crée un serveur, chaque requete http entrant 
// rapellera le callback passé en paramettre de createServeur
// ce call back recevera deux paramattre, la requette entrante 
// et la response a renvoyer
http.createServer(function(request, response){
    response.writeHead(200,"content-type: 'text/plain'");
    response.end('Bonjour monde');
}).listen(8081); // le serveur ecoute sur le port 8081

console.log('serveur démarré sur http://localhost:8081');


