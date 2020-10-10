import React, { useState, useEffect } from "react";
import "./style.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardGrid from "../../components/CardGrid";

import useSWR from "swr";
import { fetcher } from "../../services/api";

import api from "../../services/api";

function Products({ history, location }) {
  console.log(`location ` + location);
  const query = new URLSearchParams(location.search);
  const description = query.get("description") || null;
  const categories = query.get("category") || "";
  const [page, setPage] = useState(query.get("page") || "1");

  const { data: products } = useSWR(
    `products?page=${page}&description=${
      description || ""
    }&category=${categories}&filial=${sessionStorage.getItem("filial")}`,
    { fetcher }
  );

  return (
    <>
      <Header />

      <div className="bodyContent">
        {products?.map((product) => {
          return (
            <CardGrid
              key={product.PROD_CODIGO}
              id={product.PROD_CODIGO}
              name={product.PROD_DESCRICAO}
              price={product.PROD_PRECO_VENDA}
              image={product.PROD_IMAG_NOME}
            />
          );
        })}
      </div>

      <Footer />
    </>
  );
}

export default Products;

// const [page, setPage] = useState(query.get("page") || "1");
// const [buttonState, setButtonState] = useState([]);
// const [cardButtonName, setCardButtonName] = useState([]);

// const handleButtonclick = async (index, prodCodigo) => {
//   await api
//     .post("/cart", {
//       filial: sessionStorage.getItem("filial"),
//       codigo: sessionStorage.getItem("codigo"),
//       prodCodigo,
//       prodQtd: 1,
//     })
//     .then((response) => {
//       if (response.data) {
//         setButtonState((state) =>
//           state.map((item, i) => (index === i ? "success" : item))
//         );
//         setCardButtonName((state) =>
//           state.map((item, i) => (index === i ? <SuccessButton /> : item))
//         );
//       } else {
//         setButtonState((state) =>
//           state.map((item, i) => (index === i ? "warning" : item))
//         );
//         setCardButtonName((state) =>
//           state.map((item, i) => (index === i ? <WarningButton /> : item))
//         );
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       setButtonState((state) =>
//         state.map((item, i) => (index === i ? "warning" : item))
//       );
//       setCardButtonName((state) =>
//         state.map((item, i) => (index === i ? <WarningButton /> : item))
//       );
//     });
// };

// useEffect(() => {
//   setButtonState(products?.map(() => ""));
//   setCardButtonName(products?.map(() => "Adicionar no Carrinho"));

//   window.scrollTo(0, 0);
// }, [products]);

// const nextPage = () => {
//   let search;
//   description || categories
//     ? (search = `?page=${(
//         parseInt(page) + 1
//       ).toString()}&description=${description}&category=${categories}`)
//     : (search = `?page=${(parseInt(page) + 1).toString()}`);
//   console.log(search);
//   setPage((parseInt(page) + 1).toString());
//   history.push({
//     pathname: "/products",
//     search,
//   });
// };

// const previousPage = () => {
//   if (parseInt(page) === 1) {
//     //do nothing
//   } else {
//     let search;
//     description
//       ? (search = `?page=${(
//           parseInt(page) - 1
//         ).toString()}&description=${description}&category=${categories}&filial=${sessionStorage.getItem(
//           "filial"
//         )}`)
//       : (search = `?page=${(parseInt(page) - 1).toString()}`);
//     history.push({
//       pathname: "/products",
//       search,
//     });
//     setPage((parseInt(page) - 1).toString());
//   }
// };
