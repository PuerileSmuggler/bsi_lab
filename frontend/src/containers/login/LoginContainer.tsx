import React, { Component } from "react";
import LoginForm from "../../components/form/login/LoginForm";
import { LoginContainerDiv, LoginFormDiv } from "./LoginContainer.styled";

interface IProps {
  register?: boolean;
}

export default class Logincontainer extends Component<IProps> {
  render() {
    const { register } = this.props;
    return (
      <LoginContainerDiv>
        <LoginFormDiv>
          <LoginForm register={register} />
        </LoginFormDiv>
      </LoginContainerDiv>
    );
  }
}
