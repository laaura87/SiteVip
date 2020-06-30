import React, { useState, useEffect } from "react";
import "./style.css";

import Header from "../../components/Header";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import api from "../../services/api";

function Main() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      await api
        .get("/rand")
        .then((response) => {
          setProducts(response.data);
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
      <div className="bodyContainer">
        <div className="banner">
          <img
            src={process.env.PUBLIC_URL + "/images/banner.jpg"}
            alt="banner"
            width="100%"
            height="100%"
          />
          <div className="effect"></div>
          <div className="title">
            <h2>Tudo que você precisa em um só lugar</h2>
          </div>
          <div className="textBody">
            Oferecemos uma quantidade extremamente diversificada de produtos que
            irão atender às suas necessidades e as da sua empresa. Venha
            conferir todo o nosso catálogo e teremos o maior prazer em lhe
            atender
          </div>
        </div>
        {products.map((product) => {
          return (
            <Card
              name={product.PROD_DESCRICAO}
              price={product.PROD_PRECO_VENDA}
              id={product.PROD_CODIGO}
              key={product.PROD_CODIGO}
              image={product.PROD_IMAG_NOME}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Main;
