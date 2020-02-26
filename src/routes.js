import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Register from "./pages/register/register";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
