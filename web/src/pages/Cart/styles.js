import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  width: 90%;
  min-height: 600px;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 14px 15px 20px -20px rgba(0, 0, 0, 0.75);
`;

export const ContainerProducts = styled.tr`
  width: 100%;
  height: 40px;
  td {
    text-align: center;
  }

  .product-container {
    display: flex;
    width: 100%;
    align-items: center;

    img {
      margin-right: 20px;
    }
  }

  svg {
    cursor: pointer;
  }

  .counter-product {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    border: 2px solid #e3e3e3;
    width: 150px !important;
    input {
      width: 80px !important;
      text-align: center;
      border: none;
    }
  }
`;

export const Grid = styled.table`
  border-spacing: 0;

  thead tr th {
    text-align: center;
  }

  th {
    text-transform: uppercase;
    color: #777777;
    font-size: 14px;
  }

  td,
  th {
    padding: 16px;
    border-bottom: 1px solid #d9d9d9;
  }
  .last-table {
    button {
      padding: 4px;
      background-color: #dc143c;
      text-transform: uppercase;
    }
  }

  .quantity-name {
    text-align: left;
  }
`;

export const ContainerSub = styled.div`
  margin-top: 15px;
  margin-right: 20px;
  background-color: #fcf8e3;
  padding: 2em;
  float: right;
  width: 20%;
  border: 1px solid #eceeef;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Finish = styled.button`
  margin-top: 20px;
  width: 30%;
  height: 50px;
  text-transform: uppercase;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  background-color: #009e2a;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
  p {
    margin-top: 12px;
    margin-left: 20px;
  }
  span {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: none;
    width: 20%;
    height: 100%;
    box-sizing: border-box;
    background-color: #008300;
    svg {
      margin-top: 12px;
    }
  }
`;
