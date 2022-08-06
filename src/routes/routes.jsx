import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import ROUTES from "./index";

const Routes = () => (
  <HashRouter>
    <Switch>
      {ROUTES.map(todo => (
        <Route {...todo} />
      ))}
      <Redirect from="*" to="/" />
    </Switch>
  </HashRouter>
);

export default Routes;
