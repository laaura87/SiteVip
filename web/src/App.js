import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import Routes from "./routes";
import { SWRConfig } from "swr";
import { fetcher } from "./services/api";

function App() {
  return (
    <SWRConfig fetcher={fetcher}>
      <Routes />
    </SWRConfig>
  );
}

export default App;
