const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const app = express();

app.use(express.json());

app.use(require("./src/routes"));

app.listen(3333, () => {
  console.log("Servidor ouvindo na porta 3333");
});
