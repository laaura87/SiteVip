import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Skeleton from "@material-ui/lab/Skeleton";

import { FaShoppingCart } from "react-icons/fa";
import { Container, SelectPayment, Finish } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useAxios } from "../../hooks/useAxios";

function FinishOrder() {
  const { register, handleSubmit } = useForm();
  const [payment, setPayment] = useState("");
  const [paymentInstallments, setPaymentInstallments] = useState(1);
  const [classPayment, setClassPayment] = useState(0);

  const { data } = useAxios(
    `/cart?filial=${sessionStorage.getItem(
      "filial"
    )}&codigo=${sessionStorage.getItem("codigo")}`
  );

  const onSubmit = (data) => {
    if (data.pagamentoMetodo === "DINHEIRO") {
      setPaymentInstallments(1);
      setPayment(data.pagamentoMetodo);
    } else {
      setPaymentInstallments(data.parcelas);
      setPayment(data.pagamentoMetodo);
    }
  };

  function handleSubmitForm() {
    const object = {};
  }

  let sub = 0;

  const aux = data?.products?.map((product) => {
    sub += product.PROD_PRECO_VENDA * product.PROD_QTD;
    return sub;
  });

  let totalParcelasDuplicata = [];
  for (let i = 0; i < data?.parcelas[1].FORM_PAGT_NUM_PARCELA; i++) {
    totalParcelasDuplicata.push(i + 1);
  }

  if (!data) {
    return (
      <>
        <Header />
        <Container>
          <div className="all-products">
            <h3>Resumo dos produtos</h3>
            <div>
              <p>
                <Skeleton width={350} height={50} />
              </p>
              <p>
                <Skeleton width={100} height={50} />
              </p>
            </div>
          </div>

          <SelectPayment></SelectPayment>

          <Link to="/finalizar-pedido">
            <Finish>
              <p>Finalizar Pedido</p>
              <span>
                <FaShoppingCart />
              </span>
            </Finish>
          </Link>
        </Container>
        <Footer />
      </>
    );
  }

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

        <SelectPayment>
          <div className="onePayment active">Um metódo de pagamento</div>
          <div className="multPayment">Dois metódos de pagamento</div>
        </SelectPayment>
        <div className="payment">
          <section>
            <div>
              <h3>Formas de pagamento</h3>
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
              <h3>Quantidade de Parcelas</h3>
              <select
                name="parcelas"
                ref={register}
                onChange={handleSubmit(onSubmit)}
              >
                <option value="1" selected disabled>
                  Selecione a quantidade das parcelas
                </option>
                {payment === "DINHEIRO" && (
                  <option value="1" selected>
                    1x
                  </option>
                )}
                {payment === "DUPLICATA" &&
                  totalParcelasDuplicata.map((parcela) => {
                    return <option value={parcela}>{parcela}x</option>;
                  })}
              </select>
            </div>
          </section>
        </div>
        <Link to="/finalizar-pedido">
          <Finish>
            <p>Finalizar Pedido</p>
            <span>
              <FaShoppingCart />
            </span>
          </Finish>
        </Link>
      </Container>
      <Footer />
    </>
  );
}

export default FinishOrder;
