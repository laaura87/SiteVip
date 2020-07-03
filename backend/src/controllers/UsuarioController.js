const connection = require("../connection");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

module.exports = {
  async login(req, res) {
    const cliente = await connection("CLIENTE_SENHA")
      .where("CLIE_CPFCNPJ", req.body.clieCpfCnpj)
      .select("CLIE_CPFCNPJ", "SENHA_MD5", "CLIE_CODIGO")
      .catch(function (err) {
        console.log(err.message);
        return false;
      });

    if (cliente.length == 0) {
      return res.status(404).json({
        error: true,
        message:
          "Dados inválidos. Verifique se seu login e senha estão corretos",
      });
    }

    if (cliente === false) {
      return res.status(500).json({
        error: true,
        message: "Erro na autenticação. Tente novamente mais tarde",
      });
    }

    if (cliente[0].SENHA_MD5 === md5(req.body.senha)) {
      const token = jwt.sign(
        {
          id: cliente[0].TITU_CODIGO,
          nome: cliente[0].SOCI_NOME,
        },
        process.env.SECRET
      );

      return res.status(200).json({
        codigo: cliente[0].CLIE_CODIGO,
        token,
      });
    } else {
      return res.status(401).json({ error: true, message: "Erro no servidor" });
    }
  },
};
