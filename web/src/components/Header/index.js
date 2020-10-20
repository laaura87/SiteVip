import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";

import { onSignOut, isSignedIn } from "../../services/auth";
import MenuDrop from "../MenuDrop";
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

import InputSearch from "../InputSearch";
import { Container, Header, MenuDropDown, SubHeader } from "./styles";

function Component() {
  const [showMenu, setShowMenu] = useState(false);

  const { data } = useAxios(
    `/categories?filial=${sessionStorage.getItem("filial")}`,
    {
      headers: { "x-access-token": sessionStorage.getItem("token") },
    }
  );

  return (
    <>
      <Container>
        <SubHeader>
          <div>
            <FaPhone />
            (81) 2103-7300
          </div>
          <div className="exit">
            {isSignedIn() ? (
              <div
                onClick={() => {
                  onSignOut();
                  window.location.href = "/";
                }}
              >
                <FaSignOutAlt></FaSignOutAlt>
                Logout
              </div>
            ) : (
              <div>
                <FaUserAlt></FaUserAlt>
                Entrar
              </div>
            )}
          </div>
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

          <MenuDrop />

          <InputSearch />

          <Link to="/cart">
            <FaShoppingCart size={32} className="shopping-cart" />
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
                {data?.map((category) => {
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
