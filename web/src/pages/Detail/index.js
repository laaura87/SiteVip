import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "./style.css";
import ReactImageZoom from "react-image-zoom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import ProductCounter from "../../components/ProductCounter";
import DefaultButton from "../../components/DefaultButton";
import WarningButton from "../../components/WarningButton";
import SuccessButton from "../../components/SuccessButton";
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
  const [buttonState, setButtonState] = useState([]);
  const [cardButtonName, setCardButtonName] = useState([]);
  const [buttonStateUnique, setButtonStateUnique] = useState("");
  const [cardButtonNameUnique, setCardButtonNameUnique] = useState(
    "Adicionar no Carrinho"
  );

  const handleButtonclick = async (index, prodCodigo) => {
    await api
      .post(
        "/cart",
        {
          filial: sessionStorage.getItem("filial"),
          codigo: sessionStorage.getItem("codigo"),
          prodCodigo,
          prodQtd: 1,
        },
        {
          headers: { "x-access-token": sessionStorage.getItem("token") },
        }
      )
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

  const handleSingleButtonclick = async (prodCodigo) => {
    await api
      .post(
        "/cart",
        {
          filial: sessionStorage.getItem("filial"),
          codigo: sessionStorage.getItem("codigo"),
          prodCodigo,
          prodQtd: quantity,
        },
        {
          headers: { "x-access-token": sessionStorage.getItem("token") },
        }
      )
      .then((response) => {
        if (response.data) {
          setButtonStateUnique("success");
          setCardButtonNameUnique(<SuccessButton />);
        } else {
          setButtonStateUnique("warning");
          setCardButtonNameUnique(<WarningButton />);
        }
      })
      .catch((err) => {
        console.log(err);
        setButtonStateUnique("warning");
        setCardButtonNameUnique(<WarningButton />);
      });
  };

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

      setRelatedProducts(data.relatedProducts);
      setButtonState(data.relatedProducts.map(() => ""));
      setCardButtonName(
        data.relatedProducts.map(() => "Adicionar no Carrinho")
      );
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
    if (tmp === 1) {
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
          <ReactImageZoom
            width={490}
            height={490}
            img={images}
            zoomPosition="original"
          ></ReactImageZoom>
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
            text={cardButtonNameUnique}
            onClick={() => handleSingleButtonclick(product.PROD_CODIGO)}
            className={buttonStateUnique}
          />

          <div className="description">
            <div className="name">{product.PROD_DESCRICAO}</div>
            <div className="detail">{images[0].descriptionn || ""}</div>
          </div>
        </div>
      </div>

      <div className="relatedProducts">
        {relatedProducts.map((relatedProduct, index) => {
          return (
            <Card
              key={relatedProduct.PROD_CODIGO}
              id={relatedProduct.PROD_CODIGO}
              name={relatedProduct.PROD_DESCRICAO}
              price={relatedProduct.PROD_PRECO_VENDA}
              image={relatedProduct.PROD_IMAG_NOME}
              buttonClass={buttonState[index]}
              buttonClick={() => {
                handleButtonclick(index, relatedProduct.PROD_CODIGO);
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

export default Detail;
