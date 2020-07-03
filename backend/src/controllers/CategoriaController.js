const connection = require("../connection");

module.exports = {
  async index(req, res) {
    const grupos = await connection("SIAC_TS.VW_SUBGRUPO")
      .join(
        "SIAC_TS.VW_PRODUTO",
        "SIAC_TS.VW_SUBGRUPO.SUB_GRP_CODIGO",
        "=",
        "SIAC_TS.VW_PRODUTO.SUB_GRP_CODIGO"
      )
      .join(
        "SIAC_TS.VW_GRUPO",
        "SIAC_TS.VW_SUBGRUPO.GRP_CODIGO",
        "=",
        "SIAC_TS.VW_GRUPO.GRP_CODIGO"
      )
      .where("SIAC_TS.VW_PRODUTO.PROD_ATIVO", "S")
      .andWhere("SIAC_TS.VW_PRODUTO.PROD_PRECO_01", ">", 0)
      .andWhere("SIAC_TS.VW_PRODUTO.FIL_CODIGO", req.query.filial || 2)
      .select("SIAC_TS.VW_GRUPO.GRP_DESCRICAO")
      .distinct();

    const subgrupos = await connection("SIAC_TS.VW_SUBGRUPO")
      .join(
        "SIAC_TS.VW_PRODUTO",
        "SIAC_TS.VW_SUBGRUPO.SUB_GRP_CODIGO",
        "=",
        "SIAC_TS.VW_PRODUTO.SUB_GRP_CODIGO"
      )
      .join(
        "SIAC_TS.VW_GRUPO",
        "SIAC_TS.VW_SUBGRUPO.GRP_CODIGO",
        "=",
        "SIAC_TS.VW_GRUPO.GRP_CODIGO"
      )
      .where("SIAC_TS.VW_PRODUTO.PROD_ATIVO", "S")
      .andWhere("SIAC_TS.VW_PRODUTO.PROD_PRECO_01", ">", 0)
      .andWhere("SIAC_TS.VW_PRODUTO.FIL_CODIGO", req.query.filial || 2)
      .select(
        "SIAC_TS.VW_SUBGRUPO.SUB_GRP_DESCRICAO",
        "SIAC_TS.VW_GRUPO.GRP_DESCRICAO"
      )
      .distinct();

    const categories = grupos
      .map((grupo) => {
        return {
          GRP_DESCRICAO: grupo.GRP_DESCRICAO,
          SUBGRUPO: subgrupos.filter(
            (subgrupo) => subgrupo.GRP_DESCRICAO === grupo.GRP_DESCRICAO
          ),
        };
      })
      .filter((category) => category.SUBGRUPO.length > 1);

    return res.json(categories);
  },
};
