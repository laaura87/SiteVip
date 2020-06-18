const connection = require("../connection");

module.exports = {
  async index(req, res) {
    const produtos = await connection("SIAC_TS.VW_PRODUTO")
      .select("*")
      .limit(10);
    return res.json(produtos);
  },
};
