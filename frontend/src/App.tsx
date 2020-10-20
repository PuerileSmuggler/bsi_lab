import { AppBar } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AppDiv, AppTitle } from "./App.styled";
import PrivateRoute from "./components/router/PrivateRoute";
import Logincontainer from "./containers/login/LoginContainer";
import Walletcontainer from "./containers/WalletContainer";

class App extends Component {
  render() {
    return (
      <AppDiv>
        <AppBar color="secondary" position="relative">
          <AppTitle variant="h4">Pamsword Wallet</AppTitle>
        </AppBar>
        <Switch>
          <Route exact path="/login">
            <Logincontainer />
          </Route>
          <Route exact path="/register">
            <Logincontainer register />
          </Route>
          <PrivateRoute exact path="/home" to="/login">
            <Walletcontainer />
          </PrivateRoute>
          <Route exact path="/*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </AppDiv>
    );
  }
}

export default App;
