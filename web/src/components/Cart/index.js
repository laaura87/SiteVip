import React, { useState } from "react";
import "./style.css";
import ProductRow from "../ProductRow";
import DefaultButton from "../DefaultButton";

function Component({ disableCart }) {
  const [counter, setCounter] = useState(1);
  return (
    <>
      <div className="closeContainer">
        <div className="close" onClick={disableCart}>
          X
        </div>
      </div>
      <div className="cartBox">
        <ProductRow
          value={counter}
          plusAction={() => {
            let c = counter;
            setCounter(c++);
          }}
          minusAction={() => {
            let c = counter;
            setCounter(c--);
          }}
        />
        <div className="totalBox">
          <div className="content">
            <p>Subtotal</p>
            <p>
              <strong>R$20,00</strong>
            </p>
          </div>
        </div>
        <div className="buttonContainer">
          <DefaultButton
            text="Finaliza Compra"
            onClick={() => alert("aaaaaa")}
          />
        </div>
      </div>
    </>
  );
}

export default Component;
