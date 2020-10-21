import styled from "styled-components";

export const Container = styled.div`
  margin: 20px auto;
  height: 100vh;
  width: 90%;
  border-radius: 8px;
  background-color: white;

  .title-results {
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title-results h1 {
    text-align: center;
    padding-top: 8px;
  }
  .title-results p {
    margin-top: 23px;
  }
`;

export const NoResult = styled.div`
  margin: 20px auto;
  height: 60vh;
  width: 90%;
  border-radius: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
