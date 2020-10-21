import styled from "styled-components";

export const Container = styled.div`
  button {
    margin: 0 auto;
    padding: 0;
    background-color: #00a200;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    justify-content: space-between;

    p {
      margin-top: 10px;
      margin-left: 16px;
      text-align: center;
      line-height: 18px;
    }
    span {
      background-color: #008300;
      height: 100%;
      width: 20%;
      margin: 0;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      svg {
        margin-top: 12px;
      }
    }
  }
`;
