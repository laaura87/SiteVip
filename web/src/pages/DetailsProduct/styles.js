import styled from "styled-components";

export const ContainerProduct = styled.div`
  width: 80%;
  max-height: 800px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  .img-container {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const DetailsProducts = styled.div`
  background-color: #22314a;
  border-radius: 8px;
  height: 60%;
  margin-top: 80px;
  h1 {
    color: white;
    font-size: 22px;
    text-align: center;
    margin: 30px 0 10px 0;
  }

  .disp {
    width: 80%;
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
`;
