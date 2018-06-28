$(document).ready(function () {
    // post button
    $("#post").click(getDataPost);
});

// post's variables
var templateCard = '<div class="card containerNewsfeed">'+
'<div class="row container-fluid">'+
'<div id="user-photo" class="col col-3 offset-1 justify-content-sm-center">'+
'<img class="img-fluid img-thumbnail rounded-circle" src="./assets/images/Usuario.jpg" alt="Responsive image" style="width: 4rem;">'+
' </div>'+
'<div id="user-name" class="col col-8">'+
'<h5>Name</h5>'+
'</div>'+
'</div>'+
'<div class="container-fluid">'+
'<div class="card" >'+
'<img class="card-img-top" src="__image-post__" alt="Card image cap">'+
'<div class="card-body">'+
'<p class="card-text">__description__</p>'+
'</div>'+
'</div>'+
'</div>'+
'<div class="row container-fluid">'+
'<div class="col col-sm-5 offset-1">'+
'<a href="">'+
'<img src="assets/images/pac-man.png" alt="">'+
' </a>'+
'<a href="">'+
'<img src="assets/images/ghost.png" alt="">'+
'</a>'+
'</div>'+
'<div class="col col-sm-6">'+
'<button type="button" class="btn btn-secondary col col-sm-3 offset-sm-9">Share<i class="fab fa-facebook-f"></i></button>'+
'</div>'+
'</div>'+
'</div>';


function getDataPost() {
    var description = $("#publish-testarea").val();
    var srcPost = $("#publish-gif").attr('src');
    addPost(description, srcPost);

    $("#modal-description").val("");
    $("#publish-gif").attr('src', "");
}

function addPost(description, srcPost) {
    var finalTemplate = "";
    finalTemplate = templateCard.replace("__image-post__", srcPost)
        .replace("__description__", description);
    $('#publish-card-cont-post').append(finalTemplate);
}