const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("./config/config");

const Pizza = require("./models/pizzaModel");
const Pizzas = require("./data/pizza-data");

// variable d'environnement dotenv et connexion mongoDB
dotenv.config();
connectDB();

//importation des datas
const importData = async () => {
  try {
    await Pizza.deleteMany();
    const sampleData = Pizzas.map(pizza => {
      return { ...pizza };
    });
    await Pizza.insertMany(sampleData);
    console.log("data importées");
    process.exit();
  } catch (error) {
    console.log(`error ${error.message}`);
    process.exit(1);
  }
};

const dataDestroy = () => {};
if (process.argv[2]  ==="-d") {
  dataDestroy();
} else {
  importData();
}
