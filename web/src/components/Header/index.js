import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import { onSignOut, isSignedIn } from "../../services/auth";
import cn from "classnames";

import {
  FaSearch,
  FaPhone,
  FaSignOutAlt,
  FaUserAlt,
  FaBars,
  FaTimes,
  FaShoppingCart,
} from "react-icons/fa";

import CartContent from "../CartContent";

import {
  Container,
  Header,
  InputSearch,
  MenuDropDown,
  SubHeader,
  CartModal,
} from "./styles";

function Component() {
  const [categories, setCategories] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

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
          <Link to="/cart">
            <FaShoppingCart
              size={32}
              className="shopping-cart"
              onClick={() => setShowCart(!showCart)}
            />
          </Link>

          <FaBars
            size={32}
            className="open-menu"
            onClick={() => setShowMenu(!showMenu)}
          />

          <MenuDropDown className={cn({ active: showMenu })}>
            <nav>
              <div>
                <h1>Categorias</h1>
                {categories.map((category) => {
                  const subgrpQueryString = category.SUBGRUPO.map((subgrp) => {
                    return `${subgrp.SUB_GRP_DESCRICAO.replace(
                      /\s/g,
                      "_"
                    ).replace(/\//g, "-")}`;
                  }).toString();
                  return (
                    <div className="link-menu">
                      <Link to={`/products?category=${subgrpQueryString}`}>
                        {category.GRP_DESCRICAO}
                      </Link>
                    </div>
                  );
                })}{" "}
              </div>
            </nav>

            <div>
              <FaTimes
                className="close-button-menu"
                size={24}
                onClick={() => setShowMenu(false)}
              />
            </div>
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

/* { <Menu>
              <h1>Categorias</h1>
              {categories.map((category) => {
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
        <Menu />
              */
