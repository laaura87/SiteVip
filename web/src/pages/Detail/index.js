import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "./style.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import ProductCounter from "../../components/ProductCounter";
import DefaultButton from "../../components/DefaultButton";
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
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await api
        .get(`/products/${params.prodCodigo}`)
        .then((response) => {
          return response.data;
        });
      setProduct(data.product);
      console.log(data);
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
              original: `http://187.84.80.162/imagens/${image.PROD_IMAG_NOME}`,
              thumbnail: `http://187.84.80.162/imagens/${image.PROD_IMAG_NOME}`,
              descriptionn: image.PROD_IMAG_DESCRICAO,
              thumbnailClass: "thumbContainer",
              sizes: { width: "100%", height: "490px" },
            };
          })
        );
      }

      setRelatedProducts(data.relatedProducts);
      window.scrollTo(0, 0);
    };
    loadProduct();
  }, [params.prodCodigo]);

  const increment = () => {
    let tmp = quantity;
    setQuantity(tmp + 1);
  };

  const decrement = () => {
    let tmp = quantity;
    if (tmp == 1) {
      setQuantity(tmp);
    } else {
      setQuantity(tmp - 1);
    }
  };
  return (
    <>
      <Header />
      <div className="productContainer">
        <div className="imgContainer">
          <ImageGallery
            items={images}
            showNav={false}
            showPlayButton={false}
            showFullscreenButton={false}
            onErrorImageURL={`${process.env.PUBLIC_URL}/images/no-image.png`}
            disableSwipe={true}
          />
        </div>
        <div className="info">
          <div className="price">
            {product.PROD_PRECO_VENDA.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
          <div className="quantity">
            <ProductCounter
              value={quantity}
              addValue={() => increment()}
              subValue={() => decrement()}
            />
          </div>
          <DefaultButton
            text="Adicionar ao Carrinho"
            onClick={() => alert("uhuu")}
          />
          <div className="description">
            <div className="name">{product.PROD_DESCRICAO}</div>
            <div className="detail">{images[0].descriptionn || ""}</div>
          </div>
        </div>
      </div>
      <div className="relatedProducts">
        {relatedProducts.map((relatedProduct) => {
          return (
            <Card
              key={relatedProduct.PROD_CODIGO}
              id={relatedProduct.PROD_CODIGO}
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
