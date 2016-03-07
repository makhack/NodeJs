// J'alloue un buffer de taille 10
// les buffer sont fortement optimisable par le moteur js, bcp plus que des String
var buf1 = new Buffer(10);
var buf2 = new Buffer("Bonjour monde du buffet", "utf-8");

//write permet d'crire dans un buffer à une position chioisie
// si les données dépasse la taille du buffer, elles sont tronquées
buf1.write("Bjr dans buffer1", 0);

console.log(buf1.toString());
console.log(buf2.toString());

var buf3 = new Buffer(26);
for (var i = 0; i < 26; i++) {
    buf3[i]= i + 97; // 97 code ASCII de 'a'
}

console.log(buf3.length);
console.log(buf3.toString());

var buf4 = Buffer.concat([buf1, buf2]);
console.log(buf4.toString());

console.log(buf1.compare(buf2));
console.log(buf2.compare(buf1));

//////////////////////////////////////////////////////////////////////////////
// Stream en nodejs                                                         //
// 4 types de stream/flux en node.js                                        //
// Readable -> en lecture                                                   //
// Writabe -> en ecriture                                                   //
// duplex-> lecture/ecriture                                                //
// transforme -> transforme/modifie les données entre l'entrée et la sortie //
// un flux est en fait un eventEmitter                                      //
//                                                                          //
// Par exemple                                                              //
// data -> Quand des donées sont disponibles                                //
// end -> Quand plus de données à lire                                      //
// finish -> Quand il n'y a pluis de données à ecrire                       //
// error -> En cas d'erreur                                                 //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////

// Je récupère le module d'accès au systeme de fichiers
var fs = require('fs');

// Lecture d'n fichier
var lecteur = fs.createReadStream('sample.txt');
var data = '';

lecteur.setEncoding('UTF8');
//Call back appelé losqu'on recoit des données
lecteur.on('data', function(donnee){
    console.log('data received');
    data += donnee;
});

lecteur.on('end', function(){
    console.log('stream is closed');
    console.log(data);
});

var ecrivain = fs.createWriteStream('sortie.txt');

ecrivain.on('finish', function(){
   console.log("ecriture fichier terminé");
});

for (var i = 0; i <= 10; i++) {
    ecrivain.write("bonjour " + i, 'UTF8');
}

ecrivain.end();

console.log('fini');

var zlib = require('zlib');

fs.createReadStream('sample.txt')
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('sample.txt.gz'));

console.log('fini');