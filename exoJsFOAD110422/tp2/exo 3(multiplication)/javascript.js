var nombre;
var multiplicateur = 1;
var resultat;

nombre = prompt("veuillez choisir un nombre");

for (multiplicateur <= 1; multiplicateur < 11; ) {
  resultat = nombre * multiplicateur;
  console.log(
    "le resultat de " + nombre + " x " + multiplicateur + " est " + resultat
  );
  document.write(
    "le resultat de " + nombre + " x " + multiplicateur + " est " + resultat
  )((multiplicateur = multiplicateur + 1));
}
