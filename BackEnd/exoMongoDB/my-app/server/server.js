const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const morgan = require("morgan");

dotenv.config();

connectDB();

const app = express();

//middlewares

app.use(express.json());
app.use(morgan("dev"));

//route

app.get("/", (req, res) => {
  res.send("<h1>Reponse du serveur Node</h1>");
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `serveur démarré en mode ${process.env.NODE_ENV} sur le port num ${process.env.PORT}`
  );
});
