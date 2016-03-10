var fs = require('fs'),
    Models = require('../models'),
    path = require('path'),
    sidebar = require('../helpers/sidebar'),
    md5 = require('MD5');

module.exports = {
    create: function (req, res) {
/*      console.log("titre = " + req.body.title);
      console.log("description = " + req.body.description);
      console.log("filename = " + req.files[0].originalname);
      console.log("chemin fichier temporaire = " + req.files[0].path);
      // redirection "classique"
      res.redirect('/');*/
      var possible = "abcdefghijklmopqrstuvwxyz0123654789";
      var imgUrl='';
      for(var i = 0; i < 6; i++){
          // je tire un caractere au hasard, 6 fois
          imgUrl += possible.charAt(Math.floor( Math.random() * possible.length));
      }
      Models.Image.find({filename: imgUrl}, function(err, images){
          if(images.length > 0){
              console.log('image déjà existante, jouez au loto ...');
          }
          else{
              //je récupère le chemin du fichier temporaire
              var tpmPath =  req.files[0].path;
              // on récuere l'extension
              var ext = path.extname(req.files[0].originalname).toLowerCase();

              if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || '.gif'){
                                // on construit le chemin cible
                var targetPath = path.resolve('./public/uploads/'+ imgUrl + ext);
                // on a un fichier avec le bon type, on le sauvegarder dans l'upload
                fs.rename(tpmPath, targetPath, function(err){
                      if(err) throw err;
                      console.log("déplacement reussi ->"+ targetPath);
                      var newImage = new Models.Image({
                          title: req.body.title,
                          filename: imgUrl + ext,
                          description : req.body.description
                      });
                      
                      newImage.save(function(err, image){
                          console.log('image saved ->' + image.uniqueId)
                          res.redirect('/'); // a changer par la suite
                      });
                  });
              }
              else{
                  console.log('effacement fichier temporaire non accepté');
                  fs.unlink(tmpPath, function(err){
                      if(err) throw err;
                      res.json(500, {error:'only images are allowed'});
                  })
              }
          }
      });
    },
    index: function(req, res){
      var viewModel = {
          image : {},
          comments: {}
      };
      
      console.log("affichage image " + req.params.image_id);
      // récupérer l'image depuis la base mongodb
      Models.Image.findOne({ filename : { $regex : req.params.image_id}}, function(err, image){
          if (err) throw err;
          // nous avons votre enregistrement image
          if(image){
            image.views = image.views + 1;
            viewModel.image = image;
            image.save();
            // je veux récuperer les commentaires associés à l'image
            console.log(image._id);
            Models.Comment.find({image_id: image._id},{},{sort : {timestamp : 1}}, function(err, comments){
                if(err) throw err;
                console.log(comments.length);
                viewModel.comments = comments;
                sidebar(viewModel, function(err, viewModel){
                    if(err) throw err;
                    res.render('image', viewModel);
                });
            });
          }
      });
    },
    // cette action sera appeler en ajax et renvoie du json
    like: function(req, res){
        Models.Image.findOne({ filename : { $regex: req.params.image_id }}, function(err, image){
            if(!err && image){
                image.likes = image.likes + 1 ;
                image.save(function(err){
                    if(err) throw err;
                    // res.json encode en json le paramettre passé et renvoie la réponse
                    res.json({likes: image.likes});
                });
            }
            else{
                res.json(500, {error: 'unknow image'});
            }
        });  
    },
  comment: function(req, res){

      Models.Image.findOne({ filename : { $regex: req.params.image_id }}, function(err, image){

         // nous avons récuperer l'image qui sera associé au commentaire
         if(!err && image){

             var newComment = new Models.Comment(req.body);
             newComment.gravatar = md5(newComment.email);
             newComment.image_id = image._id;
             newComment.save(function(err, comment){
                 if(err) throw err;
                 res.redirect("/images/" + image.uniqueId + "#" + comment._id); 
             });
             
         }else{
             res.redirect('/');
         }
      });
  },
  remove : function(req, res){
    Models.Image.findOne({ filename : { $regex: req.params.image_id }}, function(err, image){
        if (err) throw err;
        fs.unlink(path.resolve('.public/uploads' + image.filename), function(err){
            Models.Comment.remove({ image_id: image._id}, function(err){
                if(err) throw err;
                image.remove(function(err){
                    if(!err){
                        res.json(true);
                    }else{
                        res.json(false);
                    }
                });
            })
        })

    });      
  }
};