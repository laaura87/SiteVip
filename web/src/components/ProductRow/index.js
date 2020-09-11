import React from "react";
import "./style.css";
import ProductCounter from "../ProductCounter";
import { FaRegWindowClose } from "react-icons/fa";

function Component({
  quantity,
  plusAction,
  minusAction,
  productName,
  price,
  image,
  onRemove,
  plusButtonActive,
  minusButtonActive,
}) {
  return (
    <>
      <div className="productRow">
        {image ? (
          <img
            className="productImage"
            src={"http://187.84.80.162:8082/imagens/" + image}
            alt="produto"
          />
        ) : (
          <img
            className="productImage"
            src={process.env.PUBLIC_URL + "/images/no-image.png"}
            alt="produto"
          />
        )}

        <div className="name">{productName}</div>
        <div className="quantity">
          <ProductCounter
            value={quantity}
            addValue={plusAction}
            subValue={minusAction}
            plusButtonActive={plusButtonActive}
            minusButtonActive={minusButtonActive}
          />
        </div>
        <div className="price">
          {price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
        <div className="remove" onClick={onRemove}>
          <FaRegWindowClose size={20} color="red" />
        </div>
        <div className="loading-container-inactive">
          <div className="loading-screen"></div>
          <div className="loading-icon">
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_OdNgAj.json"
              background="transparent"
              speed="1"
              style={{ width: 200, height: 100 }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Component;
