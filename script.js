//create a canvas object from HTMl element
let canvas = document.getElementById("canvas");

//create a 2d drawing object
let ctx = canvas.getContext("2d");

//calculate the clock radius by using the height
let radius = canvas.height / 2;

//remap the x and y axis to the center of the canvas
ctx.translate(radius, radius);

//reduce clock radius by 90%
console.log(radius);
radius *= 0.9;
console.log(radius);

//run the drawClock function every second
setInterval(drawClock, 1000);

//drawClock function
function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}
//drawFace function
function drawFace(ctx, radius) {
  let grad;

  //draw White circle for the face
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff"; //set fill color
  ctx.fill(); //with with selected color

  //create a radial gradient (inner, middle, outer)
  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, "#333");
  grad.addColorStop(0.5, "white");
  grad.addColorStop(1, "#333");

  //define gradient as stroke style
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();

  //draw the center of the clock
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

//drawNumbers function
function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.15 + "px arial"; // set the font size and family
  ctx.textBaseline = "middle"; //set the text allignment to middle
  ctx.textAlign = "center"; //set the text alignment to center
  for (let num = 1; num <= 12; num++) {
    let ang;
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num, 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}
//drawTime
function drawTime(ctx, radius) {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  //hour
  hour = hour % 12;

  //calculate angle of hour hand
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (6 * 60 * 60);

  //console.log(hour);
  //draw hour hand
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);

  //calculate angle of minute hand
  //console.log(minute);
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);

  //draw minute hand
  drawHand(ctx, minute, radius * 0.7, radius * 0.04);

  //calculate angle of second hand
  second = (second * Math.PI) / 30;
  //console.log(second);

  //draw second hand
  drawHand(ctx, second, radius * 0.85, radius * 0.01);
}

//drawHand function
function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
