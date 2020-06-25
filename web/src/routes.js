import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/Main";
import Products from "./pages/Products";
import Detail from "./pages/Detail";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/products" component={Products} />
        <Route path="/products/:prodCodigo" component={Detail} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
