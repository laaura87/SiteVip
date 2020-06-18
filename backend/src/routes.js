const routes = require("express").Router();

const ProdutoController = require("./controllers/ProdutoController");

routes.get("/", (req, res) => {
  res.json({
    message: "Meu alegre coração palpita por um universo de esperança",
  });
});

routes.get("/produto", ProdutoController.index);

module.exports = routes;
