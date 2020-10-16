import React, { useState, useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  DetailsProducts,
  ContainerProduct,
  RelatedProducts,
  Container,
  LeftSide,
  RightSide,
} from "./styles";

import ProductUnavailable from "../../components/ProductUnavailable";
import ProductDisp from "../../components/ProductDisp";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ButtonBuy from "../../components/ButtonBuy";
import ButtonUnavailable from "../../components/ButtonUnavailable";

import CardGrid from "../../components/CardGrid";
import MenuDesktop from "../../components/MenuDesktop";

import api from "../../services/api";

function Detail({ match: { params } }) {
  const [product, setProduct] = useState({
    PROD_CODIGO: "",
    PROD_DESCRICAO: "",
    PROD_PRECO_VENDA: "",
    SUB_GRP_DESCRICAO: "",
    PROD_QTD_ATUAL: "",
  });
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await api
        .get(
          `/products/${params.prodCodigo}?filial=${sessionStorage.getItem(
            "filial"
          )}`,
          {
            headers: { "x-access-token": sessionStorage.getItem("token") },
          }
        )
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
      setProduct(data.product);
      if (
        data.product.PROD_IMAG.length == 0 ||
        data.product.PROD_IMAG == undefined
      ) {
        setImages(`${process.env.PUBLIC_URL}/images/no-image.png`);
      } else {
        setImages(
          `http://187.84.80.162:8082/imagens/${params.prodCodigo}_1.jpg`
        );
      }

      setRelatedProducts(data.relatedProducts);
      window.scrollTo(0, 0);
    };
    loadProduct();
  }, [params.prodCodigo]);

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
      <Container>
        <LeftSide>
          <MenuDesktop />
        </LeftSide>
        <RightSide>
          <ContainerProduct>
            <div className="img-container">
              <img id="img" src={images} className="image" />
            </div>

            <DetailsProducts>
              <h1>{product.PROD_DESCRICAO}</h1>
              <div>
                {product.PROD_QTD_ATUAL > 0 && <ProductDisp />}

                {product.PROD_QTD_ATUAL == 0 && <ProductUnavailable />}

                <div className="price">
                  {product.PROD_PRECO_VENDA.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  <p>
                    Ou até em 10x de{" "}
                    {(product.PROD_PRECO_VENDA / 10).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}{" "}
                    no cartão
                  </p>
                </div>

                <div className="buy-button">
                  {product.PROD_QTD_ATUAL > 0 && (
                    <ButtonBuy id={product.PROD_CODIGO} />
                  )}

                  {product.PROD_QTD_ATUAL == 0 && <ButtonUnavailable />}
                </div>
              </div>
            </DetailsProducts>
          </ContainerProduct>

          <RelatedProducts>
            <h1>Produtos relacionados</h1>
            <div className="layout-grid">
              {relatedProducts.map((relatedProduct) => {
                return (
                  <CardGrid
                    key={relatedProduct.PROD_CODIGO}
                    id={relatedProduct.PROD_CODIGO}
                    name={relatedProduct.PROD_DESCRICAO}
                    price={relatedProduct.PROD_PRECO_VENDA}
                    image={relatedProduct.PROD_IMAG_NOME}
                    quantity={relatedProduct.PROD_QTD_ATUAL}
                  />
                );
              })}
            </div>
          </RelatedProducts>
        </RightSide>
      </Container>
      <Footer />
    </>
  );
}

export default Detail;

//Cod caso precise
/* <ImageGallery
            items={images}
            showNav={false}
            showPlayButton={false}
            showFullscreenButton={false}
            onErrorImageURL={`${process.env.PUBLIC_URL}/images/no-image.png`}
            disableSwipe={true}
          /> */

// {relatedProducts.map((relatedProduct, index) => {
//   return (
//     <CardGrid
//       key={relatedProduct.PROD_CODIGO}
//       id={relatedProduct.PROD_CODIGO}
//       name={relatedProduct.PROD_DESCRICAO}
//       price={relatedProduct.PROD_PRECO_VENDA}
//       image={relatedProduct.PROD_IMAG_NOME}
//     />
//   );
// })}
