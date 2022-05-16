var compteur = 0;

function chargeInfo() {
  compteur += 1;
  if (compteur % 2 != 0) {
    fetch("data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        createDivs(data);
      });
  } else {
    var remove = document.getElementsByClassName("preview")[0];
    remove.innerHTML = "";
  }
}

function createDivs(data) {
  const preview = document.getElementsByClassName("preview")[0];
  preview.innerHTML = "";
  const pizzeriaName = document.createElement("div");
  pizzeriaName.setAttribute("class", "titre");
  pizzeriaName.innerHTML = data.nom;

  const pizzeriaSlogan = document.createElement("div");
  pizzeriaSlogan.setAttribute("class", "titre");
  pizzeriaSlogan.innerHTML = data.slogan;

  preview.appendChild(pizzeriaName);
  preview.appendChild(pizzeriaSlogan);
  const pizzeriaListPizzas = document.createElement("div");
  pizzeriaListPizzas.setAttribute("class", "contenu");
  pizzeriaListPizzas.setAttribute("id", "PizzaList");

  var listPizzas = data.pizzas;
  for (var x = 0; x < listPizzas.length; x++) {
    var pizzaListeElement = document.createElement("div");
    pizzaListeElement.setAttribute("class", "card");
    pizzaListeElement.innerHTML =
      '<h1 class="pizzanom">' +
      listPizzas[x].nom +
      "</h1>" +
      '<img class ="pizzaimage" src="' +
      listPizzas[x].image +
      '"></img>' +
      '<h2 class="pizzaprix">' +
      listPizzas[x].prix +
      "</h2> ";
    pizzeriaListPizzas.appendChild(pizzaListeElement);
    var listGarniture = listPizzas[x].garniture;
    for (var y = 0; y < listGarniture.length; y++) {
      var garnitureListeElement = document.createElement("ul");
      garnitureListeElement.setAttribute("class", "ingredients");
      garnitureListeElement.innerHTML =
        '<li class="ingredient">' + listPizzas[x].garniture[y] + "</li>";

      preview.appendChild(pizzeriaListPizzas);

      pizzaListeElement.appendChild(garnitureListeElement);
    }
  }
}
