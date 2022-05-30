const body = $("body");
const cardsContainer = $(".cardscontainer");

async function fetchJson() {
  fetch("/script/Episode.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      episode = data;
    });
}

function fetchAPI() {
  fetch("https://breakingbadapi.com/api/episodes", {})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      character = data;
      createEpisode(character);
      console.log(character);
    })
    .catch((error) => console.log("ERROR"));
}

const createEpisode = (character) => {
  for (x = 0; x < character.length; x++) {
    var createCard = document.createElement("div");
    createCard.setAttribute("class", "card");
    createCard.setAttribute("id", "card" + x);
    createCard.innerHTML =
      '<img src="' +
      episode[x].image +
      '" class="imgEpisode" >' +
      "</img>" +
      "<hr>" +
      '<div class ="episodeinfos">' +
      '<h1 class="episodeName">' +
      "Title : " +
      character[x].title +
      "</h1>" +
      "<hr>" +
      '<h2 classe="seasonepisode">' +
      '<svg class ="nicknameLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M437.2 403.5L319.1 215L319.1 64h7.1c13.25 0 23.1-10.75 23.1-24l-.0002-16c0-13.25-10.75-24-23.1-24H120C106.8 0 96.01 10.75 96.01 24l-.0002 16c0 13.25 10.75 24 23.1 24h7.1L128 215l-117.2 188.5C-18.48 450.6 15.27 512 70.89 512h306.2C432.7 512 466.5 450.5 437.2 403.5zM137.1 320l48.15-77.63C189.8 237.3 191.9 230.8 191.9 224l.0651-160h63.99l-.06 160c0 6.875 2.25 13.25 5.875 18.38L309.9 320H137.1z"/></svg>' +
      character[x].season +
      "</h2>" +
      "<hr>" +
      '<h3 classe="air_date">' +
      character[x].air_date +
      "</h3>" +
      "<hr>" +
      '<h3 classe="episodenumber">' +
      character[x].episode +
      "</h3>" +
      "<hr>" +
      '<h3 classe="characterStatus">' +
      character[x].characters +
      "</h3>" +
      "</div>";

    cardsContainer.append(createCard);
  }
};
