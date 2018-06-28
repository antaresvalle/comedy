var apikey = 'DapbcEr1KiQr2PsHsAR6NSrxYdHiRH3m';

$(document).ready(function () {

  function encodeQueryData(data) {
    var ret = [];
    for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  }

  function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }


  function getGif(query) {
    query = query.replace(' ', '+');
    var params = { 'api_key': apikey, 'q': query };
    params = encodeQueryData(params);

    // api from https://github.com/Giphy/GiphyAPI#search-endpoint 

    httpGetAsync('https://api.giphy.com/v1/gifs/search?' + params, function (data) {
      var gifs = JSON.parse(data);
      var firstgif = gifs.data[0].images.fixed_width.url;
      console.log(firstgif);
      $("#image").html("<img src='" + firstgif + "'>");
      
      getDataPost(firstgif);
      $("#cont-publish-card").css("display","none");

    });
  }
  

  $("#submitButton").on("click", function () {
    var query = $("#inputQuery").val();
    getGif(query);
  });

  function getDataPost(firstgif) {

    var description = $("#publish-testarea").val();
    addPost(description,firstgif);
    $("#modal-description").val("");
    $("#publish-gif").attr('src', "");

  }

  function addPost(description,firstgif) {
    console.log(firstgif);
    var finalTemplate = "";
    finalTemplate = templateCard.replace("__image-post__", firstgif)
      .replace("__description__", description);
    $('#publish-card-cont-post').append(finalTemplate);
    $("#cont-publish-card").css("display","block");

  }



  // post button
  $("#post").click(addPost);


})



// post's variables
var templateCard = '<div class="card containerNewsfeed" id="cont-publish-card">'+
'<div class="row container-fluid">'+
'<div id="user-photo" class="col col-3 offset-1 justify-content-sm-center">'+
'<img id="user-photo" class="img-fluid img-thumbnail rounded-circle" src="./assets/images/Usuario.jpg" alt="Responsive image" style="width: 4rem;">'+
' </div>'+
'<div id="user-name" class="col col-8">'+
'<h5 id="user-name">Name</h5>'+
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
'<div id="contador"></div>'+
'<a id="like" href="#"><i class="far fa-heart"></i></a>'+
'<a id="dislike" href="#"><i class="far fa-frown"></i></a>'+
'</div>'+
'<div class="col col-sm-6">'+
'<button type="button" id="share" class="btn btn-primary offset-6">Share<i class="fab fa-facebook-f"></i></button>'+
'</div>'+
'</div>'+
'</div>';

// FRANCIA ma
var provider = new firebase.auth.GoogleAuthProvider();

var config = {
    apiKey: "AIzaSyDFuzbP725qXoImrSmo6nov90OiPBtHnmw",
    authDomain: "comedy-app.firebaseapp.com",
    databaseURL: "https://comedy-app.firebaseio.com",
    projectId: "comedy-app",
    storageBucket: "comedy-app.appspot.com",
    messagingSenderId: "710197328215"
};
firebase.initializeApp(config);



// Se obtiene la data del usuario al aceptar
$('#login').click(function () {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
        })
});


document.getElementById('logout').addEventListener('click', function(){
    console.log('click');
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById('user-menu').style.display='block';
        var email = user.email;
        var name = user.displayName;
        var img = user.photoURL;

        $('#exampleModal').modal("hide");
        $('#exampleModal').attr("style", "display: none");

        console.log(email, name, img);


        $("#user-photo").attr("src", img);
        $("#user-name").append(name);

        $("#photo-profile").attr("src", img);
        $("#name-profile").append(name);
        $("#email-profile").append(email);
    
    } else{
        console.log('no existe usuario');
        document.getElementById('user-menu').style.display='none';
    }
});

// share facebook

function shareFacebook(){
  
  console.log();
}