const connection = require("../connection");
const moment = require("moment");

async function generateDavId(filial) {
  return await connection
    .raw(`SELECT SIAC_TS.fretorna_seq_dav('${filial}') DAV_CODIGO FROM DUAL`)
    .catch((err) => {
      console.log(`${err} + Erro ao gerar ID`);
      return false;
    });
}

module.exports = {
  async insert(req, res) {
    const davCode = await generateDavId(req.body.filial);
    if (davCode === false) {
      return res.status(500).json({ error: true });
    } else {
      const trx = await connection.transaction();
      try {
        const dav = await trx("DAV")
          .insert({
            FIL_CODIGO: req.body.filial,
            DAV_CODIGO: davCode,
            imei_codigo: "010264103000112",
            DAV_DATA_ABERTURA: moment(new Date()).format("DD/MM/YYYY"),
            CLIE_CODIGO: req.body.codigo,
            TABE_PREC_CODIGO: 1,
            DAV_SITUACAO: "A",
            DAV_SUB_TOTAL: req.body.total,
            DAV_VALOR_DESCONTO: 0,
            DAV_VALOR_ACRESCIMO: 0,
            DAV_TOTAL: req.body.total,
            FUNC_CODIGO: 4,
            CLIE_CPFCNPJ: req.body.clieCpfCnpj,
            DAV_OBSERVACAO: req.body.intervalo,
            DAV_INTRANET: "S",
            DAV_INTRANET_ATUALIZADO: "N",
          })
          .returning("*");

        const davItens = await trx("DAV_ITENS")
          .insert(
            req.body.itens.map((item, index) => {
              return {
                FIL_CODIGO: req.body.filial,
                DAV_CODIGO: davCode,
                IMEI_CODIGO: "010264103000112",
                DAV_ITEN_CODIGO: index + 1,
                PROD_CODIGO: item.PROD_CODIGO,
                DAV_ITEN_QTD: item.PROD_QTD,
                DAV_ITEN_PRECO_UNIT: item.PROD_PRECO,
                DAV_ITEN_TOTAL:
                  parseFloat(item.PROD_PRECO) * parseInt(item.PROD_QTD),
              };
            })
          )
          .returning("*");

        const davFormPagt = await trx("DAV_FORMA_PAGAMENTO").insert({
          FIL_CODIGO: req.body.filial,
          DAV_CODIGO: davCode,
          IMEI_CODIGO: "010264103000112",
          DAV_FORM_PAGT_ITEN: 1,
          FORM_PAGT_CODIGO: req.body.formPagtCodigo,
          DAV_FORM_PAGT_VENCIMENTO: "",
          DAV_FORM_PAGT_INTERVALO_DIAS: 0,
          DAV_FORM_PAGT_NUM_PARCELA: req.body.parcelas,
          DAV_FORM_PAGT_PERC_DESCONTO: 0,
          DAV_FORM_PAGT_VALOR_DESCONTO: 0,
          DAV_FORM_PAGT_PERC_ACRESCIMO: 0,
          DAV_FORM_PAGT_VALOR_ACRESCIMO: 0,
          DAV_FORM_PAGT_VALOR: req.body.total,
          DAV_FORM_PAGT_TOTAL: req.body.total,
        });
        await trx.commit();
        return res.status(200).json({ dav, davItens, davFormPagt });
      } catch {
        trx.rollback();
        return res.status(500).json({ error: true });
      }
    }
  },
};
