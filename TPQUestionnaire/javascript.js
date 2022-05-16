let start = $("#start");
const body = $("body");
const game = $("#game");
const answer = $("#answer");
let utilisateurReponse;
let questions;
game.hide();

//#region "Function"

/**
 * Il récupère le fichier JSON, puis le convertit en objet JavaScript, puis le transmet à la fonction
 * startGame.
 */
function chargeJson() {
  fetch("quizson.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      startGame(data);
    });
}

/**
 * Il prend les données du fichier JSON et affiche la première question et les choix pour cette
 * question.
 */
const startGame = (data) => {
  start.hide();
  game.show();
  for (var x = 0; x < data.length; x++) {
    let questionTitle = document.createElement("h2");
    questionTitle.innerHTML = data[x].question;
    questionTitle.setAttribute("id", "questiontitle");
    game.append(questionTitle);
    break;
  }
  // var bonneReponse = data[x].correct;
  var choiceList = data[x].choices;
  for (var r = 0; r < choiceList.length; r++) {
    var listReponses = document.createElement("div");
    listReponses.setAttribute("id", "answer");
    listReponses.innerHTML =
      '<button class="btnReponse"' + choiceList[r] + "</button>";
    answer.append(listReponses);
  }
};

/**
 * Si le choix de l'utilisateur est égal à la bonne réponse, lancez le jeu.

 */
$("btnReponse").addEventListener("click", () => {
  console.log("bonjour");
});
const verification = (data) => {
  if (data.choices == data.correct) {
    startGame();
  }
};

//#endregion "Function"
