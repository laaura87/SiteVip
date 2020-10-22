import React, { useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardGrid from "../../components/CardGrid";

import useSWR from "swr";
import { fetcher } from "../../services/api";
import { useAxios } from "../../hooks/useAxios";

function Products({ history, location }) {
  const query = new URLSearchParams(location.search);
  const description = query.get("description") || null;
  const categories = query.get("category") || "";
  const [page, setPage] = useState(1);

  const { data } = useAxios(
    `/products/category?filial=${sessionStorage.getItem(
      "filial"
    )}&category=${categories}`
  );

  console.log(data);

  return (
    <>
      <Header />

      <Footer />
    </>
  );
}

export default Products;
