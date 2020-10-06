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
  width: 70%;
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
`;

export const ImageDiv = styled.div``;
