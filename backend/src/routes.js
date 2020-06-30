const routes = require("express").Router();

const ProdutoController = require("./controllers/ProdutoController");
const CategoriaController = require("./controllers/CategoriaController");
const UsuarioController = require("./controllers/UsuarioController");
const auth = require("./services/auth");

routes.get("/", (req, res) => {
  res.json({
    message: "Meu alegre coração palpita por um universo de esperança",
  });
});
routes.post("/login", UsuarioController.login);

routes.get("/products", auth, ProdutoController.index);
routes.get("/products/:prodCodigo", auth, ProdutoController.show);
routes.get("/rand", auth, ProdutoController.random);

routes.get("/categories", auth, CategoriaController.index);

module.exports = routes;
