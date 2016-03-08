module.exports = {
    index : function(req,res){
        
        var viewModel = {
            images: [
            {
                uniqueId: 0,
                title: 'sample image 0',
                description: '',
                filename: 'sample.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now
            },
            {
                uniqueId: 1,
                title: 'sample image 1',
                description: '',
                filename: 'sample.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now
            },
            {
                uniqueId: 2,
                title: 'sample image 2',
                description: '',
                filename: 'sample.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now
            },
        ]
        };
        //res3send('<h1> BONJOUR DEPUIS INDEX</h1>)
        // affichage de la vue index avec pour l'instant un viewModel vide ...
        res.render('index', viewModel);
    }
};