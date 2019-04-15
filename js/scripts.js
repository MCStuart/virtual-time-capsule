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


function Capsule(name, timeCreated, duration) {
  this.name = name;
  this.media = ["fart", "poop", "pee"];
  this.timeCreated = timeCreated;
  this.duration = duration;
}

var firstCapsule = new Capsule("Capsule#2318", 0, 0);

db.collection("capsules").doc(firstCapsule.name).set({
  name: firstCapsule.name,
  timeCreated: firstCapsule.timeCreated,
  duration: firstCapsule.duration,
  media: firstCapsule.media
});

var storageRef = firebase.storage().ref();

var mountainsRef = storageRef.child(firstCapsule.name + "/fart.jpg");

var metadata = {
  contentType: 'image/jpeg'
};

$(function() {

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    mountainsRef.put(evt.target.files[0]);
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
});
