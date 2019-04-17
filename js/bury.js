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
  $('#upload').on('click', function () {
    uploadFiles();
  });

  $('#login').on('click', function () {
    var email = $('#user-email').val();
    var password = $('#user-password').val();

    if (!email || !password) {
      return
    }
    loginUser(email, password)
  });

  $('#logout').on('click', function () {
    logoutUser()
  });

}

function handleFileSelect(evt) {
  var files = evt.target.files;
  for (var i = 0; i < evt.target.files.length; i++) {
    fileList.push(evt.target.files[i])
  }
  updateFileList();
}

$(function() {
  addEventHandlers()

});
