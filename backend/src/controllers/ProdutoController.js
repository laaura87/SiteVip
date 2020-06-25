const connection = require("../connection");

module.exports = {
  async index(req, res) {
    const produtos = await connection("SIAC_TS.VW_PRODUTO")
      .where("FIL_CODIGO", 2)
      .andWhere("PROD_ATIVO", "S")
      .andWhere(
        "SIAC_TS.VW_SUBGRUPO.SUB_GRP_DESCRICAO",
        "LIKE",
        req.query.category || "%"
      )
      .andWhere("PROD_DESCRICAO", "LIKE", `%${req.query.description || "%"}%`)
      .join(
        "SIAC_TS.VW_SUBGRUPO",
        "SIAC_TS.VW_PRODUTO.SUB_GRP_CODIGO",
        "=",
        "SIAC_TS.VW_SUBGRUPO.SUB_GRP_CODIGO"
      )
      .select(
        "SIAC_TS.VW_PRODUTO.PROD_CODIGO",
        "SIAC_TS.VW_PRODUTO.PROD_DESCRICAO",
        "SIAC_TS.VW_PRODUTO.PROD_PRECO_VENDA",
        "SIAC_TS.VW_SUBGRUPO.SUB_GRP_DESCRICAO",
        "SIAC_TS.VW_PRODUTO.PROD_QTD_ATUAL"
      )
      .distinct()
      .paginate({ perPage: 16, currentPage: req.query.page || 1 })
      .catch((err) => {
        console.log(err);
        return false;
      });
    if (produtos === false)
      return res.status(500).json({ err: "Erro do servidor" });

    const imageProducts = await produtos.data.map(async (product) => {
      return await connection("SIAC_TS.VW_PRODUTO_IMAGEM")
        .where("PROD_CODIGO", product.PROD_CODIGO)
        .select("PROD_IMAG_DESCRICAO", "PROD_IMAG_NOME")
        .then((response) => {
          if (response.length === 0) {
            const obj = {
              PROD_CODIGO: product.PROD_CODIGO,
              PROD_DESCRICAO: product.PROD_DESCRICAO,
              PROD_PRECO_VENDA: product.PROD_PRECO_VENDA,
              SUB_GRP_DESCRICAO: product.SUB_GRP_DESCRICAO,
              PROD_QTD_ATUAL: product.PROD_QTD_ATUAL,
              PROD_IMAG_NOME: false,
              PROD_IMAG_DESCRICAO: false,
            };
            return obj;
          } else {
            const obj = {
              PROD_CODIGO: product.PROD_CODIGO,
              PROD_DESCRICAO: product.PROD_DESCRICAO,
              PROD_PRECO_VENDA: product.PROD_PRECO_VENDA,
              SUB_GRP_DESCRICAO: product.SUB_GRP_DESCRICAO,
              PROD_QTD_ATUAL: product.PROD_QTD_ATUAL,
              PROD_IMAG_NOME: response[0].PROD_IMAG_NOME,
              PROD_IMAG_DESCRICAO: response[0].PROD_IMAG_DESCRICAO,
            };
            return obj;
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    });
    let result;
    await Promise.all(imageProducts).then((results) => (result = results));
    return res.json(result);
  },
};
