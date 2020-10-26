import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Container } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useAxios } from "../../hooks/useAxios";

function FinishOrder() {
  const { register, handleSubmit } = useForm();
  const [payment, setPayment] = useState("");

  const { data } = useAxios(
    `/cart?filial=${sessionStorage.getItem(
      "filial"
    )}&codigo=${sessionStorage.getItem("codigo")}`
  );

  const onSubmit = (data) => {
    console.log(data);
    setPayment(data);
  };

  let sub = 0;
  const aux = data?.products?.map((product) => {
    sub += product.PROD_PRECO_VENDA * product.PROD_QTD;
    return sub;
  });
  console.log(payment);
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
          <section>
            <div>
              <select
                name="pagamentoMetodo"
                ref={register}
                onChange={handleSubmit(onSubmit)}
              >
                <option selected disabled>
                  Selecione a forma de pagamento
                </option>
                {data?.parcelas?.map((parcela) => {
                  return (
                    <option ref={register} value={parcela.FORM_PAGT_DESCRICAO}>
                      {parcela.FORM_PAGT_DESCRICAO}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <select name="parcelas" ref={register}>
                <option selected disabled>
                  Selecione a quantidade das parcelas
                </option>
                {payment.pagamentoMetodo == "DINHEIRO" && (
                  <option value="1" selected>
                    1x
                  </option>
                )}

                {payment.pagamentoMetodo == "DUPLICATA" &&
                  data.parcelas.map((parcela, index) => {
                    return <option value={parcela}> {index}x</option>;
                  })}
              </select>
            </div>
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default FinishOrder;
