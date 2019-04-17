// Business Logic
function passwordConfirm(userPassword, userPasswordConfirm){
  if ("user-password"==="user-password-confirm") {
    function
  }
}

// User Interface Logic
$(document).ready(function() {
  $("button.btn").click(function(){ // Enter Website
    $("div.titleSplash").hide();
    $("main.loginScreen").show();
  });
  $("button.btn-small").click(function(){ // Displays Site Registration Section
    $("main.loginScreen").hide();
    $("main.registerScreen").show();
  });
  $("#registerNewUser").click(function(){ // Registers and Logs in new User
    $("main.registerScreen").hide();
    $("main.loginScreen").hide();
    var userPassword = $("input#user-password").val();
    var userPasswordConfirm = $("input#user-password-confirm").val();
  });
});
