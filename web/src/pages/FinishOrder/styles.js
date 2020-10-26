import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  height: 100%;
  background-color: white;
  margin: 15px auto;
  box-shadow: 14px 15px 20px -20px rgba(0, 0, 0, 0.75);
  border-radius: 8px;

  .all-products {
    width: 80%;
    padding-top: 16px;
    margin: 0 auto;
    h3 {
      font-size: 24px;
    }
    div {
      display: flex;
      justify-content: space-between;
    }
    div p {
      font-size: 20px;
    }
  }

  .payment {
    width: 80%;
    margin: 14px auto;
    h3 {
      font-size: 24px;
    }
    padding-bottom: 14px;

    section {
      display: flex;
      justify-content: space-between;
    }
  }
`;
