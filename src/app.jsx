import React from 'react'
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Authentication from 'views/authentication'
import { createBrowserHistory } from "history";

import AdminLayout from "layouts/Admin/Admin.jsx";

const hist = createBrowserHistory();

class App extends React.Component {

  render() {
    return (
      <>
        <Router history={hist}>
          <Switch>
            <Route path="/authentication" component={Authentication} />
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Redirect from="/" to="/authentication" />
          </Switch>
        </Router>
      </>
    )
  }
}

export default App