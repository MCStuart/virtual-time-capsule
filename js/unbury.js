var countdownDate = 0; // = new Date("April 17, 2019 16:00:00").getTime();

var timeCheck = setInterval(updateBuryTime, 1000);

function updateBuryTime() {
  if (countdownDate !== 0) {

    var now = new Date().getTime();
    var distance = countdownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    $("#current-time").html(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
    if (distance < 0) {
      clearInterval(timeCheck);
      $("#current-time").html("time capsule OPEN");
      //$("#unbury").show();
      getMediaFromUser(addPics);
      $("#carouselIndicators").show();
    }
  }
}

function getDateFromMS(time) {
  var days = Math.floor(time / (1000 * 60 * 60 * 24));
  var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((time % (1000 * 60)) / 1000);
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#loginId").text(user.email)
    getUnburyDate()
    updateBuryTime()
  } else {

  }
});

function getUnburyDate() {
  var id = firebase.auth().currentUser.uid;
  var docRef = db.collection("capsules").doc(id);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      countdownDate = doc.data().unbury;
    }
  });
}

function addPics(media) {
  $("ol.carousel-indicators").empty();
  $("div.carousel-inner").empty();
  for (var i = 0; i < media.length; i++) {
    if (i === 0) {
      $("ol.carousel-indicators").append("<li class='active' data-target='#carouselIndicators' data-slide-to=" + i + "'></li>")
      $("div.carousel-inner").append("<div class='carousel-item active'> <img src='" + media[i] + "' class='d-block w-100' alt='...'> </div>")
    } else {
      $("ol.carousel-indicators").append("<li data-target='#carouselIndicators' data-slide-to=" + i + "'></li>")
      $("div.carousel-inner").append("<div class='carousel-item'> <img src='" + media[i] + "' class='d-block w-100' alt='...'> </div>")
    }
  }
};

function addEventHandlers() {

  $('#deleteCapsule').on('click', function() {
    if (firebase.auth().currentUser()) {
      var id = firebase.auth().currentUser.uid;
      db.collection("capsules").doc(id).delete();
      location.href = "capsuleCreate.html";
    }
  });

  $('#logout').on('click', function() {
    logoutUser()
    location.href = "index.html";
  });

db.collection("cities").doc("DC").delete()
}

$(function() {
  addEventHandlers()
  updateBuryTime()
  // if (firebase.auth().currentUser) {
  //   $("#loginId").text(user.email)
  // }
});
