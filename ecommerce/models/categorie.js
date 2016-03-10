var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;//type clé mongodb
    
var CategorieSchema = new Schema({
    libelle:      {type: String}
});
            
module.exports = mongoose.model('Categorie', CategorieSchema);
