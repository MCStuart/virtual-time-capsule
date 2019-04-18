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
var storage = firebase.storage();
var storageRef = firebase.storage().ref();

var fileList = [];
var d = new Date();

var filesUploaded = 0;
var filesTotal = 0;
var databaseUpdated = false;

function Capsule(name, unbury) {
  this.name = name;
  this.unbury = unbury;
  this.media = [];
}

//Update Ui file list
function updateFileList() {
  //todo check for duplicates and file limit?
  var output = [];
  for (var i = 0, f; f = fileList[i]; i++) {
    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
      f.size, ' bytes, last modified: ',
      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
      '</li>');
  }
  //document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function getFile(file) {
  return pathReference = storage.ref(file);
}

function getMediaFromUser(updateList) {
  if (firebase.auth().currentUser) {
    var id = firebase.auth().currentUser.uid;
    var docRef = db.collection("capsules").doc(id);
    var media = [];
    var fileList = [];

    docRef.get().then(function(doc) {
      if (doc.exists) {
        fileList = doc.data().media;
        console.log("Document data:", doc.data());
      } else {
        console.log("No such document!");
      }

      for (var i = 0, m; m = fileList[i]; i++) {
        console.log(m);
        getFile(m).getDownloadURL().then(function(url) {
          media.push(url);
          if (fileList.length === media.length) {
            updateList(media);
          }
        });
      }
    });
  }
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
  var date = $('#datetimepicker13').datetimepicker("viewDate").valueOf()
  //console.log($('#datetimepicker13').datetimepicker("viewDate").valueOf());
  var uid = firebase.auth().currentUser.uid;
  var capsule = new Capsule(name, date);
  filesTotal = fileList.length;

  for (var i = 0, f; f = fileList[i]; i++) {
    storageRef.child(uid + "/" + f.name).put(f).then(function() {
      filesUploaded++;
      if (filesUploaded === filesTotal && databaseUpdated) {
        location.href = "unbury.html";
      }
    });
    capsule.media.push(uid + "/" + f.name);
  }

  var timeBuried = new Date().getTime();

  db.collection("capsules").doc(uid).set({
    name: capsule.name,
    timeBuried: timeBuried,
    unbury: capsule.unbury,
    media: capsule.media
  }).then(function() {
    databaseUpdated = true;
    if (filesUploaded === filesTotal && databaseUpdated) {
      location.href = "unbury.html";
    }
  });
}
