const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".table-results");
const srcImg = "images/"; // emplacement des images de l'appli
const albumDefaultMini = srcImg + "noComicsMini.jpeg";
const albumDefault = srcImg + "noComics.jpeg";
const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
const srcAlbum = "albums/"; // emplacement des images des albums en grand
const buttonAuteur = $("#trieAuteur");
const buttonAlbums = $("#trieAlbums");
const albumsArray = "data/albums.js";

jQuery(document).ready(function ($) {
  searchInput.addEventListener("keyup", search);
  function CreateBookList() {
    albums.forEach((album) => {
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
        '<button type="submit" class="achat" id="button' +
        album.idSerie +
        '" onclick="addBasket()"><img src="images/cart.png"/></button>';

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

function search(e) {
  var albumFilter = new Map();
  searchString = e.target.value.toLowerCase();
  console.log(searchString);
  var idAuteurToSave = 0;
  for (var [idAuteur, auteur] of auteurs.entries()) {
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
      '<button type="submit" class="achat" id="button' +
      album.idSerie +
      '" onclick="addBasket()"><img src="images/cart.png"/></button>';

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
          '<button class="achat"><img src="images/cart.png"/></button>';

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
          '<button class="achat"><img src="images/cart.png"/></button>';

        searchResult.append(listItem);
      }
    }
  }
}

//#endregion

// #region fonction panier

function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

function addBasket(product) {
  let basket = getBasket();
  console.log(basket);
  let foundProduct = basket.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity++;
  } else {
    product.quantity = 1;
    basket.push(product);
  }

  saveBasket(basket);
}

function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter((p) => p.id != product.id);
  saveBasket(basket);
}

function changeQuantity(product, quantity) {
  let basket = getBasket();
  let foundProduct = basket.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      removeFromBasket(foundProduct);
    } else {
      saveBasket(basket);
    }
  }
}

function getNumberProduct() {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    number += product.quantity;
  }
  return number;
}

function getTotalPrice() {
  let basket = getBasket();
  let total = 0;
  for (let product of basket) {
    total += product.quantity * product.prix;
  }
  return total;
}
// #endregion
