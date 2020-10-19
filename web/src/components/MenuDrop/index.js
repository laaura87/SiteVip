import React from "react";

import { Container } from "./styles";
import { FaBars, FaArrowRight } from "react-icons/fa";
import { useAxios } from "../../hooks/useAxios";

function MenuDrop() {
  const { data } = useAxios(
    `/categories?filial=${sessionStorage.getItem("filial")}`,
    {
      headers: { "x-access-token": sessionStorage.getItem("token") },
    }
  );

  return (
    <Container>
      <div className="menu-drop">
        <FaBars size={32} />
        <p>TODOS OS DEPARTAMENTOS</p>
      </div>

      <div className="down">
        <ul>
          <li>
            {" "}
            <FaArrowRight />
            Seguranca
          </li>
          <li>
            <FaArrowRight /> Telefone
          </li>
          <li>
            <FaArrowRight />
            Acessorios
          </li>
          <li>
            <FaArrowRight />
            Software
          </li>
        </ul>
      </div>
    </Container>
  );
}

export default MenuDrop;
