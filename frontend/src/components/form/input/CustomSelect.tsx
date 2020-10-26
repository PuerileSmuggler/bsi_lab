/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { FormControl, SelectProps, Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { FieldInputProps } from "react-final-form";
import { customInputStyles, SelectDiv, StyledSelect } from "./Input.styled";

interface IProps {
  label: string;
  error: string;
  touched?: boolean;
  inputProps: FieldInputProps<unknown, HTMLElement>;
  testId?: string;
  rows: Array<{ value: string; name: string }>;
  width?: string;
  selectProps?: SelectProps;
  onChange?: (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
}

export class CustomSelect extends Component<IProps> {
  render(): JSX.Element {
    const {
      error,
      touched,
      testId,
      inputProps,
      rows,
      width,
      onChange,
    } = this.props;

    const selectStyle = css`
      width: ${width ? width : "auto"};
      margin-top: 8px;
      margin-bottom: 4px;
      background-color: white;
    `;

    return (
      <div css={customInputStyles.root}>
        <SelectDiv>
          <Typography
            css={customInputStyles.label}
            variant="body2"
            color="textSecondary"
          >
            {this.props.label}
          </Typography>
          <FormControl margin="dense">
            <StyledSelect
              {...this.props.selectProps}
              css={[
                error && touched ? customInputStyles.outlineError : {},
                selectStyle,
              ]}
              variant="outlined"
              margin="dense"
              onChange={onChange}
              native={
                this.props.selectProps?.native
                  ? this.props.selectProps?.native
                  : true
              }
              inputProps={{
                ...inputProps,
                "data-testid": testId,
                placeholder: "choose...",
              }}
            >
              {rows.map((row, index) => {
                return (
                  <option value={row.value} key={index}>
                    {row.name}
                  </option>
                );
              })}
            </StyledSelect>
          </FormControl>
        </SelectDiv>

        {error && touched && (
          <span
            css={customInputStyles.textError}
            data-testid={`${testId}Error`}
          >
            {error}
          </span>
        )}
      </div>
    );
  }
}

export default CustomSelect;
