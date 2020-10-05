import React, { useState, useEffect } from "react";
import "./style.css";

import Header from "../../components/Header";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import SearchBox from "../../components/SearchBox";
import api from "../../services/api";
import CategoryBanner from "../../components/CategoryBanner";
import WarningButton from "../../components/WarningButton";
import SuccessButton from "../../components/SuccessButton";

function Main() {
  const [products, setProducts] = useState([]);
  const [buttonState, setButtonState] = useState([]);
  const [cardButtonName, setCardButtonName] = useState([]);

  const handleButtonclick = async (index, prodCodigo) => {
    await api
      .post("/cart", {
        filial: sessionStorage.getItem("filial"),
        codigo: sessionStorage.getItem("codigo"),
        prodCodigo,
        prodQtd: 1,
      })
      .then((response) => {
        if (response.data) {
          setButtonState((state) =>
            state.map((item, i) => (index === i ? "success" : item))
          );
          setCardButtonName((state) =>
            state.map((item, i) => (index === i ? <SuccessButton /> : item))
          );
        } else {
          setButtonState((state) =>
            state.map((item, i) => (index === i ? "warning" : item))
          );
          setCardButtonName((state) =>
            state.map((item, i) => (index === i ? <WarningButton /> : item))
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setButtonState((state) =>
          state.map((item, i) => (index === i ? "warning" : item))
        );
        setCardButtonName((state) =>
          state.map((item, i) => (index === i ? <WarningButton /> : item))
        );
      });
  };

  useEffect(() => {
    const loadProducts = async () => {
      await api
        .get(`/rand?filial=${sessionStorage.getItem("filial")}`, {
          headers: { "x-access-token": sessionStorage.getItem("token") },
        })
        .then((response) => {
          setProducts(response.data);
          setButtonState(response.data.map(() => ""));
          setCardButtonName(response.data.map(() => "Adicionar no Carrinho"));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="banner">
        <img
          src={process.env.PUBLIC_URL + "/images/banner.jpg"}
          alt="banner"
          width="100%"
          height="100%"
        />
        <div className="darker"></div>
        <div className="main-form">
          <SearchBox placeholder="Do que você está precisando hoje?" />
        </div>
        <div className="text-content">
          <div className="title">
            <p>Tudo que você precisa em um só lugar</p>
          </div>
          <div className="textBody">
            Oferecemos uma quantidade extremamente diversificada de produtos que
            irão atender às suas necessidades e as da sua empresa. Venha
            conferir todo o nosso catálogo e teremos o maior prazer em lhe
            atender
          </div>
        </div>
      </div>
      <div className="big-category">
        <CategoryBanner image="mobile-phone.jpg" name="Celulares" />
        <CategoryBanner image="laptop.jpg" name="Computadores" />
        <CategoryBanner image="tv.jpg" name="Televisões" />
        <CategoryBanner image="acessories.jpg" name="Acessórios" />
      </div>
      <div className="body-product-container">
        {products.map((product, index) => {
          return (
            <Card
              name={product.PROD_DESCRICAO}
              price={product.PROD_PRECO_VENDA}
              id={product.PROD_CODIGO}
              key={product.PROD_CODIGO}
              image={product.PROD_IMAG_NOME}
              buttonClass={buttonState[index]}
              buttonClick={() => {
                handleButtonclick(index, product.PROD_CODIGO);
              }}
              buttonName={cardButtonName[index]}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Main;
