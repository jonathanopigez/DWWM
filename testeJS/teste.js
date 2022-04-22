var character = document.getElementById("character");
var block = document.getElementById("block");
var over = document.getElementById("over");
var score = 0;
var x = 0;
var compteur = (document.getElementById("compteur").innerHTML = score);
var best = (document.getElementById("best").innerHTML = x);

function invisible() {
  if (play.classlist != "invisible") {
    play.classList.add("invisible");
  }
}

function animateBackground() {
  if (game.classList != "animate-background") {
    game.classList.add("animate-background");
  }
}

function start() {
  if (block.classList != "start") {
    block.classList.add("start");
  }
}

function jump() {
  if (character.classList != "animate") {
    character.classList.add("animate");
  }

  setTimeout(function () {
    character.classList.remove("animate");
  }, 500);
}

var checkDead = setInterval(function () {
  var characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  var blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );

  if (blockLeft <= -40) {
    score = score + 1;
    compteur = document.getElementById("compteur").innerHTML = score;

    if (score > x) x = score;
    best = document.getElementById("best").innerHTML = x;
  }

  if (blockLeft < 0) {
    block.classList.add("invisible");
  } else {
    block.classList.remove("invisible");
  }

  if (blockLeft < 10 && blockLeft > 0 && characterTop >= 100) {
    block.style.animation = "none";
    block.style.display = "none";
    window.location.reload();
  }
}, 10);
