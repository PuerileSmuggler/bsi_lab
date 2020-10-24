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

class PublicRoute extends Component<PropType> {
  render() {
    const { to, auth, ...routeProps } = this.props;
    return <>{auth ? <Redirect to={to} /> : <Route {...routeProps} />}</>;
  }
}

const mapStateToProps = (state: AppState): IStateProps => ({
  auth: getAuthSelector(state),
});

export default connect(mapStateToProps)(PublicRoute);
