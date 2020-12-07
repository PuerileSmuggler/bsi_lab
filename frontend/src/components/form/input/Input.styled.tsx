import { css } from "@emotion/core";
import styled from "@emotion/styled";

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px auto;
  width: 100%;
`;

export const customInputStyles = {
  root: css`
    display: flex;
    flex-direction: column;
    margin: 4px auto;
    width: 100%;
  `,
  label: css`
    text-align: start;
    width: 100%;
  `,
  outlineError: css`
    &:hover {
      fieldset {
        border-color: red !important;
        border-width: 3px;
      }
    }

    fieldset {
      border-color: red !important;
      border-width: 2px;
    }
  `,
  textError: css`
    color: red;
    text-align: start;
    font-style: oblique;
    max-width: 400px;
  `,
  textErrorNoMargin: css`
    color: red;
    text-align: start;
    font-style: oblique;
    max-width: 400px;
  `,
  checkbox: css`
    display: flex;
  `,
};

export const SelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
