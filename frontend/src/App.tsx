import {
  AppBar,
  Box,
  Link as MUILink,
  Switch as MUISwitch,
  Typography,
} from "@material-ui/core";
import { Dispatch } from "@reduxjs/toolkit";
import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { AppDiv } from "./App.styled";
import PrivateRoute from "./components/router/PrivateRoute";
import PublicRoute from "./components/router/PublicRoute";
import Logo from "./components/text/Logo";
import AddPasswordContainer from "./containers/AddPassword/AddPasswordContainer";
import ChangeLog from "./containers/ChangeLog/ChangeLog";
import ChangePasswordContainer from "./containers/ChangePassword/ChangePasswordContainer";
import Logincontainer from "./containers/Login/LoginContainer";
import Walletcontainer from "./containers/Wallet/WalletContainer";
import { AppDispatch, AppState } from "./store";
import { setEditMode } from "./store/config/config.actions";
import { getEditModeSelector } from "./store/config/user.selectors";
import { logoutUser, refreshToken } from "./store/user/user.actions";
import { getAuthSelector } from "./store/user/user.selectors";

interface IDispatchProps {
  logout: () => AppDispatch;
  refreshToken: () => AppDispatch;
  setEditMode: (payload: boolean) => AppDispatch;
}

interface IStateProps {
  auth: boolean;
  editMode: boolean;
}

class App extends Component<IStateProps & IDispatchProps> {
  componentDidMount() {
    this.props.refreshToken();
  }

  handleChangeEditMode = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    const { setEditMode } = this.props;
    setEditMode(checked);
  };

  render() {
    const { editMode } = this.props;
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
              <Box display="flex" alignItems="center">
                <Typography color="primary">Edit mode</Typography>
                <MUISwitch
                  color="primary"
                  onChange={this.handleChangeEditMode}
                  checked={editMode}
                />
              </Box>
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
          <PrivateRoute exact path="/addPassword/:id" to="/login">
            <AddPasswordContainer />
          </PrivateRoute>
          <PrivateRoute exact path="/changePassword" to="/login">
            <ChangePasswordContainer />
          </PrivateRoute>
          <PrivateRoute exact path="/changeLog" to="/login">
            <ChangeLog />
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
  dispatch: Dispatch<AppDispatch>,
): IDispatchProps => ({
  logout: () => dispatch(logoutUser()),
  refreshToken: () => dispatch(refreshToken()),
  setEditMode: (payload: boolean) => dispatch(setEditMode(payload)),
});

const mapStateToProps = (state: AppState): IStateProps => ({
  auth: getAuthSelector(state),
  editMode: getEditModeSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
