var apikey = 'DapbcEr1KiQr2PsHsAR6NSrxYdHiRH3m';

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



// API facebook
window.fbAsyncInit = function() {
  FB.init({
    appId            : '262766577827587',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.0'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));



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
      $("#image").html("<img id='imagen-gif' src='" + firstgif + "'>");

      //getDataPost(firstgif);
      // $("#cont-publish-card").css("display","none");

    });
  }


  $("#submitButton").on("click", function () {
    var query = $("#inputQuery").val();
    getGif(query);
  });


  var databaseService = firebase.database();
  var referencia = databaseService.ref('CardPost');
  console.log(databaseService);

  function addPost() {
    var description = $("#publish-testarea").val();
    var firstgif = $('#imagen-gif').attr("src");
    var photoPuPerfil = $("#photo-profile").attr('src');
    var namePuPerfil = $("#name-profile").text();
    console.log(firstgif);
    var finalTemplate = "";
    finalTemplate = templateCard.replace("__image-post__", firstgif)
      .replace("__description__", description).replace("__name-profile__", namePuPerfil).replace("__image-profile__", photoPuPerfil);

      referencia.set({
        plantilla: finalTemplate
      });

      $('#publish-testarea').val("");
      $('#inputQuery').val("");
      $('#imagen-gif').attr("scr","");



    $('#publish-card-cont-post').append(finalTemplate);

    $("#share").click(shareOnFacebook);

    /* ALEX*/

  var count = 0;

  $("#like").click(function() {
      count++;
      $('#contador').html("Puntos: "+ count)
  });
  
  $("#dislike").click(function() {
      count--;        
      $('#contador').html("Puntos: "+ count)
  }); 


  }

   // post button
  $("#post").click(addPost);

// share facebook

function shareOnFacebook() {
  var imgGif = $('#imagen-gif').attr('src');
  console.log(imgGif);
  console.log('entra facebook');

  FB.ui({
    method: 'share',
    display: 'popup',
    href: imgGif,
  }, function(response){});
}
  
// $("#share").click(shareOnFacebook);


})


// post's variables


var templateCard = '<div class="card containerNewsfeed" id="cont-publish-card">' +
  '<div class="container-fluid p-0 inlineblockcard">' +
  '<div class="col col-3 offset-1 justify-content-sm-center p-0">' +
  '<img  class="img-fluid img-thumbnail rounded-circle" src="__image-profile__" alt="Responsive image" style="width: 4rem;">' +
  ' </div>' +
  '<div  class="col col-8">' +
  '<h5>__name-profile__</h5>' +
  '</div>' +
  '</div>' +
  '<div class="container-fluid">' +
  '<div class="">' +
  '<img class="card-img-top" src="__image-post__" class="img-responsive espacio-imagen center-block" >' +
  '<div class="card-body">' +
  '<p class="card-text text-justify"">__description__</p>' +
  '</div>' +
  '</div>' +
  '<div class="row container-fluid">' +
  '<div id="contador" class="row offset-1">Puntos: </div>' +
  '</div>' +
  '<div class="row container-fluid mt-1 mb-1">' +
  '<div class="col col-1 offset-1">' +
  '<span id="like"><img src="assets/images/pac-man-512x512.png" style="width: 1.2rem;"></span>' +
  '</div>' +
  '<div class="col col-1 offset-1">' +
  '<span id="dislike"><img src="assets/images/ghost1.png" style="width: 1.2rem;"></span>' +
  '</div>' +
  '<div class="col col-sm-6">' +
  '<button type="button" id="share" class="btn btn-primary offset-6">Share<i class="fab fa-facebook-f"></i></button>' +
  '</div>' +
  '</div>' +
  '</div>';


// FRANCIA ma



// Se obtiene la data del usuario al aceptar
$('#login').click(function () {
  firebase.auth()
    .signInWithPopup(provider)
    .then(function (result) {
    })
});


document.getElementById('logout').addEventListener('click', function () {
  console.log('click');
  firebase.auth().signOut();
 
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    document.getElementById('user-menu').style.display = 'block';
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

   

  } else {
    console.log('no existe usuario');

    $("#user-menu").css('display', 'none');
    document.getElementById('profile').style.display = 'none'
    $('#profile').css('display', 'none!important');
    

  }
});





