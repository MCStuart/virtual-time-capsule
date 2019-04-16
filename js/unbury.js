var countdownDate = new Date("April 16, 2019 15:00:00").getTime();

var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countdownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("current-time").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("current-time").innerHTML = "time capsule OPEN";
  }
}, 1000);

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("my-slides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// function dateFormat(i) {
//   if(i < 10) {
//     i = "0" + i;
//   }
//   return i;
// }
//
// function startTime() {
//   var today = new Date();
//   var h = today.getHours();
//   var m = today.getMinutes();
//   var s = today.getSeconds();
//   m = dateFormat(m);
//   s = dateFormat(s);
//   $('#current-time').text = h + ":" + m + ":" + s;
//   t = setTimeout(function() {
//     startTime()
//   }, 500);
// }
// startTime();



// function updateTime() {
//   var d = new Date();
// }
//
// function dateFormat() {
//   if(getMinutes.length === 1) {
//     d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " | " + d.getHours() + ":0" + d.getMinutes() + ":" + d.getSeconds();
//   } else if(getHours.length === 1) {
//     d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " | 0" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
//   } else if(getSeconds.length === 1) {
//     d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " | " + d.getHours() + ":" + d.getMinutes() + ":0" + d.getSeconds();
//   } else if(getMinutes.length === 1 && getHours.length === 1) {
//     d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " | 0" + d.getHours() + ":0" + d.getMinutes() + ":" + d.getSeconds();
//   } else if(getMinutes.length === 1 && getSeconds.length === 1) {
//     d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " | " + d.getHours() + ":0" + d.getMinutes() + ":0" + d.getSeconds();
//   } else if(getHours.length === 1 && getSeconds.length === 1) {
//     d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " | 0" + d.getHours() + ":" + d.getMinutes() + ":0" + d.getSeconds();
//   } else {
//     d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " | " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
//   }
// }



  // var first = "hsl(50, 50%, " + d.getSeconds() + "%)"
  // var seccond = "hsl(60, 50%, " + 40 + "%)"
  // var third = "hsl(70r, 50%, " + 100 + "%)"
  // /* color: hsl(360, 100%, 100%); */
  // //console.log("background-image", 'linear-gradient(' + first + ',' + seccond + "," + third);
  // $('body').css("background-image", 'linear-gradient(to right,' + first + ',' + seccond + "," + third)
  //
  // //background-image: linear-gradient("up", color-stop1, color-stop2, );
// }

// var updateMethod = setInterval(updateTime, 100);
