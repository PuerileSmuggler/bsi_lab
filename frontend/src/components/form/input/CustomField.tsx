import {
  OutlinedTextFieldProps,
  TextField,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import React, { Component } from "react";
import { FieldInputProps } from "react-final-form";
import { InputDiv } from "./Input.styled";

interface IProps {
  label?: string;
  meta: {
    error?: string | boolean;
    touched?: boolean;
  };
  inputProps: FieldInputProps<unknown, HTMLElement>;
  disableAutocomplete?: boolean;
  testId?: string;
  textFieldProps?: Omit<OutlinedTextFieldProps, "variant">;
}

type PropType = IProps;

class CustomField extends Component<PropType> {
  render() {
    const { props } = this;
    const { meta, inputProps, testId, label } = props;
    const shouldDisplayError = (typeof meta.error === "boolean" ||
      (meta.error && meta.touched)) as boolean;

    return (
      <InputDiv>
        {label && (
          <Typography variant="body2" color="textSecondary">
            {label}
          </Typography>
        )}
        <TextField
          {...props.textFieldProps}
          error={shouldDisplayError}
          variant="outlined"
          inputProps={{ ...inputProps, "data-testid": testId }}
          InputProps={
            meta.touched && !meta.error
              ? { endAdornment: <CheckIcon color="primary" /> }
              : {}
          }
          autoComplete={
            props.disableAutocomplete
              ? "new-password"
              : props.textFieldProps?.type
          }
        />
        {shouldDisplayError && typeof meta.error !== "boolean" && (
          <Typography
            variant="caption"
            color="error"
            data-testid={`${testId}-error`}
          >
            {meta.error as string}
          </Typography>
        )}
      </InputDiv>
    );
  }
}

export default CustomField;
