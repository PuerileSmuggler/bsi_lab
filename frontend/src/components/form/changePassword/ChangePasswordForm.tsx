import { Button } from "@material-ui/core";
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
import CustomField from "../input/CustomField";
import CustomSelect from "../input/CustomSelect";
import { ButtonDiv, FormTitle } from "../login/LoginForm.styled";

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
          subscription={{ pristine: true, submitting: true }}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <FormTitle variant="h6" color="textSecondary">
                Change password
              </FormTitle>
              <Field name="oldPassword">
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    label="Old password"
                    meta={meta}
                    textFieldProps={{ type: "password" }}
                  />
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    label="New password"
                    meta={meta}
                    textFieldProps={{ type: "password" }}
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
                    label="Repeat new password"
                    meta={meta}
                    textFieldProps={{ type: "password" }}
                  />
                )}
              </Field>
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
              <ButtonDiv>
                <Button type="submit" variant="contained" color="primary">
                  Change password
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
  editUser: (payload: EditUserDTO) => dispatch(editUser(payload)),
});

export default connect(null, mapDispatchToProps)(withRouter(LoginForm));
