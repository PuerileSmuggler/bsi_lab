import { Button, Typography } from "@material-ui/core";
import { Dispatch } from "@reduxjs/toolkit";
import { createForm, FormApi } from "final-form";
import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { loginUser } from "../../../store/user/user.actions";
import { LoginUserPayload } from "../../../store/user/user.interface";
import CustomField from "../input/CustomField";
import { ButtonDiv, FormTitle } from "./LoginForm.styled";

interface IFormValues {
  login: string;
  password: string;
}

interface IDispatchProps {
  login: (payload: IFormValues) => AppDispatch;
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
    const { register, login } = this.props;
    if (!register) {
      login(formValues);
    }
    // request(`auth/${register ? "register" : "login"}`, formValues)
    //   .then(async (response) => {
    //     const body = await response.json();
    //     const token = body["access_token"];
    //     if (token) {
    //       localStorage.setItem(tokenStorageKey, body["access_token"]);
    //     }
    //     toast(
    //       register
    //         ? "Successfully created an account"
    //         : "Successfully logged in",
    //       { type: "success" }
    //     );
    //     this.form.reset();
    //     history.push("/login");
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
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
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormTitle variant="h6">
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
  login: (payload: LoginUserPayload) => dispatch(loginUser(payload)),
});

export default connect(null, mapDispatchToProps)(withRouter(LoginForm));
