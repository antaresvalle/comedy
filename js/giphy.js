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

    });
  }

  $("#submitButton").on("click", function () {
    var query = $("#inputQuery").val();
    getGif(query);
  });

  function getDataPost(firstgif) {

    var description = $("#publish-testarea").val();
    addPost(description);
    $("#modal-description").val("");
    $("#publish-gif").attr('src', "");

  }

  function addPost(description, firstgif) {
    console.log(firstgif);
    var finalTemplate = "";
    finalTemplate = templateCard.replace("__image-post__", firstgif)
      .replace("__description__", description);
    $('#publish-card-cont-post').append(finalTemplate);
  }

  // post button
  $("#post").click(getDataPost);


})



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



