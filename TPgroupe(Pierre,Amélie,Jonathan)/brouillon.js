this.CreationPersonnage = function () {
  var tableau = new Array();
  const nbrJoueur = prompt("Nombre de champions ?");
  var nbrJoueurCreer = 0;
  var nom = "";

  while (nom == "" && nbrJoueurCreer < nbrJoueur) {
    nom = prompt("Veuillez saisir un nom");
    if (nom != "") {
      for (var i = 0; i <= tableau.length; i++) {
        if (nom == tableau[i].getNom()) {
          nom = prompt("Nom déja pris, veuillez en choisir un autre");
        }
      }
    } else {
      var perso = new personnage(nom);
      colorLog(nom + " viens d'étre créer", "info");
      perso.infos();
      tableau.push(perso);
      nbrJoueurCreer += 1;
      nom = "";
      colorLog("Nombre de joueur creer " + nbrJoueurCreer, "info");
    }
  }
  console.log(tableau);
};
