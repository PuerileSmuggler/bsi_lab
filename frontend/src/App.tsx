import { AppBar, Link as MUILink, Typography } from "@material-ui/core";
import { Dispatch } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { AppDiv } from "./App.styled";
import PrivateRoute from "./components/router/PrivateRoute";
import PublicRoute from "./components/router/PublicRoute";
import Logo from "./components/text/Logo";
import AddPasswordContainer from "./containers/AddPassword/AddPasswordContainer";
import ChangePasswordContainer from "./containers/ChangePassword/ChangePasswordContainer";
import Logincontainer from "./containers/Login/LoginContainer";
import Walletcontainer from "./containers/Wallet/WalletContainer";
import { AppDispatch, AppState } from "./store";
import { logoutUser } from "./store/user/user.actions";
import { getAuthSelector } from "./store/user/user.selectors";

interface IDispatchProps {
  logout: () => AppDispatch;
}

interface IStateProps {
  auth: boolean;
}

class App extends Component<IStateProps & IDispatchProps> {
  render() {
    return (
      <AppDiv>
        <AppBar
          color="secondary"
          position="relative"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Logo />
          {this.props.auth && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Link
                to={"/changePassword"}
                style={{ color: "#5f9ea0", cursor: "pointer !important" }}
              >
                <Typography
                  color="primary"
                  style={{ cursor: "pointer !important" }}
                >
                  Change password
                </Typography>
              </Link>
              <MUILink
                style={{ color: "#5f9ea0" }}
                onClick={() => this.props.logout()}
              >
                <Typography color="primary">Logout</Typography>
              </MUILink>
            </div>
          )}
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
          <PrivateRoute exact path="/changePassword" to="/login">
            <ChangePasswordContainer />
          </PrivateRoute>
          <Route exact path="/*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </AppDiv>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<AppDispatch>
): IDispatchProps => ({
  logout: () => dispatch(logoutUser()),
});

const mapStateToProps = (state: AppState): IStateProps => ({
  auth: getAuthSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
