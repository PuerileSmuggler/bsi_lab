import React, { Component } from "react";
import AddPasswordForm from "../../components/form/password/AddPasswordForm";
import {
  LoginContainerDiv,
  LoginFormDiv
} from "../Login/LoginContainer.styled";

interface IProps {
  register?: boolean;
}

export default class AddPasswordContainer extends Component<IProps> {
  render() {
    return (
      <LoginContainerDiv>
        <LoginFormDiv>
          <AddPasswordForm />
        </LoginFormDiv>
      </LoginContainerDiv>
    );
  }
}
