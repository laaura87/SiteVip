import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function SearchResult() {
  const { name } = useParams();

  return (
    <>
      <Header />
      <Container></Container>
      <Footer />
    </>
  );
}

export default SearchResult;
