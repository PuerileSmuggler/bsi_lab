import React, { PureComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { LogoContainer } from "./Logo.styled";

export class Logo extends PureComponent<RouteComponentProps> {
  render() {
    return (
      <LogoContainer
        onClick={() => {
          this.props.history.push("/home");
        }}
      >
        <span>Password</span>
        <span>hub</span>
      </LogoContainer>
    );
  }
}

export default withRouter(Logo);
