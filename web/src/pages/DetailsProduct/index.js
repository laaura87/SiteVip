import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { DetailsProducts, ContainerProduct } from "./styles";
import { FaCheckCircle } from "react-icons/fa";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ButtonBuy from "../../components/ButtonBuy";

import api from "../../services/api";

function Detail({ match: { params } }) {
  const [product, setProduct] = useState({
    PROD_CODIGO: "",
    PROD_DESCRICAO: "",
    PROD_PRECO_VENDA: "",
    SUB_GRP_DESCRICAO: "",
    PROD_QTD_ATUAL: "",
  });

  const [images, setImages] = useState([{ description: null }]);

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
          return response.data;
        });
      setProduct(data.product);
      if (data.product.PROD_IMAG.length === 0) {
        setImages([
          {
            original: `${process.env.PUBLIC_URL}/images/no-image.png`,
            thumbnailClass: "thumbHide",
          },
        ]);
      } else {
        setImages(
          data.product.PROD_IMAG.map((image) => {
            return {
              original: `http://187.84.80.162:8082/imagens/${image.PROD_IMAG_NOME}`,
              thumbnail: `http://187.84.80.162:8082/imagens/${image.PROD_IMAG_NOME}`,
              descriptionn: image.PROD_IMAG_DESCRICAO,
              thumbnailClass: "thumbContainer",
              sizes: { width: "100%", height: "490px" },
            };
          })
        );
      }

      window.scrollTo(0, 0);
    };
    loadProduct();
  }, [params.prodCodigo]);

  return (
    <>
      <Header />
      <ContainerProduct>
        <div className="img-container">
          <ImageGallery
            items={images}
            showNav={false}
            showPlayButton={false}
            showFullscreenButton={false}
            onErrorImageURL={`${process.env.PUBLIC_URL}/images/no-image.png`}
            disableSwipe={true}
          />
        </div>
        <DetailsProducts>
          <h1>{product.PROD_DESCRICAO}</h1>

          <div className="disp">
            <span>
              <FaCheckCircle color={"green"} size={24} />
            </span>
            <p>PRODUTO DISPONÍVEL</p>
          </div>

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
            <ButtonBuy></ButtonBuy>
          </div>
        </DetailsProducts>
      </ContainerProduct>
      <Footer />
    </>
  );
}

export default Detail;
