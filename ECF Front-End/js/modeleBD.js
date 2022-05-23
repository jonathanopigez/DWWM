const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".table-results");
const panierHTML = $("#panier");
const nav = $("#nav");
const total = document.getElementById("total");
const srcImg = "images/"; // emplacement des images de l'appli
const albumDefaultMini = srcImg + "noComicsMini.jpeg";
const albumDefault = srcImg + "noComics.jpeg";
const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
const srcAlbum = "albums/"; // emplacement des images des albums en grand
const buttonAuteur = $("#trieAuteur");
const buttonAlbums = $("#trieAlbums");
const albumsArray = "data/albums.js";
var nbrArticle = 0;


jQuery(document).ready(function ($) {
  const compteur = document.getElementById("compteur");
  searchInput.addEventListener("input", search);
  function CreateBookList() {
    albums.forEach((album) => {
      serie = series.get(album.idSerie);
      auteur = auteurs.get(album.idAuteur);
      var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
      nomFic = nomFic.replaceAll("'", "");
      nomFic = nomFic.replaceAll("!", "");
      nomFic = nomFic.replaceAll(".", "");
      nomFic = nomFic.replaceAll('"', "");
      nomFic = nomFic.replaceAll("?", "");
      const listItem = document.createElement("div");
      listItem.setAttribute("class", "table-item");
      listItem.innerHTML =
        '<div class = "container-image">' +
        '<img src="' +
        srcAlbum +
        nomFic +
        ".jpg" +
        '"/>' +
        "</div>" +
        '<p class="album">' +
        album.titre +
        "</p>" +
        '<p classe="titre">' +
        serie.nom +
        "</p>" +
        '<p classe="auteur">' +
        auteur.nom +
        "</p>" +
        '<p class="prix">' +
        album.prix +
        "€" +
        "</p>" +
        '<button value="' +
        nomFic +
        '" class="achat" type="submit" id="' +
        album.prix +
        '"><img src="images/cart.png"/></button>';
      searchResult.append(listItem);
    });
  }
  //#region code de base
  // Affichage des BD
  var txtSerie = document.getElementById("serie");
  var txtNumero = document.getElementById("numero");
  var txtTitre = document.getElementById("titre");
  var txtAuteur = document.getElementById("auteur");
  var txtPrix = document.getElementById("prix");
  var imgAlbum = document.getElementById("album");
  var imgAlbumMini = document.getElementById("albumMini");

  imgAlbum.addEventListener("error", function () {
    prbImg(this);
  });

  imgAlbumMini.addEventListener("error", function () {
    prbImg(this);
  });

  var id = document.getElementById("id");
  id.addEventListener("change", function () {
    getAlbum(this);
  });

  /**
   * Récupération de l'album par son id et appel de
   * la fonction d'affichage
   *
   * @param {number} num
   */
  function getAlbum(num) {
    var album = albums.get(num.value);

    if (album === undefined) {
      txtSerie.value = "";
      txtNumero.value = "";
      txtTitre.value = "";
      txtAuteur.value = "";
      txtPrix.value = 0;

      afficheAlbums(
        $("#albumMini"),
        $("#album"),
        albumDefaultMini,
        albumDefault
      );
    } else {
      var serie = series.get(album.idSerie);
      var auteur = auteurs.get(album.idAuteur);

      txtSerie.value = serie.nom;
      txtNumero.value = album.numero;
      txtTitre.value = album.titre;
      txtAuteur.value = auteur.nom;
      txtPrix.value = album.prix;

      var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

      // Utilisation d'une expression régulière pour supprimer
      // les caractères non autorisés dans les noms de fichiers : '!?.":$
      nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

      afficheAlbums(
        $("#albumMini"),
        $("#album"),
        srcAlbumMini + nomFic + ".jpg",
        srcAlbum + nomFic + ".jpg"
      );
    }
  }

  /**
   * Affichage des images, les effets sont chainés et traités
   * en file d'attente par jQuery d'où les "stop()) et "clearQueue()"
   * pour éviter l'accumulation d'effets si défilement rapide des albums.
   *
   * @param {object jQuery} $albumMini
   * @param {object jQuery} $album
   * @param {string} nomFic
   * @param {string} nomFicBig
   */
  function afficheAlbums($albumMini, $album, nomFicMini, nomFic) {
    $album
      .stop(true, true)
      .clearQueue()
      .fadeOut(100, function () {
        $album.attr("src", nomFic);
        $albumMini
          .stop(true, true)
          .clearQueue()
          .fadeOut(150, function () {
            $albumMini.attr("src", nomFicMini);
            $albumMini.slideDown(200, function () {
              $album.slideDown(200);
            });
          });
      });
  }

  /**
   * Affichage de l'image par défaut si le chargement de l'image de l'album
   * ne s'est pas bien passé
   *
   * @param {object HTML} element
   */
  function prbImg(element) {
    // console.log(element);
    if (element.id === "albumMini") element.src = albumDefaultMini;
    else element.src = albumDefault;
  }

  CreateBookList(albumsArray);
});

