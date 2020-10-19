import React from "react";

import { Container } from "./styles";
import { FaBars } from "react-icons/fa";

function MenuDrop() {
  return (
    <Container>
      <div className="menu-drop">
        <FaBars size={32} />
        <p>TODOS OS DEPARTAMENTOS</p>
      </div>

      <div className="down"></div>
    </Container>
  );
}

export default MenuDrop;
