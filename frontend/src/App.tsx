import { AppBar } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AppDiv, AppTitle } from "./App.styled";
import PrivateRoute from "./components/router/PrivateRoute";
import PublicRoute from "./components/router/PublicRoute";
import AddPasswordContainer from "./containers/AddPassword/AddPasswordContainer";
import Logincontainer from "./containers/login/LoginContainer";
import Walletcontainer from "./containers/Wallet/WalletContainer";

class App extends Component {
  render() {
    return (
      <AppDiv>
        <AppBar color="secondary" position="relative">
          <AppTitle variant="h4">Pamsword Wallet</AppTitle>
        </AppBar>
        <Switch>
          <PublicRoute exact path="/login" to="/home">
            <Logincontainer />
          </PublicRoute>
          <PublicRoute exact path="/register" to="/home">
            <Logincontainer register />
          </PublicRoute>
          <PrivateRoute exact path="/home" to="/login">
            <Walletcontainer />
          </PrivateRoute>
          <PrivateRoute exact path="/addPassword" to="/login">
            <AddPasswordContainer />
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
