$(document).ready(function(){
    $('#post-comment').hide();
    
    $('#btn-comment').on('click', function(event){
        event.preventDefault();
        $('#post-comment').slideDown();
    });
    
    
   $('#btn-like').on('click', function(event){
     event.preventDefault();
     // var imgId = $(this).attr('data-id');
     // je récupere l'identifiant de l'image associé a ce boton like
     var imgId = $(this).data('id');  
     $.post('/images/' + imgId + "/like").done(function(data){
         // mise a jour du compteur de like de l'image dans la page
         $('.likes-count').text(data.likes);
     });
   });
});