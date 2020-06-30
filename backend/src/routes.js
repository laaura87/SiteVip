const routes = require("express").Router();

const ProdutoController = require("./controllers/ProdutoController");
const CategoriaController = require("./controllers/CategoriaController");

routes.get("/", (req, res) => {
  res.json({
    message: "Meu alegre coração palpita por um universo de esperança",
  });
});

routes.get("/products", ProdutoController.index);
routes.get("/products/:prodCodigo", ProdutoController.show);
routes.get("/rand", ProdutoController.random);

routes.get("/categories", CategoriaController.index);

module.exports = routes;
