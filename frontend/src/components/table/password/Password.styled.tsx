import styled from "@emotion/styled";
import { TableCell } from "@material-ui/core";

export const PasswordTableContainer = styled.div`
  max-width: 600px;
  width: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid #444;
  padding: 28px;
  margin-top: 68px;
`;

export const PasswordCustomTable = styled.div`
  height: 500px;
  overflow: auto;
`;

export const PasswordCollapseCell = styled(TableCell)`
  padding: 0px !important;
`;

export const PasswordCellNoDivider = styled(TableCell)`
  border-bottom: 1px solid #444 !important;
`;

export const PasswordRowCollapseContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > :first-of-type {
    display: flex;
    flex-direction: row;
    & > * {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
      padding: 12px;
    }
  }
  & > :last-of-type {
    display: flex;
    justify-content: space-evenly;
    margin: 18px;
  }
`;

export const PasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 70%;
  left: 0;
  right: 0;
`;
