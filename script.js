screen.lockOrientation("landscape");

var ballonPurple= document.getElementById('ballonPurple');

ballonPurple.addEventListener('animationend', function(event) {
  if (event.animationName === 'elevation') {
    ballonPurple.style.bottom='82vh';
    ballonPurple.style.animation = 'flotter 5s infinite';
  }
});


var ballonOrange = document.getElementById('ballonOrange');

ballonOrange.addEventListener('animationend', function(event) {
  if (event.animationName === 'elevation') {
    ballonOrange.style.bottom='82vh';
    ballonOrange.style.animation = 'flotter 5s infinite';
  }
});

var ballonJaune = document.getElementById('ballonJaune');

ballonJaune.addEventListener('animationend', function(event) {
  if (event.animationName === 'elevation') {
    ballonJaune.style.bottom='82vh';
    ballonJaune.style.animation = 'flotter2 5s infinite';
  }
});

var ballonBleu = document.getElementById('ballonBleu');

ballonBleu.addEventListener('animationend', function(event) {
  if (event.animationName === 'elevation') {
    ballonBleu.style.bottom='82vh';
    ballonBleu.style.animation = 'flotter 5s infinite';
  }
});


var ballonRose = document.getElementById('ballonRose');

ballonRose.addEventListener('animationend', function(event) {
  if (event.animationName === 'elevation') {
    ballonRose.style.bottom='82vh';
    ballonRose.style.animation = 'flotter 5s infinite';
  }
});

var ballonVert = document.getElementById('ballonVert');

ballonVert.addEventListener('animationend', function(event) {
  if (event.animationName === 'elevation') {
    ballonVert.style.bottom='82vh';
    ballonVert.style.animation = 'flotter2 5s infinite';
  }
});



var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");

var cwidth, cheight;
var shells = [];
var pass= [];

var colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];

window.onresize = function() { reset(); }
reset();
function reset() {

  cwidth = window.innerWidth;
	cheight = window.innerHeight;
	c.width = cwidth;
	c.height = cheight;
}

function newShell() {

  var left = (Math.random() > 0.5);
  var shell = {};
  shell.x = (1*left);
  shell.y = 1;
  shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
  shell.yoff = 0.01 + Math.random() * 0.007;
  shell.size = Math.random() * 6 + 3;
  shell.color = colors[Math.floor(Math.random() * colors.length)];

  shells.push(shell);
}

function newPass(shell) {

  var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

  for (i = 0; i < pasCount; i++) {

    var pas = {};
    pas.x = shell.x * (cwidth);
    pas.y = shell.y * (cheight);

    var a = Math.random() * 4;
    var s = Math.random() * 10;

		pas.xoff = s *  Math.sin((5 - a) * (Math.PI / 2));
  	pas.yoff = s *  Math.sin(a * (Math.PI / 2));

    pas.color = shell.color;
    pas.size = Math.sqrt(shell.size);

    if (pass.length < 1000) { pass.push(pas); }
  }
}

var lastRun = 0;
Run();
function Run() {

  var dt = 1;
  if (lastRun != 0) { dt = Math.min(50, (performance.now() - lastRun)); }
	lastRun = performance.now();

  //ctx.clearRect(0, 0, cwidth, cheight);
	//ctx.fillStyle = "rgb(17, 22, 31)";
 // Création du dégradé
 var gradient = ctx.createLinearGradient(0, 0, 0, cheight);
 gradient.addColorStop(0, "rgb(51, 0, 102)"); // Violet foncé
 gradient.addColorStop(0.5, "rgb(102, 0, 102)"); // Rose foncé
 gradient.addColorStop(1, "rgb(153, 51, 0)");
 

// Application du dégradé en tant que fond
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, cwidth, cheight);

  if ((shells.length < 10) && (Math.random() > 0.96)) { newShell(); }

  for (let ix in shells) {

    var shell = shells[ix];

    ctx.beginPath();
    ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
    ctx.fillStyle = shell.color;
    ctx.fill();

    shell.x -= shell.xoff;
    shell.y -= shell.yoff;
    shell.xoff -= (shell.xoff * dt * 0.001);
    shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);

    if (shell.yoff < -0.005) {
      newPass(shell);
      shells.splice(ix, 1);
    }
  }

  for (let ix in pass) {

    var pas = pass[ix];

    ctx.beginPath();
    ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
    ctx.fillStyle = pas.color;
    ctx.fill();

    pas.x -= pas.xoff;
    pas.y -= pas.yoff;
    pas.xoff -= (pas.xoff * dt * 0.001);
    pas.yoff -= ((pas.yoff + 5) * dt * 0.0005);
    pas.size -= (dt * 0.002 * Math.random())

    if ((pas.y > cheight)  || (pas.y < -50) || (pas.size <= 0)) {
        pass.splice(ix, 1);
    }
  }
  requestAnimationFrame(Run);
}