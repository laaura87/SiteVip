import React from "react";
import "./style.css";

import Header from "../../components/Header";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

function Main() {
  return (
    <>
      <Header />
      <div className="bodyContainer">
        <Card name="Produto A" price="R$20,00" />
        <Card name="Produto B" price="R$20,00" />
        <Card name="Produto C" price="R$20,00" />
        <Card name="Produto D" price="R$20,00" />
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
      </div>
      <Footer />
    </>
  );
}

export default Main;
