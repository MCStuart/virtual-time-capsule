var firebaseConfig = {
  apiKey: "AIzaSyDNwXooTh0URLihSpXCaJKG52riq3PYwqo",
  authDomain: "time-capsule-12424.firebaseapp.com",
  databaseURL: "https://time-capsule-12424.firebaseio.com",
  projectId: "time-capsule-12424",
  storageBucket: "time-capsule-12424.appspot.com",
  messagingSenderId: "914523788031"
};

var timeCapsule = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(timeCapsule);
// var storage = firebase.storage();
var storageRef = firebase.storage().ref();

var userId = 0;
var userEmail = ""
var fileList = [];

var d = new Date();

function Capsule(name, unbury) {
  this.name = name;
  this.unbury = unbury;
}


//Update Ui file list
function updateFileList() {
  var output = [];
  for (var i = 0, f; f = fileList[i]; i++) {
    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>');
  }
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}


function createUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}

function loginUser(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}

function logoutUser() {
  firebase.auth().signOut()
  location.reload();
}


function uploadFiles() {
  var name = $('#capsule-name').val();
  var date = $('#datetimepicker13').data('date');

  //createUser(email, password);
  loginUser(email, password);

  var capsule = new Capsule(name, date);

  for (var i = 0, f; f = fileList[i]; i++) {
    storageRef.child(uid + "/" + f.name).put(f);
  }
  var timeBuried = d.getTime();
  db.collection("capsules").doc(uid).set({
    name: capsule.name,
    timeBuried: timeBuried,
    unbury: capsule.unbury
  });
  console.log("done!");
  // db.collection("users").doc(email).set({uid: firstCapsule.uid})

}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#loginId").text(user.email)
    $('.loginScreen').hide();
    // $('.wrapper').css("display", "grid");
  } else {
    uid = 0;
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
  var files = evt.target.files; // FileList object
  for (var i = 0; i < evt.target.files.length; i++) {
    fileList.push(evt.target.files[i])
  }
  //mountainsRef.put(evt.target.files[0]);
  updateFileList();
}
function checkForLogin() {
    if (firebase.auth().currentUser)
    {
      return;
    } else return;
}

$(function() {
  addEventHandlers()

});
