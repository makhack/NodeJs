var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/mongotest');
mongoose.connection.on('open', function(){
    console.log('connected to mongodb');
    
    // un schéma mongoose défini la structure d'un objet javascript
    // à stocker dans mongodj, c'est à dire ses champs, leurs types, et diverses
    // contraintes sir eurs valeurs
    var CompteUtilisateur = new Schema({
        "username": {type:String},
        "date_creation" : {type:Date, default: Date.now},
        "email" : {type: String},
        "actif" : {type: Boolean, default: false},
        "age" : {type: Number, required : true, min :0, max: 130}
    });
    //ajout d'un fonction "custom" dans le model Compteutilisateur
    CompteUtilisateur.statics.findOldest = function(callback){
        this.find({}, {}, {sort: {'age': -1}}, callback);
    };
        
    var CompteModel = mongoose.model('CompteUtilisateur', CompteUtilisateur);
    
    var newUser = new CompteModel({"username" : "bob","email" : "bob.inette@boby.com", "age" : (Math.random() * 30) + 10});
    console.log(newUser.username);
    console.log(newUser.date_creation);
    console.log(newUser.email);
    console.log(newUser.actif);
    
    console.log("----------------------------");
    
    // enregistrement des modification
    newUser.save(function(err, user){
        if(err) throw err;
        
        console.log('insertion réussie');
        console.log(user._id);
        console.log(user.username);
        console.log(user.date_creation);
        console.log(user.email);
        console.log(user.actif);
        console.log(user.age);
        
        console.log("requettage base");
        // $gt -> strictement supérieur ( greater than)
        // $lte -> inférieu ou égal (lesser than or equals)

        CompteModel.find({age : { $gt : 15, $lte: 30 }}, function(err, comptes){
            if (err) throw err;
            console.log("Nombres de comptes : "+ comptes.length);
            for (var i = 0; i < comptes.length; i++) {
                console.log(comptes[i]._id + " ; " + comptes[i].date_creation + " ; " + comptes[i].age);
            }
        });
        
        // $gt -> strictement supérieur ( greater than)
        // $lte -> inférieu ou égal (lesser than or equals)
        // CompeModel.find({age : { $gt: 15, $lte: 30}), function (err, comptes){}
        
        // le deuxieme paramettre, si ce n'est as un callback, détermine els champs a renvoyé au lieux de de renvoyer la totalité de l'objet
        // _ id est envoyé par défaut, pour ne pas l'avoir, il faut l'indiquer avec _id : false

        CompteModel.find(
            {age : { $gt : 15, $lte: 30 }},
            {age : true, date_creation: true},
            function(err, comptes)
            {
            console.log("requettage base 2 :");       
            if (err) throw err;
            console.log("Nombres de comptes : "+ comptes.length);
            for (var i = 0; i < comptes.length; i++) {
                console.log(comptes[i]._id + " ; " + comptes[i].date_creation + " ; " + comptes[i].age);
            }
        });
        
        
        //cette fois ci, on utilise un troisieme parametre, pour trier et limiter les objets renvoyés
        CompteModel.find(
            {age : { $gt : 15, $lte: 30 }},
            /*{}*/{age : true, date_creation: true},
            {limit: 5, sort : { 'age' : 1 }},
            function(err, comptes)
            {
            console.log("requettage base 3 :");       
            if (err) throw err;
            console.log("Nombres de comptes : "+ comptes.length);
            for (var i = 0; i < comptes.length; i++) {
                console.log(comptes[i]._id + " ; " + comptes[i].date_creation + " ; " + comptes[i].age);
            }
        });
        
        CompteModel.findOldest(function(err, results){
            for (var i = 0; i < results.length; i++) {
                console.log(results[i].username);
                console.log(results[i]._id + " ; " + results[i].date_creation + " ; " + results[i].age);
            }
        });
    });
});