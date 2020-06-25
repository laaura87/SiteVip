const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./src/routes"));

app.listen(3333, () => {
  console.log("Servidor ouvindo na porta 3333");
});
