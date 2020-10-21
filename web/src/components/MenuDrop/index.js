import React from "react";
import { Link } from "react-router-dom";

import { Container } from "./styles";
import { FaBars, FaArrowRight } from "react-icons/fa";
import { useAxios } from "../../hooks/useAxios";
import { Dropdown } from "react-bootstrap";

function MenuDrop() {
  const { data } = useAxios(
    `/categories?filial=${sessionStorage.getItem("filial")}`,
    {
      headers: { "x-access-token": sessionStorage.getItem("token") },
    }
  );

  return (
    <Container>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          <FaBars size={20} />
          TODOS OS DEPARTAMENTOS
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {data?.map((category) => {
            const subgrpQueryString = category.SUBGRUPO.map((subgrp) => {
              return `${subgrp.SUB_GRP_DESCRICAO.replace(/\s/g, "_").replace(
                /\//g,
                "-"
              )}`;
            }).toString();
            return (
              <Dropdown.Item>
                <Link to={`/products?category=${subgrpQueryString}`}>
                  <span>
                    <FaArrowRight />
                  </span>
                  {category.GRP_DESCRICAO}
                </Link>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default MenuDrop;
