var events = require('events');

var eventEmitter = new events.EventEmitter();

var ecouteur1 = function(){
    console.log("Appel ecouter1");
};

var ecouteur2 = function(){
    console.log('Appel ecouteur 2');
};

var ecouteur3 = function(){
    console.log("Appel ecouteur 3");
};

var ecouteur4 = function(){
    console.log("Appel ecouteur 4");
};


eventEmitter.on('connection', ecouteur1);
eventEmitter.once('connection', ecouteur4); // sera appelé une seule fois

eventEmitter.on('déconnection', ecouteur2);

console.log('------------------------');
eventEmitter.emit('connection');
console.log('------------------------');
eventEmitter.emit('déconnection');

eventEmitter.addListener('connection', ecouteur3);
console.log('------------------------');
eventEmitter.emit('connection');
console.log('------------------------');