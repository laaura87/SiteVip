import styled from "styled-components";

export const Container = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const GridContainerProducts = styled.div`
  width: 90%;
  margin: 10px auto;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  div {
    width: 100%;
  }

  @media (max-width: 1370px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 512px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

export const EffectText = styled.div`
  h1 {
    color: white;
    text-align: center;
    margin-top: 10px;
  }
`;

export const ContainerBody = styled.div`
  width: 90%;
  margin: 20px auto;

  display: grid;
  grid-template-columns: 25% 75%;
  gap: 40px;
  @media (max-width: 1000px) {
    grid-template-columns: 30% 70%;
    gap: 10px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0px;
  }
`;
export const LeftSection = styled.div``;
export const RightSection = styled.div``;
