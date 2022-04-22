// On définit les variables necessaires sur toute la page.

var players = [];
var randomAttaquant = 0;
var randomDefenseur = 0;
var randomAncienAttaquant;
var cptRound = 0;
var max = 100;
var min = 20;
var cptPerso = 1;
var cptCRS = 1;
var cptGJ = 1;

// Function Random
function GenRandom(length) {
  return Math.floor(Math.random() * length);
}

// couleur

function colorLog(message, color) {
  color = color || "black";

  switch (color) {
    case "success":
      color = "Green";
      break;
    case "info":
      color = "DodgerBlue";
      break;
    case "error":
      color = "Red";
      break;
    case "warning":
      color = "Orange";
      break;
    case "vainqueur":
      color = "Purple";
      break;
    case "fumigene":
      color = "White";
      break;
    case "canonAEau":
      color = "Cyan";
      break;
    default:
      color = color;
  }

  console.log("%c" + message, "color:" + color);
}

// Fin couleur

// info

function info(info) {
  colorLog(
    "Nom : " +
      info.GetNom() +
      info._type +
      "\n Vie : " +
      info.GetVie() +
      "\n Attaque : " +
      info.GetAttaque() +
      "\n Defense : " +
      info.GetDefense(),
    "info"
  );
}

// fin info

// Création de la classe "person" et son constructeur.