//#endregion
compteur.innerHTML = nbrArticle;
function search(e) {
  var albumFilter = new Map();
  searchString = e.target.value.toLowerCase();
  console.log(searchString);
  var idAuteurToSave = 0;
  for (var [idAuteur, auteur] of auteurs.entries()) {
    auteur.nom = auteur.nom.toLowerCase();
    console.log(auteur.nom);
    console.log(searchString);
    if (auteur.nom.indexOf(searchString) >= 0) {
      //remplacer le nom de l'auteur ici par le choix de l'utilisateur
      //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle

      console.log("on est làààààààààà  " + idAuteur);
      idAuteurToSave = parseInt(idAuteur);
      for (var [idAlbums, album] of albums.entries()) {
        if (album.idAuteur == idAuteurToSave) {
          serie = series.get(album.idSerie);
          auteur = auteurs.get(album.idAuteur);
          console.log(
            album.titre +
              " N°" +
              album.numero +
              " Série:" +
              serie.nom +
              " Auteur:" +
              auteur.nom
          );
          albumFilter.set(idAlbums, {
            titre: album.titre,
            numero: album.numero,
            idSerie: album.idSerie,
            idAuteur: album.idAuteur,
            prix: album.prix,
          });
        }
      }
    }
  }
  searchResult.innerHTML = "";
  albumFilter.forEach((album) => {
    serie = series.get(album.idSerie);
    auteur = auteurs.get(album.idAuteur);
    var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

    const listItem = document.createElement("div");
    listItem.setAttribute("class", "table-item");
    listItem.innerHTML =
      '<div class = "container-image">' +
      '<img src="' +
      srcAlbum +
      nomFic +
      ".jpg" +
      '"/>' +
      "</div>" +
      '<p class="album">' +
      album.titre +
      "</p>" +
      '<p classe="titre">' +
      serie.nom +
      "</p>" +
      '<p classe="auteur">' +
      auteur.nom +
      "</p>" +
      '<p class="prix">' +
      album.prix +
      "€" +
      "</p>" +
      '<button value="' +
      nomFic +
      '" class="achat"><img src="images/cart.png"/></button>';

    searchResult.append(listItem);
  });
}

//#region Fonction trie

function trieParAuteur() {
  searchResult.innerHTML = "";
  document.getElementById("trieAuteur").style.backgroundColor = "#8d8d8d";
  document.getElementById("trieAlbums").style.backgroundColor = "#dbdbdb";
  console.log("Liste des albums par auteur");

  for (var [idAuteur, auteur] of auteurs.entries()) {
    // Recherche des albums de l'auteur
    for (var [idAlbum, album] of albums.entries()) {
      if (album.idAuteur == idAuteur) {
        serie = series.get(album.idSerie);
        auteur = auteurs.get(album.idAuteur);
        var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
        console.log(
          auteur.nom +
            ", Album N°" +
            album.numero +
            " " +
            album.titre +
            ", Série:" +
            series.get(album.idSerie).nom
        );
        const listItem = document.createElement("div");
        listItem.setAttribute("class", "table-item");

        listItem.innerHTML =
          '<div class = "container-image">' +
          '<img src="' +
          srcAlbum +
          nomFic +
          ".jpg" +
          '"/>' +
          "</div>" +
          '<p class="album">' +
          album.titre +
          "</p>" +
          '<p classe="titre">' +
          series.get(album.idSerie).nom +
          "</p>" +
          '<p classe="auteur">' +
          auteur.nom +
          "</p>" +
          '<p class="prix">' +
          album.prix +
          "€" +
          "</p>" +
          '<button value="' +
          nomFic +
          '" class="achat"><img src="images/cart.png"/></button>';

        searchResult.append(listItem);
      }
    }
  }
}

