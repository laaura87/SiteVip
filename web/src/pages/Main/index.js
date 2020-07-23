import React, { useState, useEffect } from "react";
import "./style.css";

import Header from "../../components/Header";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import SearchBox from "../../components/SearchBox";
import api from "../../services/api";
import CategoryBanner from "../../components/CategoryBanner";

function Main() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      await api
        .get(`/rand?filial=${sessionStorage.getItem("filial")}`, {
          headers: { "x-access-token": sessionStorage.getItem("token") },
        })
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
      <div className="banner">
        <img
          src={process.env.PUBLIC_URL + "/images/banner.jpg"}
          alt="banner"
          width="100%"
          height="100%"
        />
        <div className="main-form">
          <SearchBox placeholder="Do que você está precisando hoje?" />
        </div>
        <div className="title">
          <p>Tudo que você precisa em um só lugar</p>
        </div>
        <div className="textBody">
          Oferecemos uma quantidade extremamente diversificada de produtos que
          irão atender às suas necessidades e as da sua empresa. Venha conferir
          todo o nosso catálogo e teremos o maior prazer em lhe atender
        </div>
      </div>
      <div className="big-category">
        <CategoryBanner image="mobile-phone.jpg" name="Celulares" />
        <CategoryBanner image="laptop.jpg" name="Computadores" />
        <CategoryBanner image="tv.jpg" name="Televisões" />
        <CategoryBanner image="acessories.jpg" name="Acessórios" />
      </div>
      <div className="body-product-container">
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
