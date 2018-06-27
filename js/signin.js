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
            var email = result.user.email;
            var name = result.user.displayName;
            var img = result.user.photoURL;

            $('#exampleModal').modal("hide");
            $('#exampleModal').attr("style", "display: none");

            console.log(email, name, img);
            

        })
});


