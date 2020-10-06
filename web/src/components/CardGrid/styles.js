import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  border: 1px solid black;
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: 11px 10px 35px -26px rgba(0, 0, 0, 0.75);
  padding: 8px;
  img {
    margin-top: 5px;
    width: 300px;
    height: 300px;
    border: 0.2px solid grey;
  }

  h3 {
    margin-top: 5px;
    text-align: center;
    font-size: 28px;
  }

  p {
    font-size: 34px;
    color: green;
  }

  button {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    p {
      font-size: 16px;
      color: white;
    }
  }
`;

export const ImageDiv = styled.div``;
