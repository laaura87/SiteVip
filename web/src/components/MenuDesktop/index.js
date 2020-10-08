import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaLongArrowAltRight } from "react-icons/fa";
import { Container } from "./styles";
import api from "../../services/api";

function MenuDesktop() {
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
    <Container>
      <nav>
        <h1>Categorias</h1>
        {categories.map((category) => {
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
