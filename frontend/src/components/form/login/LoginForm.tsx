import { Button, Typography } from "@material-ui/core";
import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
import CustomField from "../input/CustomField";
import { ButtonDiv } from "./LoginForm.styled";

interface IFormValues {
  login: string;
  password: string;
}

interface IProps {
  register?: boolean;
}

export default class LoginForm extends Component<IProps> {
  private onSubmit = (formValues: IFormValues) => {
    fetch("http:\\\\localhost:4000/auth/register", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.json());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    const { register } = this.props;
    return (
      <Fragment>
        <Form
          onSubmit={this.onSubmit}
          subscription={{ pristine: true, submitting: true }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
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
