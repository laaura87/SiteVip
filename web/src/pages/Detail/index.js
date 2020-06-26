import React, { useState, useEffect } from "react";
import "./style.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import api from "../../services/api";

function Detail({ match: { params } }) {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await api
        .get(`/products/${params.prodCodigo}`)
        .then((response) => {
          return response.data;
        });
      setProduct(data.product);
      setRelatedProducts(data.relatedProducts);
    };
    loadProduct();
  }, [params.prodCodigo]);
  return (
    <>
      <Header />
      <div className="productContainer">
        <img
          className="imgContainer"
          alt="img"
          src={`http://187.84.80.162/imagens/${product.PROD_IMAG_NOME}`}
        />
        <div className="info"></div>
      </div>
      <div className="relatedProducts">
        {relatedProducts.map((relatedProduct) => {
          return (
            <Card
              key={relatedProduct.PROD_CODIGO}
              name={relatedProduct.PROD_DESCRICAO}
              price={relatedProduct.PROD_PRECO_VENDA}
              image={relatedProduct.PROD_IMAG_NOME}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Detail;
