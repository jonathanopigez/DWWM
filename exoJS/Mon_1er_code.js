let nombreLigne;
let affichage = "";
let nombre;

nombreLigne = prompt("saisir le nombre de lignes");
nombre = prompt("veuillez saisir un nombre ou un caractère");
for (i = 0; i < nombreLigne; i++) {
  affichage += nombre;
  console.log(affichage);
}
