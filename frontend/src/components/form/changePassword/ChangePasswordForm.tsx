import { Box, Button } from "@material-ui/core";
import { Dispatch } from "@reduxjs/toolkit";
import { createForm, FormApi } from "final-form";
import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { editUser } from "../../../store/user/user.actions";
import { EditUserDTO } from "../../../store/user/user.interface";
import { keyStorageKey } from "../../../utils/cipher";
import { composeValidators, length, required } from "../../../utils/validators";
import Title from "../../text/Title";
import CustomField from "../input/CustomField";
import CustomSelect from "../input/CustomSelect";
import { ButtonDiv } from "../login/LoginForm.styled";

interface IFormValues {
  oldPassword: string;
  password: string;
  repeatPassword: string;
  encryption: string;
}

interface IDispatchProps {
  editUser: (payload: EditUserDTO) => AppDispatch;
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
    const { editUser } = this.props;
    editUser({
      oldPassword: formValues.oldPassword,
      password: formValues.password,
      key: localStorage.getItem(keyStorageKey) || "",
      encryption: formValues.encryption as "hmac" | "sha512",
    });
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
              <Title>Change password</Title>
              <Field
                name="oldPassword"
                validate={composeValidators([required, length(6)])}
              >
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    meta={meta}
                    textFieldProps={{
                      type: "password",
                      placeholder: "Old password (6+ characters)",
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
                      placeholder: "New password (6+ characters)",
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
                      placeholder: "Repeat new password (6+ characters)",
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
                    Change password
                  </Box>
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
  editUser: (payload: EditUserDTO) => dispatch(editUser(payload)),
});

export default connect(null, mapDispatchToProps)(withRouter(LoginForm));
