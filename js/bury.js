// Virtual Time Capsule, a time-limited digital repository
// Copyright (C) 2019  Stuart McKay, Nathan Aden, Dominic Montelongo, Elizabeth Kelley
//Login / Logout
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#loginId").text(user.email)
    $('.loginScreen').hide();
    $('.wrapper').css("display", "grid");
  } else {

  }
});

function addEventHandlers() {
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  $('#upload').on('click', function() {
    uploadFiles();
  });

  $('#login').on('click', function() {
    var email = $('#user-email').val();
    var password = $('#user-password').val();

    if (!email || !password) {
      return
    }
    loginUser(email, password)
  });

  $('#logout').on('click', function() {
    logoutUser()
    location.href = "index.html";
  });
}

function handleFileSelect(evt) {
  var files = evt.target.files;

  for (var i = 0; i < evt.target.files.length; i++) {
    fileList.push(evt.target.files[i])
    console.log(evt.target.files[i]);
  }
  updateFileList();
}

$(function() {
  addEventHandlers()

});
