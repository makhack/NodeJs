var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path');
    
var ImageSchema = new Schema({
    title:       {type: String},
    description: {type: String}, 
    filename:    {type: String},
    views:       {type: Number, default:0},
    likes:       {type: Number, default:0},
    timestamp:   {type: Date, default : Date.now}
});
    
ImageSchema.virtual('uniqueId')
            .get(function(){
                return this.filename.replace(path.extname(this.filename), '');
            });
            
module.exports = mongoose.model('Image', ImageSchema);
/*module.exports = {
  images: [
            {
                uniqueId: 1,
                title: 'sample image 1',
                description: '',
                filename: 'sample1.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now()
            },
            {
                uniqueId: 2,
                title: 'sample image 2',
                description: '',
                filename: 'sample2.jpg',
                views: 0,
                likes: 0,
                timestamp: 1457451227704
            },
            {
                uniqueId: 3,
                title: 'sample image 3',
                description: '',
                filename: 'sample3.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now()
            }
        ]
};*/