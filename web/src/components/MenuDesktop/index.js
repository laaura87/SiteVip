import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaLongArrowAltRight } from "react-icons/fa";
import { Container } from "./styles";
import { useAxios } from "../../hooks/useAxios";

function MenuDesktop() {
  const { data } = useAxios(
    `/categories?filial=${sessionStorage.getItem("filial")}`,
    {
      headers: { "x-access-token": sessionStorage.getItem("token") },
    }
  );

  return (
    <Container>
      <nav>
        <h1>Categorias</h1>
        {data?.map((category) => {
          const subgrpQueryString = category.SUBGRUPO.map((subgrp) => {
            return `${subgrp.SUB_GRP_DESCRICAO.replace(/\s/g, "_").replace(
              /\//g,
              "-"
            )}`;
          }).toString();
          return (
            <div className="link-menu">
              <span>
                <FaLongArrowAltRight />
              </span>
              <Link to={`/products?category=${subgrpQueryString}`}>
                {category.GRP_DESCRICAO}
              </Link>
            </div>
          );
        })}{" "}
      </nav>
    </Container>
  );
}

export default MenuDesktop;
