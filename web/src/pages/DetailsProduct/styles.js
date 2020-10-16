import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  margin: 20px auto;

  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 40px;
  @media (max-width: 1000px) {
    grid-template-columns: 3fr 7fr;
    gap: 10px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0px;
  }
`;

export const ContainerProduct = styled.div`
  box-sizing: border-box;
  width: 80%;
  margin: 0 auto;
  height: 450px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  background-color: white;
  border-radius: 8px;
  background-color: #22314a;
  overflow: none;
  box-sizing: border-box;

  .img-container {
    background-color: white;
    margin: auto auto;
    width: 350px;
    height: 350px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 1300px) {
    .img-container {
      width: 280px;
      height: 280px;
    }
  }

  @media (max-width: 1200px) {
    .img-container {
      width: 230px;
      height: 230px;
    }
  }

  @media (max-width: 1000px) {
    .img-containter {
      width: 200px !important;
      height: 200px !important;
    }
    grid-template-columns: 1fr;
    height: 800px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: 800px;
  }

  @media (max-width: 420px) {
    height: 620px;
    .img-container {
      margin: auto auto;
      width: 190px;
      height: 190px;
    }
    .buy-button button {
      width: 80% !important;
      p {
        font-size: 16px;
      }
    }
  }
`;

export const DetailsProducts = styled.div`
  box-sizing: border-box;
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
    .price {
      color: green;
      text-align: center;

      font-size: 24px;
      font-weight: bold;
      p {
        font-weight: normal;
        color: #ff0050;
        font-size: 16px;
      }
    }
  }

  @media (max-width: 1300px) {
    h1 {
      font-size: 18px;
    }
  }
`;

export const RelatedProducts = styled.div`
  width: 90%;
  margin: 0 auto;

  h1 {
    margin-top: 20px;
    color: white;
    text-align: center;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    margin-top: 10px;
  }

  .layout-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: 955px) {
    div {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    div {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 420px) {
    h1 {
      font-size: 16px;
    }
  }
`;

export const LeftSide = styled.div``;

export const RightSide = styled.div``;
