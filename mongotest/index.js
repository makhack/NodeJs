// récuperation du client mongodb
var MongoClient = require('mongodb').MongoClient;

// connection a la base
MongoClient.connect('mongodb://localhost:27017/mongotest', function(err, db){
   if(err) throw err;
   // db est l'objet
   console.log('connected to mongotest');
   var collectionFilm = db.collection("films");
   collectionFilm.insert({
       "titre" : "la cité de la peur",
       "annee" : 1994,
       "realisateur" : "chabat",
       "rating" : 5 
       }, function(err, result){
           if(err) throw err
           //ici result contient les informations sur l'operation réalisé
           // dont, dans le cas présent, ops contient les lignes insérées
           console.log(result.ops.length + "document inserted");
           for (var i = 0; i < result.ops.length; i++) {
               console.log(result.ops[i]._id +" -> "+ result.ops[i].titre);
           }
           // fondOne renvoie le preiere enregistrement qui remplit la clause
           // where fournie
           collectionFilm.findOne({"titre" : "la cité de la peur"}, function(err, doc){
               if(err) throw err;
               console.log("film : "+ doc._id + " -> " + doc.title);
           });
       });
;});