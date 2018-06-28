var count = 0;

$("#like").click(function() {
    count++;
    $('#contador').html("Puntos: "+ count)
});

$("#dislike").click(function() {
    count--;        
    $('#contador').html("Puntos: "+ count)
});
        
    
