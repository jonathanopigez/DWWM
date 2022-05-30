var nb;
var reponse;
var tentative = 1;
var phrase = "Veuillez choisir un nombre entre 0 et 10";
var replay = document.getElementById("replay");
var score = 0;
var meilleurScore = document.querySelector(".meilleurScore");
var bestScore = 6;

function guessNumber() {
  reponse = document.getElementById("reponse").value;

  if (reponse == null) {
    return guessNumber();
  }
  if (reponse < nb) {
    tentative = tentative + 1;
    phrase = "C'est plus !";
    botInfo = document.getElementById("botInfo").innerHTML = phrase;
  }
  if (reponse > nb) {
    tentative = tentative + 1;
    phrase = "C'est moin !";
    botInfo = document.getElementById("botInfo").innerHTML = phrase;
  }

  if (reponse == nb) {
    replay.classList.remove("visibility");
    phrase = "Bravo !" + " En " + tentative + " tentative(s)";
    botInfo = document.getElementById("botInfo").innerHTML = phrase;
  }
  if (tentative > 5 && reponse != nb) {
    replay.classList.remove("visibility");
    phrase = "Perdu ! t'es nul";
    botInfo = document.getElementById("botInfo").innerHTML = phrase;
  }
}

function replayGame() {
  replay.classList.add("visibility");
  score = tentative;
  if (bestScore >= score) {
    bestScore = score;
  }
  meilleurScore = document.querySelector(".meilleurScore").innerHTML =
    "Best Score : " + bestScore + " tentative(s)";
  tentative = 1;
  nb = Math.round(Math.random() * 10);
  console.log(Math.round(nb));
  phrase = "Veuillez choisir un nombre entre 0 et 10";
  botInfo = document.getElementById("botInfo").innerHTML = phrase;
  reponse = document.getElementById("reponse").value = "";
}

nb = Math.round(Math.random() * 10);
console.log(Math.round(nb));
var botInfo = (document.getElementById("botInfo").innerHTML = phrase);

//Click sur le bouton Envoyer
//declenche la fonction guessNumber

//Click sur le bouton Replay
//declenche la fonction replayGame
