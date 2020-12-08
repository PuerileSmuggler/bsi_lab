import { Box, Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Dispatch } from "@reduxjs/toolkit";
import { createForm, FormApi } from "final-form";
import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppDispatch, AppState } from "../../../store";
import {
  clearPassword,
  createPassword,
  editPassword,
  getPasswordById,
} from "../../../store/user/user.actions";
import {
  CreatePasswordPayload,
  PasswordDTO,
  PasswordResponseDTO,
} from "../../../store/user/user.interface";
import { getPasswordSelector } from "../../../store/user/user.selectors";
import { keyStorageKey } from "../../../utils/cipher";
import Title from "../../text/Title";
import CustomField from "../input/CustomField";
import { ButtonDiv } from "../login/LoginForm.styled";

interface IFormValues {
  webAddress: string;
  description: string;
  login: string;
  password: string;
}

interface IStateProps {
  password?: PasswordResponseDTO;
}
interface IDispatchProps {
  createPassword: (payload: CreatePasswordPayload) => AppDispatch;
  editPassword: (payload: PasswordDTO) => AppDispatch;
  getPasswordById: (payload: string) => AppDispatch;
  clearPassword: () => AppDispatch;
}

interface IProps {}

type PropType = IProps &
  RouteComponentProps<{ id: string }> &
  IDispatchProps &
  IStateProps;

class LoginForm extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.form = createForm({
      onSubmit: this.onSubmit,
    });
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      getPasswordById,
    } = this.props;
    if (id) {
      getPasswordById(id);
    }
  }

  componentWillUnmount() {
    this.props.clearPassword();
  }

  private onSubmit = (formValues: IFormValues) => {
    const {
      createPassword,
      match: {
        params: { id },
      },
      editPassword,
    } = this.props;
    const key = localStorage.getItem(keyStorageKey);
    if (id && key) {
      editPassword({ ...formValues, id: Number(id), key });
    } else {
      createPassword({
        ...formValues,
        key: localStorage.getItem(keyStorageKey) || "",
      });
    }
  };

  private handleBackButtonClick = () => {
    this.props.history.push("/home");
  };

  private form: FormApi<IFormValues>;

  render() {
    const {
      match: {
        params: { id },
      },
      password,
    } = this.props;
    return (
      <Fragment>
        <Form
          onSubmit={this.onSubmit}
          form={this.form}
          subscription={{ pristine: true, submitting: true, errors: true }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <IconButton
                size="small"
                color="primary"
                onClick={this.handleBackButtonClick}
              >
                <ArrowBackIcon />
              </IconButton>
              <Title>{id ? "Edit" : "Create"} password</Title>
              <Field name="webAddress" initialValue={password?.webAddress}>
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    textFieldProps={{ placeholder: "Website" }}
                    meta={meta}
                  />
                )}
              </Field>
              <Field name="description" initialValue={password?.description}>
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    meta={meta}
                    textFieldProps={{
                      rows: 4,
                      multiline: true,
                      placeholder: "Description",
                    }}
                  />
                )}
              </Field>
              <Field name="login" initialValue={password?.login}>
                {({ input, meta }) => (
                  <CustomField
                    inputProps={input}
                    textFieldProps={{ placeholder: "Login" }}
                    meta={meta}
                  />
                )}
              </Field>
              <Field name="password">
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
                  disabled={!this.form.getState().valid}
                >
                  <Box
                    fontWeight="fontWeightBold"
                    fontSize="22px"
                    color={this.form.getState().valid ? "#000" : "#ccc"}
                    padding="6px"
                  >
                    {id ? "Edit" : "Create"}
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

const mapStateToProps = (state: AppState): IStateProps => ({
  password: getPasswordSelector(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch<AppDispatch>,
): IDispatchProps => ({
  createPassword: (payload: CreatePasswordPayload) =>
    dispatch(createPassword(payload)),
  getPasswordById: (payload: string) => dispatch(getPasswordById(payload)),
  editPassword: (payload: PasswordDTO) => dispatch(editPassword(payload)),
  clearPassword: () => dispatch(clearPassword()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LoginForm));
