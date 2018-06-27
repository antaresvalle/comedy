
  document.getElementById('logout').addEventListener('click', function(){
    console.log('click');
    firebase.auth().signOut();
});

  
