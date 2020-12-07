import styled from "@emotion/styled";
import { Typography } from "@material-ui/core";

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 28px;
  align-items: center;
  & > :first-of-type {
    margin-right: 18px;
  }
`;

export const FormTitle = styled(Typography)`
  text-align: center;
`;
