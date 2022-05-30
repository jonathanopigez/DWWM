// ON DECLARE LES VARIABLES POUR STOCKER LES ELEMENT HTML EXISTANT

let start = $("#start");
const body = $("body");
const game = $("#game");
const title = $("#title");
let buttonRep = $("#answer");
let gameSection = document.getElementById("container1");

// ---------------------------------------------------------------

// ON DECLARE LES VARIABLE A UTILISER DANS LES FONCTIONS
let temps = 20;
let questions;
let compteur = 0;
let choixfait = false;
let score = 0;
let choix = 0;
// ------------------------------------------------------

//#region "Function"

/**
 * Il récupère le fichier JSON, puis le convertit en objet JavaScript, puis le transmet à la fonction
 * startGame.
 */
function chargeJson() {
  fetch("script/quizson.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // on stock le tableau json dans une variable
      tableauJson = data;
      // ON MET CETTE VARIABLE EN PARAMETRE DE LA FONCTION STARTGAME
      startGame(tableauJson);
    });
}

/**
 * Il prend les données du fichier JSON et affiche la première question et les choix pour cette
 * question.
 */
let startGame = (data) => {
  start.hide();
  game.show();
  // on ajoute la variable compteur qui est de 0 de base et qui prendra +1 a chaque nouvelle question, ce qui nous ferras parcourir le tableau json
  createQuestion(data[compteur]);
};

/**
 * Il crée une nouvelle question et met à jour le score.
 */
const nextQuestion = () => {
  compteur++;
  gameSection.innerHTML = "";
  // on creer le compteur
  let compteurHTML = document.createElement("h2");
  compteurHTML.setAttribute("id", "compteur");
  // le compteur est enfant de la div gameSection
  gameSection.appendChild(compteurHTML);
  document.getElementById("compteur").innerHTML = score + " / " + compteur;
  document.body.classList.remove("green");
  document.body.classList.remove("red");
  createQuestion(tableauJson[compteur]);
};

/**
 * Il crée une question, et lorsque l'utilisateur clique sur une réponse, il vérifie si c'est la bonne,
 * et si c'est le cas, il ajoute un point au score.
 */
const createQuestion = (question) => {
  choixfait = false;
  let timer = document.createElement("div");
  timer.innerHTML = "<span> 20 </span>";
  timer.setAttribute("id", "timer");
  gameSection.append(timer);

  const timerElement = document.getElementById("timer");
  function diminuerTemps() {
    let minutes = parseInt(temps / 60, 10);
    let secondes = parseInt(temps % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;

    timerElement.innerText = minutes + ":" + secondes;
    temps = temps <= 0 ? 0 : temps - 1;
  }
  setInterval(diminuerTemps, 1000);

  let questionTitle = document.createElement("h2");
  questionTitle.innerHTML = question.question;
  questionTitle.setAttribute("id", "questiontitle");
  gameSection.append(questionTitle);

  var choiceList = question.choices;
  var answers = document.createElement("div");
  answers.setAttribute("class", "answersContainer");
  gameSection.appendChild(answers);
  for (var r = 0; r < choiceList.length; r++) {
    var correct = "";
    if (question.correct == choiceList[r]) {
      correct = 'data-correct ="' + question.correct + '" ';
    }

    var listReponses = document.createElement("div");
    listReponses.setAttribute("class", "answers");
    listReponses.innerHTML =
      '<button id="answer" class="btnReponse" ' +
      correct +
      ">" +
      choiceList[r] +
      "</button>";

    answers.append(listReponses);
  }

  /* Fonction appelée lorsque l'utilisateur clique sur un bouton. */
  $(".btnReponse").one("click", function (evt) {
    if (choixfait == false) {
      var bonneReponse = evt.target.dataset.correct;

      let buttons = document.getElementsByClassName("btnReponse");
      // on va parcourir tous les button, et vérifié si le button possède le dataset correct (seul le button de la bonne reponse le possède)
      Array.from(buttons).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
      });

      // SI L'ELEMENT CLICKER CORRESPOND AU DATASET.CORRECT ALORS PASSE LE BACKGROUND EN VERT ET AJOUTE +1 AU SCORE
      if (evt.target.innerHTML == bonneReponse && choix < 1) {
        choix++;
        console.log("bien joué");
        document.body.classList.add("green");
        score++;
        console.log(score);
      }
      // SI L'ELEMENT CLICKER NE CORRESPOND PAS AU DATASET.CORRECT PASSE LE BACKGROUND EN ROUGE ET N'INCREMENTE PAS LE SCORE
      if (evt.target.innerHTML != bonneReponse && choix < 1) {
        choix++;
        document.body.classList.add("red");
        document.getElementById("title").style.color = "white";
        document.getElementById("title2").style.color = "white";
        document.getElementById("title3").style.color = "white";
      }
      // ---------------------------------------------------------------------------------------------------------------------
      //IL VERIFIE D'ABORD SI ON A DEJA EFFECTUER UN CHOIX, SI OUI EMPECHE LA CREATION D'UN AUTRE BOUTON NEXT
      if (choixfait === false) {
        choixfait = true;
        choix = 0;
        var next = document.createElement("div");
        next.setAttribute("id", "next");
        next.innerHTML =
          '<button class="nextButton"  onclick="nextQuestion()">  Next  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M502.6 278.6l-128 128c-12.51 12.51-32.76 12.49-45.25 0c-12.5-12.5-12.5-32.75 0-45.25L402.8 288H32C14.31 288 0 273.7 0 255.1S14.31 224 32 224h370.8l-73.38-73.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l128 128C515.1 245.9 515.1 266.1 502.6 278.6z"/></svg>  </button>';
        gameSection.appendChild(next);
      } else {
        console.log("choix deja fait");
      }
    }
  });
  //------------------------------------------------------------------------------------------------------------------------
  timeOver();
};

/**
 * Lorsque le bouton Start est cliqué, le bouton disparaît.
 */
const fadeOut = () => {
  let buttonfade = document.getElementById("start");
  buttonfade.classList.add("fadeOut");
};

// FUNCTION  POUR ATTRIBUER LA COULEURS EN FONCTION DE LA BONNE OU MAUVAISE REPONSE
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
// ON RENITILAISE LES CLASS QUI DONNENT LA COULEUR
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

//#endregion "Function"
