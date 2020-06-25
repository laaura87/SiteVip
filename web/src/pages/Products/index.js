import React, { useState, useEffect } from "react";
import "./style.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import SearchBox from "../../components/SearchBox";
import DefaultButton from "../../components/DefaultButton";

import api from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await api.get("/products").then((response) => {
        return response.data;
      });

      setProducts(products);
    };
    loadProducts();
  }, []);

  return (
    <>
      <Header />
      <SearchBox />
      <div className="bodyContent">
        {products.map((product) => {
          return (
            <Card
              key={product.PROD_CODIGO}
              name={product.PROD_DESCRICAO}
              price={product.PROD_PRECO_VENDA}
            />
          );
        })}
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
