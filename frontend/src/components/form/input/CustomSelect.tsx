/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Select, SelectProps, Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { FieldInputProps } from "react-final-form";
import { customInputStyles, SelectDiv } from "./Input.styled";

interface IProps {
  label?: string;
  error: string;
  touched?: boolean;
  inputProps: FieldInputProps<unknown, HTMLElement>;
  testId?: string;
  rows: Array<{ value: string; name: string }>;
  selectProps?: SelectProps;
  onChange?: (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
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
      onChange,
      label,
    } = this.props;

    const selectStyle = css`
      margin-top: 8px;
      margin-bottom: 4px;
      background-color: #000;
    `;

    return (
      <div css={customInputStyles.root}>
        <SelectDiv>
          {label && (
            <Typography
              css={customInputStyles.label}
              variant="body2"
              color="textSecondary"
            >
              {label}
            </Typography>
          )}
          <Select
            {...this.props.selectProps}
            css={selectStyle}
            variant="outlined"
            onChange={onChange}
            fullWidth
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
          </Select>
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
