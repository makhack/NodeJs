var async = require('async');

async.parallel([
    function(next){
        console.log('appel du callback 1');
        next();
    },
    function(next){
        console.log('appel du callback 2');
        next();
    },
    function(next){
        console.log('appel du callback 3');
        next();
    }], function(err, result){
        console.log("parallel terminé");
    }
);

console.log('fini');

async.parallel([
    function(next){
        console.log('appel du callback A');
        next(null,"donnee A");
    },
    function(next){
        console.log('appel du callback B');
        next(null,"donnee B");
    },
    function(next){
        console.log('appel du callback C');
        next(null,"donnee C");
    }], function(err, result){
        
        console.log("parallel terminé");
        console.log("Nombre resultats=" + result.length);
        
        for (var i = 0; i < result.length; i++) {
            console.log('resultat ' + i + ' -> result = '+ result[i]);
        }
    }
);

var tab = ['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];

console.log('test de async.each');

var tab2 = [];

async.each(tab, function(item, next){
        console.log(item);
        tab2.push(item.toUpperCase());
        next();
    }, function(err){
    for (var i = 0; i < tab2.length; i++) {
        console.log('resultat ' + i + ' -> ' + tab2[i]);
    };
});