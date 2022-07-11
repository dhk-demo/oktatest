import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Staff from "./components/pages/Staff";
import Login from "./components/auth/Login";

import "./App.css";

function onAuthRequired({ history }) {
  history.push("/login");
}

var baseName = "oktatest";

class App extends Component {
  render() {
    return (
      <Router basename={"/"+baseName}>
        <Security
          issuer="https://dhk-demo.oktapreview.com/oauth2/default"
          client_id="0oa3zlgcnphlEg5V21d7"
          redirect_uri={window.location.origin + "/" + baseName + "/implicit/callback"}
          onAuthRequired={onAuthRequired}
        >
          <div className="App">
            <Navbar />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              <SecureRoute path="/staff" exact={true} component={Staff} />
              <Route
                path="/login"
                render={() => <Login baseUrl="https://dhk-demo.oktapreview.com" />}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;
