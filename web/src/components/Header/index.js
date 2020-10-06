import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { onSignOut } from "../../services/auth";

import "react-perfect-scrollbar/dist/css/styles.css";
import { FaSearch } from "react-icons/fa";
import { Header, InputSearch, MenuDropDown } from "./styles";

function Component() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      setCategories(
        await api
          .get(`/categories?filial=${sessionStorage.getItem("filial")}`, {
            headers: { "x-access-token": sessionStorage.getItem("token") },
          })
          .then((response) => {
            return response.data;
          })
      );
    };
    loadCategories();
  }, []);

  return (
    <>
      <Header>
        <div className="logo">
          <Link to="/home">
            <img
              className="logo"
              src={`${process.env.PUBLIC_URL}/images/vip_logo.png`}
              alt="Logo"
              width="120"
              height="120"
            />
          </Link>
        </div>

        <form action="" method="get">
          <InputSearch>
            <input type="text" placeholder="Buscar produto"></input>
            <span>
              <button type="submit" className="button-input">
                <FaSearch></FaSearch>
              </button>
            </span>
          </InputSearch>
        </form>

        <MenuDropDown></MenuDropDown>
      </Header>
    </>
  );
}

export default Component;

// {categories.map((category, index) => {
//   const subgrpQueryString = category.SUBGRUPO.map((subgrp) => {
//     return `${subgrp.SUB_GRP_DESCRICAO.replace(/\s/g, "_").replace(
//       /\//g,
//       "-"
//     )}`;
//   }).toString();
//   return (
//     <p key={index}>
//       <strong>
//         <Link to={`/products?category=${subgrpQueryString}`}>
//           {category.GRP_DESCRICAO}
//         </Link>
//       </strong>
//     </p>
//   );
// })}
