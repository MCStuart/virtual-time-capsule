// Business Logic
function passwordConfirm(userPassword, userPasswordConfirm, email){
  console.log(userPassword);
  console.log(userPasswordConfirm);
  console.log(email);
  if (userPassword === userPasswordConfirm) {
    createUser(email, userPassword);
    loginUser(email, userPassword);

  } else {
    alert ("Passwords don't match");
  }
}

// User Interface Logic
$(document).ready(function() {
  $("button.btn").click(function(){ // Enter Website
    $("div.titleSplash").hide();
    $("main.loginScreen").show();
  });
  $("button#login").click(function() {
    var email = $("input.user-email").val();
    var password = $("input.user-password").val();
    loginUser(email, password);

  })
  $("button.btn-small").click(function(){ // Displays Site Registration Section
    $("main.loginScreen").hide();
    $("main.registerScreen").show();
  });
  $("#registerNewUser").click(function(){ // Registers and Logs in new User
    // $("main.registerScreen").hide();
    $("main.loginScreen").hide();
    var userPassword = $("#user-password").val();
    var userPasswordConfirm = $("#user-password-confirm").val();
    var email = $("#user-email").val();
    passwordConfirm(userPassword, userPasswordConfirm, email);

  });
});
