var countdownDate = new Date("April 17, 2019 16:00:00").getTime();

var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countdownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  $("#current-time").html(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
  if (distance < 0) {
    clearInterval(x);
    $("#current-time").html("time capsule OPEN");
  }
}, 1000);


function addPics(media) {
  for (var i = 0; i < media.length; i++) {
    $("ol.carousel-indicators").append("<li data-target='#carouselIndicators' data-slide-to=" + i + "'></li>")
    $("div.carousel-inner").append("<div class='carousel-item'> <img src='" + media[i] + "' class='d-block w-100' alt='...'> </div>")
  }
};


function addEventHandlers() {

  $('#unbury').on('click', function () {
    getMediaFromUser(addPics);
  });

}

$(function() {
  addEventHandlers()

});
