import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/Main";
import Products from "./pages/Products";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/products" component={Products} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
