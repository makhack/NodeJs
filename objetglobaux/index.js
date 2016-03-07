console.log('fichier actuel' + __filename);
console.log('repertoire actuel'+ __dirname);

console.log("env="+ process.env);

for(var prop in process.env){
    console.log(prop);
}

var port = process.env.PORT || 3456;

console.log('port='+port);