function trieParAlbums() {
  searchResult.innerHTML = "";
  document.getElementById("trieAuteur").style.backgroundColor = "#dbdbdb";
  document.getElementById("trieAlbums").style.backgroundColor = "#8d8d8d";
  console.log("Liste des albums par série");
  for (var [idSerie, serie] of series.entries()) {
    // Recherche des albums de la série
    for (var [idAlbum, album] of albums.entries()) {
      if (album.idSerie == idSerie) {
        serie = series.get(album.idSerie);
        auteur = auteurs.get(album.idAuteur);
        var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
        nomFic = nomFic.replaceAll("'", "");
        console.log(
          serie.nom +
            ", Album N°" +
            album.numero +
            " " +
            album.titre +
            ", Auteur:" +
            auteurs.get(album.idAuteur).nom
        );
        const listItem = document.createElement("div");
        listItem.setAttribute("class", "table-item");

        listItem.innerHTML =
          '<div class = "container-image">' +
          '<img src="' +
          srcAlbum +
          nomFic +
          ".jpg" +
          '"/>' +
          "</div>" +
          '<p class="album">' +
          album.titre +
          "</p>" +
          '<p classe="titre">' +
          series.get(album.idSerie).nom +
          "</p>" +
          '<p classe="auteur">' +
          auteur.nom +
          "</p>" +
          '<p class="prix">' +
          album.prix +
          "€" +
          "</p>" +
          '<button value="' +
          nomFic +
          '" class="achat"><img src="images/cart.png"/></button>';

        searchResult.append(listItem);
      }
    }
  }
}

//#endregion

// #region fonction panier

var exist = false;
var panier = new Array();
var totalPrix = 0;
function afficherPanier() {
  reset();
  nbrArticle = 0;
  console.log(panier);
  const panierTitle = document.createElement("div");
  panierTitle.setAttribute("class", "paniertitle");
  panierTitle.innerHTML = "<h2>" + "Mon panier :" + "</h2>";
  panierHTML.append(panierTitle);
  panier.forEach((article) => {
    const listArticle = document.createElement("div");
    listArticle.setAttribute("class", "table-item");
    listArticle.innerHTML =
      '<div class = "container-image">' +
      '<img src="' +
      article.img +
      '"/>' +
      "</div>" +
      '<p class="album">' +
      article.nom +
      "</p>" +
      '<div class="quantityContainer">' +
      '<button class="quantityMoins" onclick="quantiteMoins()" data-id="'+article.nom+'">-</button>' +
      '<p classe="quantity">' +
      "x" +
      " " +
      article.quantity +
      "</p>" +
      '<button class="quantityPlus" onclick="quantitePlus()" data-id="'+article.nom+'">+</button>' +
      "</div>" +
      "<p>" +
      article.prix +
      " €" +
      "</p>";
    panierHTML.append(listArticle);
    total.innerHTML =
      "<p>Total de votre commande :" + " " + totalPrix + "€" + "</p>";
  });
 
}



function reset() {
  compteur.classList.add("invisible");
  document.getElementById("panier").innerHTML = "";
  console.log("effacer");
}

$(document).ready(function () {
  $(".achat").click(function () {
    var prix = $(this).attr("id");
    var prixAfficher = parseFloat(prix);
    nbrArticle += 1;
    totalPrix = totalPrix + prixAfficher;
    compteur.classList.remove("invisible");
    compteur.classList.add("animation");
    compteur.innerHTML = nbrArticle;
    let article = new Object();
    exist = true;
    article.existe = exist;
    article.quantity = 1;
    article.prix = prixAfficher * article.quantity;
    article.nom = $(this).val();
    article.img = srcAlbum + $(this).val() + ".jpg";
    articleExistant = panier.find((a) => a.nom == article.nom);

    if (articleExistant != undefined) {
      console.log("deja existant");
      articleExistant.quantity++;
      articleExistant.prix += article.prix;
      article.existe = false;
      console.log(panier);
    }
    if (article.existe == true) {
      panier.push(article);

      console.log(panier);
    } else {
      return;
    }
    setTimeout(function () {
      compteur.classList.remove("animation");
    }, 500);
  });
  
});

const quantitePlus = async(afficherPanier)=>{
  await afficherPanier;  
  console.log("fonction plus");
  let plus = document.querySelectorAll(".quantityPlus");
  console.log(plus);
  plus.forEach((positive) => {
  
  console.log(positive);


  for(i=0; i<panier.length; i++){
    if(panier[i].nom == positive.dataset.id){
      return (
      panier[i].quantity ++);
    }

  }

  })
}
const quantiteMoins = async(afficherPanier)=>{
  await afficherPanier;
  console.log("fonction moins");
  let moins = document.querySelectorAll(".quantityMoins");
  console.log(moins);
  moins.forEach((negative) => {
  
  console.log(negative);


  for(i=0; i<panier.length; i++){
    if(panier[i].nom == negative.dataset.id){
      panier[i].quantity --,
      console.log("quantite --"),
      console.log(panier);
    }
  }

  })
}
// #endregion
