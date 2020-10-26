import React from "react";
import { Container } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAxios } from "../../hooks/useAxios";

function FinishOrder() {
  const { data } = useAxios(
    `/cart?filial=${sessionStorage.getItem(
      "filial"
    )}&codigo=${sessionStorage.getItem("codigo")}`
  );

  let sub = 0;
  const aux = data?.products?.map((product) => {
    sub += product.PROD_PRECO_VENDA * product.PROD_QTD;
    return sub;
  });
  console.log(data?.parcelas);

  return (
    <>
      <Header />
      <Container>
        <div className="all-products">
          <h3>Resumo dos produtos</h3>
          <div>
            {data?.products?.length > 1 ? (
              <p>{data?.products?.length} produtos</p>
            ) : (
              <p>{data?.products?.length} produto</p>
            )}
            <p>
              {sub.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>
        <div className="payment">
          <h3>Formas de pagamento</h3>
          <div>
            <select name="" id="">
              <option selected disabled>
                Selecione a forma de pagamento
              </option>
              {data?.parcelas?.map((parcela) => {
                return <option>{parcela.FORM_PAGT_DESCRICAO}</option>;
              })}
            </select>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default FinishOrder;
