import React, { Component } from "react";
import ChangePasswordForm from "../../components/form/changePassword/ChangePasswordForm";
import {
  LoginContainerDiv,
  LoginFormDiv
} from "../Login/LoginContainer.styled";

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
