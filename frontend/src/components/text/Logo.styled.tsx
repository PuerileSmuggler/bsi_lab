import styled from "@emotion/styled";

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: sans-serif !important;
  font-weight: bold !important;
  font-size: 48px;
  padding: 28px;
  user-select: none;
  cursor: pointer;
  & :last-of-type {
    background: #ff9900;
    color: #000000;
    border-radius: 1vw;
    padding: 0 4px;
    display: inline-block;
  }
`;
