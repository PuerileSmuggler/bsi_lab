import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AppState } from "../../store";
import { getAuthSelector } from "../../store/user/user.selectors";

interface IStateProps {
  auth: boolean;
}

interface IProps {
  to: string;
}

type PropType = IProps & IStateProps & RouteProps;

class PrivateRoute extends Component<PropType> {
  render() {
    const { to, auth, ...routeProps } = this.props;
    return <>{auth ? <Route {...routeProps} /> : <Redirect to={to} />}</>;
  }
}

const mapStateToProps = (state: AppState): IStateProps => ({
  auth: getAuthSelector(state),
});

export default connect(mapStateToProps)(PrivateRoute);