class person {
  constructor(unnom) {
    var _nom = unnom;
    this.nombreAleatoire = function () {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    var _vie = this.nombreAleatoire();
    if (_vie < min) {
      _vie = min;
    }
    if (_vie > max) {
      _vie = max;
    }
    var _attaque = this.nombreAleatoire();
    if (_attaque < min) {
      _attaque = min;
    }
    if (_attaque > max) {
      _attaque = max;
    }
    var _defense = this.nombreAleatoire();
    if (_defense < min) {
      _defense = min;
    }
    if (_defense > max) {
      _defense = max;
    }
    var _existe = false;
    this._type = "";
    this._nextType = "crs";
    if (unnom == undefined) {
      colorLog("LE PERSONNAGE N'A PAS PU ETRE CREE !!", "error");
    } else {
      colorLog("Nouveau personnage: " + _nom + " créé!", "success");
      _existe = true;
    }
    //On crée des fonctions pour pouvoir appeler les attibuts qui sont en privé dans la classe.

    this.GetNom = function () {
      return _nom;
    };
    this.GetVie = function () {
      return _vie;
    };
    this.SetVie = function (newvie) {
      _vie = newvie;
      if (_vie <= 0) {
        _existe = false;
        _vie = 0;
        colorLog("Le personnage " + _nom + this._type + " est dead.", "error");
      }
    };
    this.GetAttaque = function () {
      return _attaque;
    };

    this.GetDefense = function () {
      return _defense;
    };
    this.GetExiste = function () {
      return _existe;
    };
    this.SetExiste = function (newexiste) {
      _existe = newexiste;
    };
    this.SetNom = function (newnom) {
      _nom = newnom;
    };

    //methode attaquer :

    this.attaquer = function (defenseur) {
      colorLog(
        "Round : " +
          cptRound +
          "\nNouvelle attaque de " +
          _nom +
          this._type +
          " sur " +
          defenseur.GetNom() +
          defenseur._type +
          " !!",
        "warning"
      );
      if (_attaque > defenseur.GetDefense()) {
        defenseur.SetVie(defenseur.GetVie() - 10);
      } else {
        if (_attaque == defenseur.GetDefense()) {
          defenseur.SetVie(defenseur.GetVie() - 5);
        } else {
          if (_attaque < defenseur.GetDefense()) {
            this.SetVie(_vie - 5);
          }
        }
      }
      if (this.GetExiste() == false) {
        players.splice(randomAttaquant, 1);
      } else if (defenseur.GetExiste() == false) {
        players.splice(randomDefenseur, 1);
      }

      info(this);
      info(defenseur);
    };
  }
}

// Création de la classe CRS

class CRS extends person {
  constructor(unnom, unarg) {
    super(unnom);
    this.arg = unarg;

    this._attaque = this.GetAttaque() + 5;
    this._defense = this.GetDefense() + 5;
    this._vie = this.GetVie() - 5;
    this._type = " qui est un CRS";

    // methode attaquer GJ de la classe CRS
    this.attaquerGJ = function (gj) {
      var chance = Math.floor(Math.random() * 10 + 1);
      if (chance < 10 && chance > 2) {
        this.fumigene(gj);
      } else if (chance == 10) {
        this.canonAEau(gj);
      } else {
        this.normale(gj);
      }
      //console.log(chance);
      this.attaquer(gj);
    };
    // méthode fumigene
    this.fumigene = function (gj) {
      colorLog("attaque fumigene", "fumigene");
      gj.SetVie(gj.GetVie() - 5);
    };

    // méthode canonAEau
    this.canonAEau = function (gj) {
      colorLog("canon à eau", "canonAEau");
      gj.SetVie(gj.GetVie() - 10);
    };

    // méthode attaque normale
    this.normale = function (gj) {
      console.log("PAS DE COUPS SPECIAUX");
    };
  }
}

class GJ extends person {
  constructor(unnom, unarg) {
    super(unnom);
    this.arg = unarg;

    this._attaque = this.GetAttaque() - 5;
    this._defense = this.GetDefense() - 5;
    this._vie = this.GetVie() + 5;
    this._type = " qui est un Gilet Jaune";

    // methode attaquer CRS de la classe GJ
    this.attaquerCRS = function (crs) {
      var chance = Math.floor(Math.random() * 10 + 1);
      if (chance < 10 && chance > 2) {
        this.caillassage(crs);
      } else if (chance == 10) {
        this.mouvementdefoule(crs);
      } else {
        this.normale(crs);
      }
      //console.log(chance);
      this.attaquer(crs);
    };
    // méthode caillassage
    this.caillassage = function (crs) {
      console.log("CAILLASSAGE !!!! ");
      crs.SetVie(crs.GetVie() - 5);
    };

    // méthode Mouvement de Foule
    this.mouvementdefoule = function (crs) {
      console.log("Mouvement de foule");
      crs.SetVie(crs.GetVie() - 15);
    };
    // méthode attaque normale
    this.normale = function (crs) {
      console.log("PAS DE COUPS SPECIAUX");
    };
  }
}

// Création de la classe "match" et son constructeur.

class match {
  constructor() {
    var Choixpersonnage;
    var nbrJoueur;
    var ok = true;

    //Création de la fonction pour créer un personnage.

    this.CreerPersonnages = function () {
      nbrJoueur = parseInt(
        prompt(
          "Choisissez le nombre de personnages que vous souhaitez creer : "
        )
      );
      if (nbrJoueur % 2 != 0) {
        alert("Le nombre de joueurs n'est pas pair.");
        location.reload();
      } else {
        do {
          if (players.length % 2 == 0) {
            Choixpersonnage = "CRS n° " + cptCRS;
            var perso = new CRS(Choixpersonnage);
            cptCRS++;
          } else {
            Choixpersonnage = "Gilet Jaune n° " + cptGJ;
            var perso = new GJ(Choixpersonnage);
            cptGJ++;
          }
          info(perso);

          players.push(perso);
          console.log("nb CRS " + (cptCRS - 1));
          console.log("nb GJ " + (cptGJ - 1));

          cptPerso++;
        } while (nbrJoueur != players.length);
      }
    };

    function win(players) {
      if (players.some((player) => player._type === " qui est un CRS")) {
        colorLog(
          "Les CRS sont les vainqueurs ! Au round : " + cptRound,
          "vainqueur"
        );
        alert(
          "Les CRS sont les vainqueurs ! Au round : " + cptRound,
          "vainqueur"
        );
      } else if (
        players.some((player) => player._type === " qui est un Gilet Jaune")
      ) {
        colorLog(
          "Les Gilets Jaunes sont les vainqueurs ! Au round : " + cptRound,
          "vainqueur"
        );
        alert(
          "Les Gilets Jaunes sont les vainqueurs ! Au round : " + cptRound,
          "vainqueur"
        );
      }

      for (let k = 0; k < players.length; k++) {
        console.log(
          "Le " + players[k].GetNom() + " est toujours en vie! Bravo !"
        );
      }
    }
    // Création de la fonction pour lancer le combat.
    this.RunMatch = function () {
      while (
        players.some((player) => player._type === " qui est un CRS") &&
        players.some((player) => player._type === " qui est un Gilet Jaune")
      ) {
        randomAttaquant = GenRandom(players.length);
        var attaquant = players[randomAttaquant];
        randomDefenseur = GenRandom(players.length);
        var defenseur = players[randomDefenseur];

        if (randomAncienAttaquant != randomAttaquant) {
          if (randomAttaquant != randomDefenseur) {
            if (attaquant._type != defenseur._type) {
              cptRound++;

              if (attaquant._type == " qui est un CRS") {
                attaquant.attaquerGJ(defenseur);
              } else {
                attaquant.attaquerCRS(defenseur);
              }

              randomAncienAttaquant = randomAttaquant;
            }
          }
        }
      }
      win(players);
    };
  }
}
//on execute les fonctions de création de personnage et de lancement de combat.

var unmatch = new match();
unmatch.CreerPersonnages();
unmatch.RunMatch();
