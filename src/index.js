import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import configureStore from "store";
import { Provider } from 'react-redux';

// core components
import Admin from "layouts/Admin.js";
import Login from "views/Login";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={configureStore()}>
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/" component={Login} />
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
