import React from "react";
import "./style.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import SearchBox from "../../components/SearchBox";
import DefaultButton from "../../components/DefaultButton";

function Products() {
  return (
    <>
      <Header />
      <SearchBox />
      <div className="bodyContent">
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
        <Card name="Produto 1" price="R$25,00" />
      </div>
      <div className="buttonBox">
        <div className="prev">
          <DefaultButton text="Anterior" />
        </div>
        <div className="prox">
          <DefaultButton text="Próximo" />
        </div>
      </div>
      <div className="space"></div>
      <Footer />
    </>
  );
}

export default Products;
