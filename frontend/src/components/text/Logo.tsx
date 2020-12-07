import React, { PureComponent } from "react";
import { LogoContainer } from "./Logo.styled";

export class Logo extends PureComponent {
  render() {
    return (
      <LogoContainer>
        <span>Password</span>
        <span>hub</span>
      </LogoContainer>
    );
  }
}

export default Logo;
