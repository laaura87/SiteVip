const connection = require("../connection");

module.exports = {
  async index(req, res) {
    const categories = await connection("SIAC_TS.VW_SUBGRUPO")
      .join(
        "SIAC_TS.VW_PRODUTO",
        "SIAC_TS.VW_SUBGRUPO.SUB_GRP_CODIGO",
        "=",
        "SIAC_TS.VW_PRODUTO.SUB_GRP_CODIGO"
      )
      .where("SIAC_TS.VW_PRODUTO.PROD_ATIVO", "S")
      .andWhere("SIAC_TS.VW_PRODUTO.PROD_PRECO_01", ">", 0)
      .andWhere("SIAC_TS.VW_PRODUTO.FIL_CODIGO", 2)
      .select("SIAC_TS.VW_SUBGRUPO.SUB_GRP_DESCRICAO")
      .distinct();

    return res.json(categories);
  },
};
