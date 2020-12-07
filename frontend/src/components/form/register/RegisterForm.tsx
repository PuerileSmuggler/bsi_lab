import { Box, Button, Typography } from "@material-ui/core";
import { Dispatch } from "@reduxjs/toolkit";
import { createForm, FormApi } from "final-form";
import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { registerUser } from "../../../store/user/user.actions";
import { LoginUserPayload } from "../../../store/user/user.interface";
import {
  composeValidators,
  email,
  length,
  required,
} from "../../../utils/validators";
import Subtitle from "../../text/Subtitle";
import Title from "../../text/Title";
import CustomField from "../input/CustomField";
import CustomSelect from "../input/CustomSelect";
import { ButtonDiv } from "./RegisterForm.styled";

interface IFormValues {
  login: string;
  password: string;
  encryption: string;
}

interface IDispatchProps {
  registerUser: (payload: IFormValues) => AppDispatch;
}

type PropType = RouteComponentProps & IDispatchProps;

class RegisterForm extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.form = createForm({
      onSubmit: this.onSubmit,
    });
  }
  private onSubmit = (formValues: IFormValues) => {
    const { registerUser } = this.props;
    registerUser(formValues);
  };

  private form: FormApi<IFormValues>;

  render() {
    return (
      <Fragment>
        <Form
          onSubmit={this.onSubmit}
          form={this.form}
          subscription={{ pristine: true, submitting: true, errors: true }}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <Title>Sign up for free</Title>
              <Subtitle>and enhance your experience</Subtitle>
              <Field
                name="login"
                validate={composeValidators([required, email])}
              >
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    meta={meta}
                    textFieldProps={{ placeholder: "Email" }}
                  />
                )}
              </Field>
              <Field
                name="password"
                validate={composeValidators([required, length(6)])}
              >
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    meta={meta}
                    textFieldProps={{
                      type: "password",
                      placeholder: "Password (6+ characters)",
                    }}
                  />
                )}
              </Field>
              <Field
                name="repeatPassword"
                validate={(value) =>
                  value === form.getState().values.password
                    ? null
                    : "Passwords must match"
                }
              >
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    meta={meta}
                    textFieldProps={{
                      type: "password",
                      placeholder: "Repeat password",
                    }}
                  />
                )}
              </Field>
              <Field name="encryption" initialValue="hmac">
                {({ input, meta }) => (
                  <CustomSelect
                    inputProps={input}
                    touched={meta.touched}
                    error={meta.error}
                    rows={[
                      { name: "HMAC", value: "hmac" },
                      { name: "SHA-512", value: "sha512" },
                    ]}
                  />
                )}
              </Field>

              <ButtonDiv>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!this.form.getState().valid}
                >
                  <Box
                    fontWeight="fontWeightBold"
                    fontSize="22px"
                    color={this.form.getState().valid ? "#000" : "#ccc"}
                    padding="6px"
                  >
                    Sign Up!
                  </Box>
                </Button>
                <Typography component="div">
                  <Box color="white" fontSize="18px">
                    Or
                  </Box>
                </Typography>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography color="primary" component="div">
                    <Box fontSize="18px" fontWeight="fontWeightBold">
                      Log in
                    </Box>
                  </Typography>
                </Link>
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
  registerUser: (payload: LoginUserPayload) => dispatch(registerUser(payload)),
});

export default connect(null, mapDispatchToProps)(withRouter(RegisterForm));
