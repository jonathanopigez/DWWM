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
        nomFic = nomFic.replaceAll("'", "");
        nomFic = nomFic.replaceAll("!", "");
        nomFic = nomFic.replaceAll(".", "");
        nomFic = nomFic.replaceAll('"', "");
        nomFic = nomFic.replaceAll("?", "");
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
        nomFic = nomFic.replaceAll("'", "");
        nomFic = nomFic.replaceAll("!", "");
        nomFic = nomFic.replaceAll(".", "");
        nomFic = nomFic.replaceAll('"', "");
        nomFic = nomFic.replaceAll("?", "");
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
var j =0;
function afficherPanier() {
  reset();
  var prixBase = article.prix;
 
  console.log(panier);
  
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
      '<button class="quantityMoins" onclick="quantiteMoins('+j+')"id="bm_'+j+'"value="'+prixBase+'">-</button>' +
      '<p id="p_'+j+'" class="quantity">' +
      
      
      article.quantity +
      "</p>" +
      '<button class="quantityPlus" onclick="quantitePlus('+ j +')" value="'+prixBase+'" id="bp_'+j+'">+</button>' +
      "</div>" +
      '<p id="prixQuantity'+j+'">' +
      article.prix +
      " €" +
      "</p>";
    panierHTML.append(listArticle);
    total.innerHTML =
       totalPrix + "€" ;
      j++
  });
 
}



function reset() {
  // compteur.classList.add("invisible");
  document.getElementById("panier").innerHTML = "";
 
}

$(document).ready(function () {
  /* Ajout d'un article au panier. */
  // j'ajoute une fonction au click sur chaque bouton avec la classe 'achat'
  $(".achat").click(function () {
    // je stock l'id du bonton clicker dans une variable prix (l'id des bouton correspondent aux prix du livre)
    
    var prix = $(this).attr("id");
    console.log($(this).attr("value"));
    // le ParseFloat permet de changer la valeur string en nombre decimal
    var prixAfficher = parseFloat(prix);
    // on incremente le nombre d'article vu qu'on viens de le clicker
    nbrArticle += 1;
    // on incremente le prix total
    totalPrix = totalPrix + prixAfficher;
    // ajout et suppression de class pour la notification
    compteur.classList.remove("invisible");
    compteur.classList.add("animation");
    compteur.innerHTML = nbrArticle;
    // on creer l'article
    article = new Object();
    // on lui dit qu'il exist
    exist = true;
    article.existe = exist;
    // on lui met une quantité a 1
    article.quantity = 1;
    // on defini son prix, ici le prix * la quantité
    article.prix = prixAfficher * article.quantity;
    // l'article prend la value du bouton clicker(chaque bouton possede comme value le titre du livre qui correspond)
    article.nom = $(this).val();
    // on lui donne l'image grace au srcalbum + la valeur du bonton qui correspond au nom
    // + jpg, ce qui nous renvoie dans le dossier image et pointe la bonne image pour le livre
    article.img = srcAlbum + $(this).val() + ".jpg";
    // on parcours le panier pour verifié si un article y est deja, dans ce cas on ne le push pas
    // on incrémente juste la quantité
    articleExistant = panier.find((a) => a.nom == article.nom);
   // vérification s'il existe + incrémentation
    if (articleExistant != undefined) {
     
      console.log("deja existant");
      // s'il existe on lui incrémente la quantité
      articleExistant.quantity++;
      
      // on incrémente le prix
      articleExistant.prix += article.prix;
      // on reinitialise la valeur exist a false
      article.existe = false;
      console.log(panier);
      afficherPanier();
    }
    // si l'article n'éxiste pas dans le panier, alors on peut le push
    if (article.existe == true) {
      panier.push(article);
      afficherPanier(panier);
      console.log(panier);
      // sinon on met fin a la fonction
    } else {
      return;
    }
    // timeout pour l'animation de la notification
    setTimeout(function () {
      compteur.classList.remove("animation");
    }, 500);
  });
  
});

async function quantitePlus(idbtn){
  let totalPanier = document.getElementById("total")
  let valuePrix = document.getElementById('bp_' + idbtn.toString()).value;
  let prixSeul = parseFloat(valuePrix)
  let quantity = document.getElementById('p_' + idbtn.toString());
  let prixQuantity = document.getElementById('prixQuantity'+idbtn.toString());
  article.quantity ++;
  quantity.innerText = parseInt(quantity.innerText)+1; 
  prixQuantity.innerText = parseFloat(prixQuantity.innerText)+prixSeul+"€";
  totalPrix = totalPrix + prixSeul;
  prixAffichable = totalPrix.toString()
  totalPanier.innerText = prixAffichable+"€"
  
  

}

async function quantiteMoins(idbtn){
  let totalPanier = document.getElementById("total")
  let valuePrix = document.getElementById('bm_' + idbtn.toString()).value;
  let prixSeul = parseFloat(valuePrix)
  let quantity = document.getElementById('p_'+idbtn.toString())
  let prixQuantity = document.getElementById('prixQuantity'+idbtn.toString());
  article.quantity --;
  if(article.quantity <= 0){
    article.existe = false
    articleSupprimer = panier.find((a) => a.existe == false);
    console.log(articleSupprimer);
    panier.splice(articleSupprimer);
  }
  quantity.innerText = parseInt(quantity.innerText)-1;
  prixQuantity.innerText = parseFloat(prixQuantity.innerText)-prixSeul+"€";
  totalPrix = totalPrix - prixSeul;
  prixAffichable = totalPrix.toString()
  totalPanier.innerText = prixAffichable+ "€"
  
  
  }

/* bouton Faire défiler vers le haut de la page. */
$("#onTop").click(function(){
  $('html,body').animate({scrollTop: 0}, 'slow');
})


// #endregion
