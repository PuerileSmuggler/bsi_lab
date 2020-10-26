import React, { Component } from "react";
import ChangePasswordForm from "../../components/form/changePassword/ChangePasswordForm";
import {
  LoginContainerDiv,
  LoginFormDiv,
} from "../login/LoginContainer.styled";

export default class ChangePasswordContainer extends Component {
  render() {
    return (
      <LoginContainerDiv>
        <LoginFormDiv>
          <ChangePasswordForm />
        </LoginFormDiv>
      </LoginContainerDiv>
    );
  }
}
