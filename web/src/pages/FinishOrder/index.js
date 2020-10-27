import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Skeleton from "@material-ui/lab/Skeleton";
import CurrencyInput from "react-currency-input-field";

import { FaShoppingCart } from "react-icons/fa";
import { Container, SelectPayment, Payment, Finish } from "./styles";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAxios } from "../../hooks/useAxios";

function FinishOrder() {
  const { register, handleSubmit } = useForm();
  const [payment, setPayment] = useState("");
  const [paymentInstallments, setPaymentInstallments] = useState(1);
  const [onePayment, setOnePayment] = useState(true);
  const [multiPayment, setMultiPayment] = useState(false);
  const [dinheiro, setDinheiro] = useState();
  const [duplicata, setDuplicata] = useState();

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

  let totalParcelasDuplicata = [];
  for (let i = 0; i < data?.parcelas[1].FORM_PAGT_NUM_PARCELA; i++) {
    totalParcelasDuplicata.push(i + 1);
  }

  function changeValues(name, value) {
    const dinheiroName = "dinheiro";
    if (name === dinheiroName) {
      console.log("dinheiro");

      const valueFloat = parseFloat(value);
      let decimal = sub - valueFloat;
      decimal = decimal.toFixed(2);
      if (valueFloat < sub) {
        setDinheiro(valueFloat);
        setDuplicata(decimal);
      } else if (value === sub) {
        setDinheiro(sub);
        setDuplicata(0);
      }
      console.log(dinheiro, duplicata);
    }
  }

  const onSubmit = (data) => {
    if (data.pagamentoMetodo === "DINHEIRO") {
      setPaymentInstallments(1);
      setPayment(data.pagamentoMetodo);
    } else {
      setPaymentInstallments(data.parcelas);
      setPayment(data.pagamentoMetodo);
    }
  };

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
          <div
            className={`onePayment ${onePayment ? "active" : ""}`}
            onClick={() => {
              setOnePayment(!onePayment);
              setMultiPayment(false);
            }}
          >
            Um metódo de pagamento
          </div>
          <div
            className={`multiPayment ${multiPayment ? "active" : ""}`}
            onClick={() => {
              setMultiPayment(!multiPayment);
              setOnePayment(false);
            }}
          >
            Dois metódos de pagamento
          </div>
        </SelectPayment>

        <Payment>
          {onePayment && (
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
                      <option
                        ref={register}
                        value={parcela.FORM_PAGT_DESCRICAO}
                      >
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
          )}

          {multiPayment && (
            <section className="multipayment">
              <div>
                <div>
                  <h3>Primeira forma de pagamento</h3>
                  <select
                    name="pagamentoMetodo"
                    ref={register}
                    onChange={handleSubmit(onSubmit)}
                  >
                    <option selected value="DINHEIRO">
                      DINHEIRO
                    </option>
                  </select>
                </div>
                <div>
                  <h3>Valor a ser pago em dinheiro</h3>
                  <CurrencyInput
                    name="dinheiro"
                    prefix="R$ "
                    placeholder="R$ 0,00"
                    decimalSeparator=","
                    groupSeparator="."
                    allowDecimals={true}
                    decimalsLimit={2}
                    precision={2}
                    allowNegativeValue={false}
                    value={dinheiro}
                    onChange={(value, name) => {
                      const valueFloat = parseFloat(value);
                      let decimal = sub - valueFloat;
                      decimal = decimal.toFixed(2);
                      if (valueFloat < sub) {
                        setDinheiro(valueFloat);
                        setDuplicata(decimal);
                      }
                      if (value === sub) {
                        setDuplicata(0);
                        setDinheiro(sub);
                      }
                    }}
                  />
                </div>
                <div>
                  <h3>Quantidade de Parcelas</h3>
                  <select
                    name="parcelas"
                    ref={register}
                    onChange={handleSubmit(onSubmit)}
                  >
                    <option value="1" selected disabled>
                      1x
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <h3>Primeira forma de pagamento</h3>
                  <select
                    name="pagamentoMetodo"
                    ref={register}
                    onChange={handleSubmit(onSubmit)}
                  >
                    <option selected value="DUPLICATA">
                      DUPLICATA
                    </option>
                  </select>
                </div>
                <div>
                  <h3>Valor a ser pago em duplicata</h3>
                  <CurrencyInput
                    name="duplicata"
                    prefix="R$ "
                    placeholder="R$ 0,00"
                    decimalSeparator=","
                    groupSeparator="."
                    allowDecimals={true}
                    decimalsLimit={2}
                    precision={2}
                    allowNegativeValue={false}
                    value={duplicata}
                    onChange={(value, name) => {
                      const valueFloat = parseFloat(value);
                      let decimal = sub - valueFloat;
                      decimal = decimal.toFixed(2);
                      if (valueFloat < sub) {
                        setDuplicata(valueFloat);
                        setDinheiro(decimal);
                      }
                      if (value === sub) {
                        setDinheiro(0);
                        setDuplicata(sub);
                      }
                    }}
                  />
                </div>
                <div>
                  <h3>Quantidade de Parcelas</h3>
                  <select
                    name="parcelas"
                    ref={register}
                    onChange={handleSubmit(onSubmit)}
                  >
                    {totalParcelasDuplicata.map((parcela) => {
                      return <option value={parcela}>{parcela}x</option>;
                    })}
                  </select>
                </div>
              </div>
            </section>
          )}
        </Payment>
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
