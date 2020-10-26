import { Button, Typography } from "@material-ui/core";
import { Dispatch } from "@reduxjs/toolkit";
import { createForm, FormApi } from "final-form";
import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { loginUser, registerUser } from "../../../store/user/user.actions";
import { LoginUserPayload } from "../../../store/user/user.interface";
import CustomField from "../input/CustomField";
import CustomSelect from "../input/CustomSelect";
import { ButtonDiv, FormTitle } from "./LoginForm.styled";

interface IFormValues {
  login: string;
  password: string;
  encryption: string;
}

interface IDispatchProps {
  loginUser: (payload: IFormValues) => AppDispatch;
  registerUser: (payload: IFormValues) => AppDispatch;
}

interface IProps {
  register?: boolean;
}

type PropType = IProps & RouteComponentProps & IDispatchProps;

class LoginForm extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.form = createForm({
      onSubmit: this.onSubmit,
    });
  }
  private onSubmit = (formValues: IFormValues) => {
    const { register, loginUser, registerUser } = this.props;
    if (register) {
      registerUser(formValues);
    } else {
      loginUser(formValues);
    }
  };

  private form: FormApi<IFormValues>;

  render() {
    const { register } = this.props;
    return (
      <Fragment>
        <Form
          onSubmit={this.onSubmit}
          form={this.form}
          subscription={{ pristine: true, submitting: true }}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <FormTitle variant="h6" color="textSecondary">
                {register ? "Register" : "Login"}
              </FormTitle>
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
              {register && (
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
                      label="Repeat password"
                      meta={meta}
                      textFieldProps={{ type: "password" }}
                    />
                  )}
                </Field>
              )}
              {register && (
                <Field name="encryption" initialValue="hmac">
                  {({ input, meta }) => (
                    <CustomSelect
                      inputProps={input}
                      label="Encryption"
                      touched={meta.touched}
                      error={meta.error}
                      rows={[
                        { name: "HMAC", value: "hmac" },
                        { name: "SHA-512", value: "sha512" },
                      ]}
                    />
                  )}
                </Field>
              )}
              <Link
                to={register ? "/login" : "/register"}
                style={{ color: "#5f9ea0" }}
              >
                <Typography color="primary">
                  {register ? "Login" : "Don't have an account? Sign up"}
                </Typography>
              </Link>
              <ButtonDiv>
                <Button type="submit" variant="contained" color="primary">
                  {register ? "Register" : "Login"}
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
  dispatch: Dispatch<AppDispatch>
): IDispatchProps => ({
  loginUser: (payload: LoginUserPayload) => dispatch(loginUser(payload)),
  registerUser: (payload: LoginUserPayload) => dispatch(registerUser(payload)),
});

export default connect(null, mapDispatchToProps)(withRouter(LoginForm));
