import styled from "styled-components";

export const ContainerProduct = styled.div`
  width: 80%;
  margin: 20px auto;
  height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  background-color: white;
  border-radius: 8px;

  .img-container {
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    height: 600px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      overflow: hidden;
    }
    .image-gallery-thumbnail-image img {
      width: 100% !important;
    }
  }
`;

export const DetailsProducts = styled.div`
  box-sizing: border-box;
  background-color: #22314a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    color: white;
    text-align: center;
    font-size: 22px;
  }
  div {
    .disp {
      width: 100%;
      margin: 20px auto;
      padding: 10px;
      border-top: 0.4px solid white;
      border-bottom: 1px solid white;
      color: green;
      display: flex;
      font-weight: bold;
      justify-content: center;
      align-items: center;
      P {
        margin-top: 15px;
        margin-left: 4px;
      }
    }

    .price {
      color: green;
      p {
        color: #ff0050;
        font-size: 16px;
      }
    }
  }
`;

export const RelatedProducts = styled.div`
  h1 {
    color: white;
    text-align: center;
    margin-bottom: 20px;
  }
  div {
    width: 90%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 0 auto;
    div {
      width: 100%;
    }
  }
`;
