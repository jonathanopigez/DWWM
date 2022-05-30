const body = $("body");
const cardsContainer = $(".cardscontainer");

async function fetchAPI() {
  fetch("https://www.breakingbadapi.com/api/characters", {})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      character = data;
      createCharacter(character);
      console.log(character);
    })
    .catch((error) => console.log("ERROR"));
}
const createCharacter = (character) => {
  for (x = 0; x < character.length; x++) {
    var createCard = document.createElement("div");
    createCard.setAttribute("class", "card");
    createCard.setAttribute("id", "card" + x);
    createCard.innerHTML =
      '<img src="' +
      character[x].img +
      '" class="imgCharacter" >' +
      "</img>" +
      "<hr>" +
      '<div class ="characterinfos">' +
      '<h1 class="characterName">' +
      character[x].name +
      "</h1>" +
      "<hr>" +
      '<h2 classe="characterNickname">' +
      character[x].nickname +
      "</h2>" +
      "<hr>" +
      '<h3 classe="characterBirthday">' +
      character[x].birthday +
      "</h3>" +
      "<hr>" +
      '<h3 classe="characterOcuppation">' +
      character[x].occupation +
      "</h3>" +
      "<hr>" +
      '<h3 classe="characterStatus">' +
      character[x].status +
      "</h3>" +
      "</div>";

    cardsContainer.append(createCard);
  }
};
