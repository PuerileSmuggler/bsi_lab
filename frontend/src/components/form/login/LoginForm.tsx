import { Box, Button, Typography } from "@material-ui/core";
import { Dispatch } from "@reduxjs/toolkit";
import { createForm, FormApi } from "final-form";
import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { AppDispatch, AppState } from "../../../store";
import {
  clearLoginUserError,
  loginUser,
} from "../../../store/user/user.actions";
import { LoginUserPayload } from "../../../store/user/user.interface";
import { getLoginErrorSelector } from "../../../store/user/user.selectors";
import {
  composeValidators,
  email,
  length,
  required,
} from "../../../utils/validators";
import Title from "../../text/Title";
import CustomField from "../input/CustomField";
import { ButtonDiv } from "./LoginForm.styled";

interface IFormValues {
  login: string;
  password: string;
  encryption: string;
}

interface IStateProps {
  error?: string;
}

interface IDispatchProps {
  loginUser: (payload: IFormValues) => AppDispatch;
  clearLoginUserError: () => AppDispatch;
}

type PropType = IStateProps & RouteComponentProps & IDispatchProps;

class LoginForm extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.form = createForm({
      onSubmit: this.onSubmit,
    });
  }

  componentWillUnmount() {
    this.props.clearLoginUserError();
  }
  private onSubmit = (formValues: IFormValues) => {
    const { loginUser } = this.props;
    loginUser(formValues);
  };

  private form: FormApi<IFormValues>;

  render() {
    const { error } = this.props;
    return (
      <Fragment>
        <Form
          onSubmit={this.onSubmit}
          form={this.form}
          subscription={{ pristine: true, submitting: true, errors: true }}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <Title>Login</Title>
              {error && (
                <Box color="red" padding="12px 0">
                  {error}
                </Box>
              )}
              <Field
                name="login"
                validate={composeValidators([required, email])}
              >
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    meta={meta}
                    textFieldProps={{
                      placeholder: "Email",
                    }}
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
                      placeholder: "Password",
                    }}
                  />
                )}
              </Field>

              <ButtonDiv>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!form.getState().valid}
                  fullWidth
                >
                  <Box
                    fontWeight="fontWeightBold"
                    fontSize="22px"
                    color={this.form.getState().valid ? "#000" : "#ccc"}
                  >
                    Login
                  </Box>
                </Button>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", marginTop: "24px" }}
                >
                  <Typography color="primary">
                    Don't have an account? Sign up
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

const mapStateToProps = (state: AppState): IStateProps => ({
  error: getLoginErrorSelector(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch<AppDispatch>,
): IDispatchProps => ({
  loginUser: (payload: LoginUserPayload) => dispatch(loginUser(payload)),
  clearLoginUserError: () => dispatch(clearLoginUserError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LoginForm));
