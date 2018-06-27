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


// $("#login").click(function () {
//     firebase.auth()
//         .signInWithPopup(provider)
//         .then(function (data) {
//             var user = data.user;
//             console.log(user);
//             $(".inicio").hide();
//             $(".usuario").show();
//             $(".user-image").attr("src", user.photoURL);
//             $("#name").text("Nombre: " + user.displayName);
//             $("#email").text(user.email);


//         }).catch(function (error) {
//             console.log(error);

//         });
// });


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



// Mostramos o no la información del usuario de acuerdo a su status
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // Si el usuario esta logeado
        $(".inicio").hide();
        $(".usuario").show();
        $(".user-image").attr("src", user.photoURL);
        $("#name").text("Nombre: " + user.displayName);
        $("#email").text(user.email);
    } else {
        // Si no esta logeado
        $(".inicio").show();
        $(".usuario").hide();
    }
});


$("#close").click(function () {
    firebase.auth().signOut().then(function () {
        $(".inicio").show();
        $(".usuario").hide();
    })
});



firebase.auth().signOut().then(function () {
    // Sign-out successful.
}).catch(function (error) {
    // An error happened.
});