function colorLog(message, color) {
  switch (color) {
    case "mort":
      color = "#DB011C";
      break;
    case "gagne":
      color = "#0DD94E";
      break;
    case "vie":
      color = "#D9B00D";
      break;
    case "info":
      color = "#00D3FA";
      break;
    case "bot":
      color = "#B14BFA";
      break;
    default:
      color = "white";
      break;
  }
  console.log("%c" + message, "color: " + color);
}
cptRound = 1;
//----------- OBJET -------------
class personnage {
  constructor(_nom) {
    // ---------------FUNCTION POUR LES STATS ALEATOIRES--------------
    this.nombreAleatoire = function () {
      return Math.floor(Math.random() * (100 - 20 + 1) + 20);
    };

    // ---------------SA FUNCTION INFORMATION  ------------------------
    this.infos = function () {
      console.log(
        this.getNom() +
          " possède " +
          this.getVie() +
          " point de vie, " +
          this.getAttaque() +
          " point d'attaque et " +
          this.getDefense() +
          " point de défense"
      );
    };

    // ---------------SA FUNCTION ATTAQUER-----------------------------
    this.attaquer = function (defenseur) {
      colorLog(
        "Round " +
          cptRound +
          " " +
          this.getNom() +
          " bourre la gueule à  " +
          defenseur.getNom(),
        "bot"
      );
      colorLog(
        this.getNom() + " possède " + this.getVie() + " point de vie ",
        "vie"
      );
      colorLog(
        defenseur.getNom() +
          " possède " +
          defenseur.getVie() +
          " point de vie ",
        "vie"
      );
      if (this.getAttaque() > defenseur.getDefense()) {
        defenseur.setVie(defenseur.getVie() - 10);
      } else if (this.getAttaque() == defenseur.getDefense()) {
        defenseur.setVie(defenseur.getVie() - 5);
      } else {
        this.setVie(this.getVie() - 5);
      }
      cptRound += 1;
    };
    // ------------- GET & SET ---------------------------------------
    //-------------------EXISTE
    var winner = false;
    this.getWinner = function () {
      return winner;
    };
    this.setWinner = function (_newwinner) {
      winner = _newwinner;
    };
    var existe;
    this.getExiste = function () {
      return existe;
    };
    this.setExiste = function (_newexiste) {
      existe = _newexiste;
    };
    //--------------NOM
    var nom = _nom;
    this.getNom = function () {
      return nom;
    };
    this.setNom = function (_newnom) {
      nom = _newnom;
    };
    if (nom != "") {
      this.setNom(nom);
      existe = true;
    }
    //--------------VIE
    var vie = this.nombreAleatoire();

    this.getVie = function () {
      return vie;
    };
    this.setVie = function (_newvie) {
      vie = _newvie;
      if (this.getVie() <= 0) {
        this.setExiste(false);
        vie = 0;
        colorLog(this.getNom() + " a succombé a ses blessures ", "mort");
      }
    };
    // ------------ATTAQUE
    var attaque = this.nombreAleatoire();

    this.getAttaque = function () {
      return attaque;
    };
    this.setAttaque = function (_newattaque) {
      attaque = _newattaque;
    };
    // ---------DEFENSE
    var defense = this.nombreAleatoire();
    this.getDefense = function () {
      return defense;
    };
    this.setDefense = function (_newdefense) {
      defense = _newdefense;
    };
    // ------------- GET & SET ---------------------------------------
  }
}
class match {
  constructor() {
    // ON CREER UN TABLEAU

    var tableau = new Array();

    var nom = "";
    // ON DEFINI LE NOMBRE DE JOUEUR ET LE NOMBRE DE JOUEUR CREER QUI VA
    // AUGMENTER A CHAQUE FOIS QUE L'ON CREER UN PERSONNAGE
    const nbrJoueur = 3;
    var nbrJoueurCreer = 0;
    var nomExistant = false;

    //FONCTION QUI DEFINI UN NOMBRE ALEATOIRE PAR RAPPORT AU TABLEAU-------------
    this.tableauAleatoire = function () {
      return Math.floor(Math.random() * tableau.length);
    };
    //FONCTION QUI VERIFIE SI LE NOM EST DISPONIBLE
    this.verificationNom = function () {
      tableau.forEach((perso) => {
        if (nom == perso.getNom()) {
          nomExistant = true;

          alert("Nom deja pris veuillez en choisir un autre");
        }

        // nomExistant = false;
      });
    };

    this.wichWin = function () {
      if (tableau.length < 1 && perso.getWinner() == false) {
        perso.setWinner(true);
        if (perso.getWinner() == true) {
          colorLog(
            perso.getNom() + "Gagne le match au bout de " + cptRound + " rounds"
          );
          perso.infos();
        }
      }
    };

    this.run = function () {
      // ON CREER UN TABLEAU
      // ON INITIALISE LA VARIABLE NOM A UN CHAMP VIDE POUR POUVOIR BOUCLER
      // TANT QUE LE NOMBRE DE JOUEUR MAX N'EST PAS ATTEINT

      // BOUCLE POUR CREER DES PERSONNAGE JUSQU'A CE QUE LE NOMBRE DE JOUEUR CREER = NOMBRE DE JOUEUR, RENITIALISE LE NOM APRES L'AVOIR ENVOYER
      // DANS LE TABLEAU POUR POUVOIR RETOURNER AU DEBUT DU WHILE TANT QUE NOMBRE DE JOUEUR CREER N'EST PAS EGAL A NOMBRE DE JOUEUR
      //------------------------------ DEBUT DE LA BOUCLE------------------------------

      while (nom == "" && nbrJoueurCreer < nbrJoueur) {
        // Prompt( On saisie le nom des personnages);//
        nom = prompt("veuillez choisir un nom");

        if (nom != "") {
          this.verificationNom();

          // CREATION D'UN PERSONNAGE A PARTIR DE LA CLASS PERSONNAGE
          if (nomExistant == false) {
            var perso = new personnage(nom);
            colorLog("Vous avez créer " + nom, "info");

            // ON ENVOIE LE PERSONNAGE DANS LE TABLEAU

            tableau.push(perso);
            perso.infos();
            nbrJoueurCreer += 1;
          }
          // DEMANDE LES INFORMATIONS DU PERSONNAGE (L'OBJET)

          nom = "";
          nomExistant = false;
          colorLog("Nombre de joueur creer " + nbrJoueurCreer, "info");
        }
      }

      console.log(tableau);
      // ON DEFINIT UN ATTAQUANT, UN DEFENSEUR ET UN ANCIEN ATTAQUANT
      let randomAttq;
      let randomDef;
      let randomOldAttq = -1;

      // TANT QUE LA LONGUEUR DU TABLEAU EST SUPERIEUR A  1 ON DONNE UNE NOMBRE ALEATOIRE A L'ATTAQUANT ET AU DEFENSEUR
      // A L'AIDE DE LA FONCTION "tableauAleatoire"
      //------------------------------ DEBUT DE LA BOUCLE------------------------------
      while (tableau.length > 1) {
        randomAttq = this.tableauAleatoire();
        randomDef = this.tableauAleatoire();

        // SI L'ATTAQUANT EST DIFFERENT DE L'ANCIEN ATTAQUANT ET SI L'ATTAQUANT EST DIFFERENT DU DEFENSEUR, L'ATTAQUANT ATTAQUE LE DEFENSEUR

        if (randomAttq != randomOldAttq) {
          try {
            if (randomAttq != randomDef) {
              tableau[randomAttq].attaquer(tableau[randomDef]);

              // SI l'ATTAQUANT N'EXISTE PLUS LE RETIRER DU TABLEAU GRACE A SPLICE

              if (tableau[randomAttq].getExiste() == false) {
                tableau.splice(randomAttq, 1);
              }

              // SI LE DEFENSEUR N'EXISTE PLUS LE RETIRER DU TABLEAU GRACE A SPLICE

              if (tableau[randomDef].getExiste() == false) {
                tableau.splice(randomDef, 1);
              }

              // L'ATTAQUANT DONNE SA VALEUR A L'ANCIEN ATTAQUANT

              randomOldAttq = randomAttq;
            }
          } catch (error) {
            alert(
              "on essaye d'accéder à un élément du tableau qui n'existe plus"
            );
          }
        }
      }
      //------------------------------ FIN DE LA BOUCLE------------------------------
    };

    // ON LANCE LE COMBAT
    // this.run();
    // ON LANCE LE COMBAT
  }
}

//----------- OBJET -------------

var premierMatch = new match();
premierMatch.run();
premierMatch.wichWin();
