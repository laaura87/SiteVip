import React, { useState } from "react";

import { Container } from "./styles";

function ModalProducts(props) {
  const { className, modalRef } = props;
  return (
    <>
      <Container ref={modalRef} className={`${className} modal`}></Container>
    </>
  );
}

export default ModalProducts;
