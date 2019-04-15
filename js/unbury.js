
function updateTime() {
  var d = new Date();
  var dateFormat = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
  $('#current-time').text(dateFormat);
  // var first = "hsl(50, 50%, " + d.getSeconds() + "%)"
  // var seccond = "hsl(60, 50%, " + 40 + "%)"
  // var third = "hsl(70r, 50%, " + 100 + "%)"
  // /* color: hsl(360, 100%, 100%); */
  // //console.log("background-image", 'linear-gradient(' + first + ',' + seccond + "," + third);
  // $('body').css("background-image", 'linear-gradient(to right,' + first + ',' + seccond + "," + third)
  //
  // //background-image: linear-gradient("up", color-stop1, color-stop2, );
}

var updateMethod = setInterval(updateTime, 100);
