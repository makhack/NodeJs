var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;//type clé mongodb
    
var ProduitSchema = new Schema({
    nom:        {type: String},
    prix:       {type: Number, default: 0},
    poids:      {type: Number, default: 0, min: 0},
    stock:      {type: Number, default: 0, min: 0},
    timestamp:  {type: Date, default : Date.now},
    categorie_id:  {type: String}
});
            
module.exports = mongoose.model('Produit', ProduitSchema);