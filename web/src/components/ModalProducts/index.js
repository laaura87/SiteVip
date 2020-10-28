import React, { useState } from "react";

import { Container } from "./styles";

function ModalProducts(props) {
  const { className, modalRef } = props;
  const [dropdown, setDropdown] = useState("");
  return (
    <>
      <Container ref={modalRef} className={`${className} modal`}>
        <p>Meu modal ❤️</p>
      </Container>
    </>
  );
}

export default ModalProducts;
