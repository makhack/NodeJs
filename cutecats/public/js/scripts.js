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
   
   $('#btn-delete').on('click', function(event){
       event.preventDefault();
       var elem = $(this);
       var remove = confirm('are you wan to delete pour cute Cat ?')
       if(remove){
           var imgId = elem.data('id');
           // nous envoyons une requette HTTP DELETE
           $.ajax({
               url: '/images/'+ imgId,
               type: 'DELETE'
           }).done(function(result){
               if(result){
                   elem.removeClass('btn-danger').addClass('btn-sucess');
                   elem.find('i').removeClass('fa-times').addClass('fa-check');
                   elem.append('<span> Deleted! </span>');
               }
           })
       }
   })
   
});