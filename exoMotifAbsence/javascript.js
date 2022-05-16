function chargeInfo() {
  fetch("motif.json")
    .then((response) => {
      return response.json();
    })
    .then((motif) => {
      createMotif(motif);
    });
}

function appearDate() {
  let gaucheDroite1 = document.getElementById("element1");
  let gaucheDroite2 = document.getElementById("element2");

  if ($("#unjour").is(":checked")) {
    gaucheDroite2.classList.remove("appear");
    gaucheDroite1.classList.add("appear");
  }
  if ($("#plusieursjours").is(":checked")) {
    gaucheDroite1.classList.remove("appear");
    gaucheDroite2.classList.add("appear");
  }
}

function createMotif(motif) {
  const motifsection = $(".motifsection")[0];
  motifsection.innerHTML = "";
  motifTitre = document.createElement("h4");
  motifTitre.setAttribute("class", "title3");
  motifTitre.innerHTML = motif.topTitle;

  motifsection.appendChild(motifTitre);

  const motifListCode = document.createElement("div");
  motifListCode.setAttribute("class", "contenumotif");

  var listMotif = motif.members;
  for (var x = 0; x < listMotif.length; x++) {
    var motifListeElement = document.createElement("div");
    motifListeElement.setAttribute("class", "option");
    motifListeElement.innerHTML =
      '<h4 class="codetitle">' + listMotif[x].name + " : " + listMotif[x].title;
    ("</h4>");

    motifListCode.appendChild(motifListeElement);
    var listOption = listMotif[x].options;
    for (var y = 0; y < listOption.length; y++) {
      var optionListeElement = document.createElement("div");
      optionListeElement.setAttribute("class", "option2");
      optionListeElement.innerHTML =
        '<input type="radio" name="code" class="option" id="' +
        listMotif[x].options[y].op_id +
        '" value ="' +
        listMotif[x].options[y].op_label +
        '" >' +
        listMotif[x].options[y].op_label +
        "</input>";

      motifsection.appendChild(motifListCode);

      motifListeElement.appendChild(optionListeElement);
    }
  }
}

function addParametersInForm() {
  try {
    var parameters = location.search.substring(1).split("&");
    console.log(parameters);

    var temp = parameters[0].split("=");

    l = decodeURI(temp[1]); //decodeURI va calculer une nouvelle chaîne de caractères et remplace les séquences d'échappement hexadécimales par les caractères qu'elles représentent.
    console.log(l);

    temp = parameters[1].split("=");
    p = decodeURI(temp[1]);
    console.log(p);

    temp = parameters[2].split("=");
    c = decodeURI(temp[1]);
    console.log(c);

    temp = parameters[3].split("=");
    d = decodeURI(temp[1]);
    console.log(d);

    temp = parameters[4].split("=");
    e = decodeURI(temp[1]);
    console.log(e);

    temp = parameters[5].split("=");
    f = decodeURI(temp[1]);
    console.log(f);

    temp = parameters[6].split("=");
    g = decodeURI(temp[1]);
    console.log(g);

    temp = parameters[7].split("=");
    h = decodeURI(temp[1]);
    console.log(h);

    document.getElementById("parametre1").innerHTML = l;
    document.getElementById("parametre2").innerHTML = p;
    document.getElementById("formation").innerHTML = c;
    document.getElementById("jours").innerHTML = d.replaceAll("-", " ");
    document.getElementById("date").innerHTML = e;
    document.getElementById("time1").innerHTML = f;
    document.getElementById("time2").innerHTML = g;
    document.getElementById("nomprenom").innerHTML = l + " " + p;
    document.getElementById("codemotif").innerHTML = h.replaceAll("+", "  ");
  } catch (error) {
    console.error("Il n'y a pas de paramètres");
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
}
