import React, { Component } from "react";
import AddPasswordForm from "../../components/form/password/AddPasswordForm";
import {
  LoginContainerDiv,
  LoginFormDiv,
} from "../login/LoginContainer.styled";

interface IProps {
  register?: boolean;
}

export default class AddPasswordContainer extends Component<IProps> {
  render() {
    const { register } = this.props;
    return (
      <LoginContainerDiv>
        <LoginFormDiv>
          <AddPasswordForm />
        </LoginFormDiv>
      </LoginContainerDiv>
    );
  }
}
