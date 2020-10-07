import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  border: 1px solid black;
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: 11px 10px 35px -26px rgba(0, 0, 0, 0.75);
  padding: 2px;
  width: 40%;

  img {
    margin-top: 5px;
    width: 200px;
    height: 200px;
    border: 0.2px solid grey;
  }

  h3 {
    margin-top: 12px;
    text-align: center;
    font-size: 18px;
  }

  p {
    font-weight: bold;
    text-align: center;
    font-size: 18px;
    color: green;
  }

  button {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    width: 100% !important;
    p {
      text-align: center;
      font-size: 14px;
      color: white;
    }
  }

  @media (max-width: 420px) {
    h3 {
      font-size: 14px;
    }
    p {
      font-size: 20px;
    }
    a {
      display: flex;
      justify-content: center;
    }
  }
`;

export const ImageDiv = styled.div`
  width: 90%;
  margin: 0 auto;

  @media (max-width: 420px) {
    a {
      display: flex;
      justify-content: center;
    }
  }
`;
