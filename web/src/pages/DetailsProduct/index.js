import React, { useState, useEffect } from "react";
import ReactImageMagnify from "react-image-magnify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {
  DetailsProducts,
  ContainerProduct,
  RelatedProducts,
  Container,
  LeftSide,
  RightSide,
} from "./styles";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import ProductUnavailable from "../../components/ProductUnavailable";
import ProductDisp from "../../components/ProductDisp";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ButtonBuy from "../../components/ButtonBuy";
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
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [images, setImages] = useState([{ description: null }]);
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
          `http://187.84.80.162:8082/imagens/${params.prodCodigo}_1.jpg`
        );
      }

      setRelatedProducts(data.relatedProducts);
      window.scrollTo(0, 0);
    };
    loadProduct();
  }, [params.prodCodigo]);

  //disponibilidade do produto
  let disp, dispButton;
  if (product.PROD_QTD_ATUAL > 0) {
    disp = <ProductDisp />;
    dispButton = <ButtonBuy />;
  } else {
    disp = <ProductUnavailable />;
    dispButton = " ";
  }

  //carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const productsRelated = relatedProducts.map((relatedProduct, index) => {
    return (
      <CardGrid
        key={relatedProduct.PROD_CODIGO}
        id={relatedProduct.PROD_CODIGO}
        name={relatedProduct.PROD_DESCRICAO}
        price={relatedProduct.PROD_PRECO_VENDA}
        image={relatedProduct.PROD_IMAG_NOME}
      />
    );
  });

  console.log(productsRelated);
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
              <ReactImageMagnify
                {...{
                  smallImage: {
                    isFluidWidth: true,
                    src: images,
                  },
                  largeImage: {
                    src: images,
                    width: 1200,
                    height: 1800,
                  },
                }}
              />
            </div>
            <DetailsProducts>
              <h1>{product.PROD_DESCRICAO}</h1>
              <div>
                {disp}

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

                <div className="buy-button">{dispButton}</div>
              </div>
            </DetailsProducts>
          </ContainerProduct>

          <RelatedProducts>
            <h1>Produtos relacionados</h1>
            <div>
              <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true}
                infinite={true}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                itemClass="image-item"
              >
                {relatedProducts.map((relatedProduct, index) => {
                  return (
                    <CardGrid
                      key={relatedProduct.PROD_CODIGO}
                      id={relatedProduct.PROD_CODIGO}
                      name={relatedProduct.PROD_DESCRICAO}
                      price={relatedProduct.PROD_PRECO_VENDA}
                      image={relatedProduct.PROD_IMAG_NOME}
                    />
                  );
                })}
              </Carousel>
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
