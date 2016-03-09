var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;//type clé mongodb
    
var CommentSchema = new Schema({
    email:      {type: String},
    name:       {type: String}, 
    gravatar:   {type: String},
    comment:    {type: String},
    timestamp:  {type: Date, default : Date.now}
});
    
CommentSchema.virtual('uniqueId')
            .set(function(){
                this._image = image;
            })
            .get(function(){
                return this._image;
            });
            
module.exports = mongoose.model('Comment', CommentSchema);

/*module.exports = {
  comments: [
      {uniqueId: 1, image_id: 1, email: 'bob@joe.com',
        name:'bob', gravatar: '', comment: 'this is great', timestamp: Date.now()},
      {uniqueId: 2, image_id: 1, email: 'bob2@joe.com',
        name:'bob2', gravatar: '', comment: 'this is lame', timestamp: Date.now()},
      {uniqueId: 3, image_id: 1, email: 'bob3@joe.com',
        name:'bob3', gravatar: '', comment: 'this is ok', timestamp: Date.now()}
  ]  
};*/