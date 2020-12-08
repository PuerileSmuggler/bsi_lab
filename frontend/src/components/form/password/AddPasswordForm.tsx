import { Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Dispatch } from "@reduxjs/toolkit";
import { createForm, FormApi } from "final-form";
import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { createPassword } from "../../../store/user/user.actions";
import { CreatePasswordPayload } from "../../../store/user/user.interface";
import { keyStorageKey } from "../../../utils/cipher";
import CustomField from "../input/CustomField";
import { ButtonDiv, FormTitle } from "../login/LoginForm.styled";

interface IFormValues {
  webAddress: string;
  description: string;
  login: string;
  password: string;
}

interface IDispatchProps {
  createPassword: (payload: CreatePasswordPayload) => AppDispatch;
}

interface IProps {}

type PropType = IProps & RouteComponentProps & IDispatchProps;

class LoginForm extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.form = createForm({
      onSubmit: this.onSubmit,
    });
  }
  private onSubmit = (formValues: IFormValues) => {
    const { createPassword } = this.props;
    createPassword({
      ...formValues,
      key: localStorage.getItem(keyStorageKey) || "",
    });
  };

  private handleBackButtonClick = () => {
    this.props.history.goBack();
  };

  private form: FormApi<IFormValues>;

  render() {
    return (
      <Fragment>
        <Form
          onSubmit={this.onSubmit}
          form={this.form}
          subscription={{ pristine: true, submitting: true }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <IconButton
                size="small"
                color="primary"
                onClick={this.handleBackButtonClick}
              >
                <ArrowBackIcon />
              </IconButton>
              <FormTitle variant="h6" color="textSecondary">
                Add new password
              </FormTitle>
              <Field name="webAddress">
                {({ input, meta }) => (
                  <CustomField inputProps={input} label="Website" meta={meta} />
                )}
              </Field>
              <Field name="description">
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    label="Description"
                    meta={meta}
                    textFieldProps={{ rows: 4, multiline: true }}
                  />
                )}
              </Field>
              <Field name="login">
                {({ input, meta }) => (
                  <CustomField inputProps={input} label="Login" meta={meta} />
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    label="Password"
                    meta={meta}
                    textFieldProps={{ type: "password" }}
                  />
                )}
              </Field>
              <ButtonDiv>
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </ButtonDiv>
            </form>
          )}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<AppDispatch>,
): IDispatchProps => ({
  createPassword: (payload: CreatePasswordPayload) =>
    dispatch(createPassword(payload)),
});

export default connect(null, mapDispatchToProps)(withRouter(LoginForm));
