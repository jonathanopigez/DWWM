const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    taille: [],
    prix: [],
    categorie: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categorie: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

const pizzaModel = mongoose.model("pizza", pizzaSchema);
module.exports = pizzaModel;
