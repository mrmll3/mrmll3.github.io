var canvas = document.querySelector('canvas');

function resizeCanvas() {
  canvas.width = window.innerWidth - 3;
  canvas.height = window.innerHeight - 3;
}
resizeCanvas();

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) { color += letters[Math.floor(Math.random() * 16)]; }
  return color;
}

var ctx = canvas.getContext('2d');
var initAfterExec = false;
const piTwo = Math.PI * 2;
var noOfCircles = 9;
var mouseRange = 20;
var mouse;
var dampingFactor = 0.9995;
var maxRadius;
var speedfactor = 6;
var growthFactor = 5;
var shrinkFactor = Math.ceil(growthFactor / 2);
var colorArray = [
  '#ffbd00',
  '#ff5400',
  '#ff0054',
  '#9e0059',
  '#390099',
  '#FFFFFF',
  '#3a86ff',
  '#d90429'
];

var circleArray = [];
var timerStart;
var clickCounter;
var hitRadius;
var speedSum = 0.0;
let speedy = 0.03;
var currentHighscore = 0;

//#region events

window.addEventListener("touchstart", handleTouch);
window.addEventListener("touchmove", handleTouch);
window.addEventListener("touchend", handleTouchend);
window.addEventListener('mousemove', handlemousemove);
window.addEventListener('click', handleClick);
window.addEventListener('keyup', handleKey);
window.addEventListener('resize',
  () => {
    resizeCanvas();
    init();
  }
);
//#endregion events

function isInside(x, y, cx, cy, r) {
  let distance = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
  return distance < (r + hitRadius);
}

function Circle(x, y, dx, dy, radius, color, fill = true, strokeStyle = "black", stroke = false) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = color;
  this.fill = fill;
  this.strokeStyle = strokeStyle;
  this.stroke = stroke;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, piTwo, false);
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.color;
    if (this.fill === true) { ctx.fill(); }
    if (this.stroke === true) { ctx.stroke(); }
  };

  // 
  this.getDistance = function (xCoordinate, yCoordinate) {

    let xDistance = xCoordinate - this.x;
    let yDistance = yCoordinate - this.y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  };

  this.update = function () {
    this.draw();
    //check border collision
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) { this.dx = -this.dx }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) { this.dy = -this.dy; }
    // check border collision fallback
    if (this.x > canvas.width || this.x < 0) { this.dx = -this.dx }
    if (this.y > canvas.height || this.y < 0) { this.dy = -this.dy; }


    // Save the original position 
    let originalX = this.x;
    let originalY = this.y;
    // move circle
    this.x += this.dx;
    this.y += this.dy;

    //interactivity 
    if (mouse.x - this.x < mouseRange && mouse.x - this.x > -mouseRange &&
      mouse.y - this.y < mouseRange && mouse.y - this.y > -mouseRange) {
      if (this.radius < maxRadius) {
        this.radius += growthFactor;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= shrinkFactor;
    }
    if (this.radius < this.minRadius) { this.radius = this.minRadius; }

    // speeddamping over time
    this.dx *= dampingFactor;
    this.dy *= dampingFactor;
  };
}


function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}


function init() {
  timerStart = new Date();
  clickCounter = 0;
  maxRadius = Math.round((canvas.height + canvas.width) / 15);
  hitRadius = Math.ceil(Math.min(canvas.height, canvas.width) / 15);
  mouseRange = hitRadius * 2;
  mouse = { x: -mouseRange, y: -mouseRange }
  circleArray = [];
  for (var i = 0; i < noOfCircles; i++) {
    var radius = Math.max((Math.random() * Math.ceil(Math.min(canvas.height, canvas.width) / 8)), 10);
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * speedfactor;
    var dy = (Math.random() - 0.5) * speedfactor;
    var color = colorArray[Math.round(Math.random() * colorArray.length)];
    circleArray.push(new Circle(x, y, dx, dy, radius, color, true, color, false));
  }
  initAfterExec = false;
  console.log('restart initiated');

}
init();

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  //c.arc(x, y, dx, dy, radius);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  let circle = new Circle(mouse.x, mouse.y, 0, 0, hitRadius, '#000000', false, 'white', true);
  circle.update();

}

animate();

function handleClick(event) {
  clickCounter++;
  mouse.x = event.x;
  mouse.y = event.y;
  checkHit();

}

function handleKey(event) {
  event.preventDefault();
  if (event.key === 'Enter') {
    toggleFullScreen();
  }
  if (event.key === 'i') {
    init();
  }
}

function handleTouch(e) {
  // e.preventDefault();
  let x, y;
  var touch = e.touches[0] || e.changedTouches[0];
  x = touch.pageX;
  y = touch.pageY;
  mouse.x = x;
  mouse.y = y;
}

let lastTap = 0;
function handleTouchend(e) {
  e.preventDefault();
  const currentTime = new Date().getTime();
  if (currentTime - lastTap < 150) {
    // double tap detected
    toggleFullScreen();
  } else {
    lastTap = currentTime;
    // handle single tap event
    clickCounter++;
    checkHit();
  }
}

function handlemousemove(e) {
  mouse.x = e.x;
  mouse.y = e.y;
}

function checkHit() {
  let hitArray = [];
  let loopcount = 0
  // check if hit
  for (let i = 0; i < circleArray.length; i++) {
    let circle = circleArray[i];
    if (circle.getDistance(mouse.x, mouse.y) <= (circle.radius + hitRadius)) {
      console.log('hit');
      hitArray.push(i);
    }
  }
  // delete hit bubbles
  hitArray.forEach(function (element) {
    circleArray.splice((element - loopcount), 1);
    loopcount++;
  });

  // speedup remaining bubbles if one or more hit
  if (hitArray.length > 0) {
    circleArray.forEach(function (circle) {
      let factor = 1;
      let circleCount = hitArray.length;
      factor = (9.3 * circleCount) / (3.3 * Math.sqrt(circleCount));
      factor = Math.max(Math.ceil(factor), 1);
      circle.dx *= (1 + (speedy * factor));
      circle.dy *= (1 + (speedy * factor));
    });
  }


  if (circleArray.length === 0) {
    if (!initAfterExec) {
      let timeS = Math.round((new Date() - timerStart) / 1000);
      let points = calcPoints(timeS, clickCounter, noOfCircles);
      let msg = 'it took you ' + clickCounter + ' shots to destroy ' + noOfCircles + ' bubbles';
      msg += ' in ' + timeS + ' seconds.'
      msg += '\n \n';
      msg += 'that\'s a total of ' + points + ' points';
      msg += '\n \n';
      if (points < currentHighscore) {
        msg += 'the current highscore is ' + currentHighscore;
      }
      else {
        currentHighscore = points;
        msg += 'that\'s a new highscore';
      }
      alert(msg);
      levelUp();
      initAfterExec = true;
      init();
    } else if (initAfterExec) {
      console.log('restart');
      /* window.location.reload(); */
    }
  }
}

function calcPoints(time, shots, bubbles) {
  let points = 0.0;
  points = bubbles + Math.round((bubbles * bubbles) / (time * shots));
  return points;
}

function levelUp() {
  noOfCircles += Math.ceil(noOfCircles / 3);
}