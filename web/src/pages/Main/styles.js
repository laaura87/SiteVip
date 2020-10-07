import styled from "styled-components";

export const Container = styled.div`
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
`;

export const GridContainerProducts = styled.div`
  width: 90%;
  margin: 0 auto;
  div {
    width: 100%;
  }
  @media (min-width: 768px) {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 480px) {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 320px) {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
  }
`;
