// Virtual Time Capsule, a time-limited digital repository
// Copyright (C) 2019  Stuart McKay, Nathan Aden, Dominic Montelongo, Elizabeth Kelley
// Business Logic
var splash = false;

function passwordConfirm(userPassword, userPasswordConfirm, email) {
  console.log(userPassword);
  console.log(userPasswordConfirm);
  console.log(email);
  if (userPassword === userPasswordConfirm) {
    createUser(email, userPassword);
    loginUser(email, userPassword);

  } else {
    alert("Passwords don't match");
  }
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (splash) {
      redirectCheck()
    }
  } else {

  }
});


function redirectCheck() {
  if (firebase.auth().currentUser) {
    var id = firebase.auth().currentUser.uid;
    var docRef = db.collection("capsules").doc(id);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        location.href = "unbury.html";
      } else {
        location.href = "capsuleCreate.html";
      }
    });
  }
}

// User Interface Logic

$(document).ready(function() {

  $("#splashButton").click(function() {
    splash = true;

    if (firebase.auth().currentUser) {
      redirectCheck();
    } else {
      $("div.titleSplash").hide();
      $("main.loginScreen").show();
    }
  });

  $("#login").click(function() {
    var email = $("input.user-email").val();
    var password = $("input.user-password").val();
    loginUser(email, password);
  })

  $('input.user-password').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        var email = $("input.user-email").val();
        var password = $("input.user-password").val();
        loginUser(email, password);
      }
  });


  $("#newUserButton").click(function() { // Displays Site Registration Section
    $("main.loginScreen").hide();
    $("main.registerScreen").show();
  });

  $("#registerNewUser").click(function() { // Registers and Logs in new User
    $("main.loginScreen").hide();
    var userPassword = $("#user-password").val();
    var userPasswordConfirm = $("#user-password-confirm").val();
    var email = $("#user-email").val();
    passwordConfirm(userPassword, userPasswordConfirm, email);
  });
});
