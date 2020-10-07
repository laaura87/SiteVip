import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import { onSignOut, isSignedIn } from "../../services/auth";

import { slide as Menu } from "react-burger-menu";
import "react-perfect-scrollbar/dist/css/styles.css";
import { FaSearch, FaPhone, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import {
  Container,
  Header,
  InputSearch,
  MenuDropDown,
  SubHeader,
} from "./styles";

var styles = {
  bmBurgerButton: {
    position: "absolute",
    width: "36px",
    height: "30px",
    right: "12px",
    top: "76px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    top: "0",
    bottom: "0",
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    position: "fixed",
    top: "0",
    bottom: "0",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    width: "90%",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: "5px",
    fontSize: "18px",
    borderTop: "1px solid white",
    textAlign: "center",
    outline: "none",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

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

  let login;
  console.log(isSignedIn());
  if (isSignedIn()) {
    login = (
      <div
        onClick={() => {
          onSignOut();
          window.location.href = "/";
        }}
      >
        <FaSignOutAlt></FaSignOutAlt>
        Logout
      </div>
    );
  } else {
    login = (
      <div>
        <FaUserAlt></FaUserAlt>
        Entrar
      </div>
    );
  }

  return (
    <>
      <Container>
        <SubHeader>
          <div>
            <FaPhone />
            (81) 2103-7300
          </div>
          <div className="exit">{login}</div>
        </SubHeader>
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

          <InputSearch>
            <form action="" method="get">
              <input type="text" placeholder="Buscar por produto"></input>
              <span class="bg-hover">
                <button type="submit" className="button-input">
                  <FaSearch></FaSearch>
                </button>
              </span>
            </form>
          </InputSearch>

          <MenuDropDown>
            <Menu styles={styles} right>
              <h1>Categorias</h1>
              {categories.map((category, index) => {
                const subgrpQueryString = category.SUBGRUPO.map((subgrp) => {
                  return `${subgrp.SUB_GRP_DESCRICAO.replace(
                    /\s/g,
                    "_"
                  ).replace(/\//g, "-")}`;
                }).toString();
                return (
                  <Link to={`/products?category=${subgrpQueryString}`}>
                    {category.GRP_DESCRICAO}
                  </Link>
                );
              })}
            </Menu>
          </MenuDropDown>
        </Header>
      </Container>
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
