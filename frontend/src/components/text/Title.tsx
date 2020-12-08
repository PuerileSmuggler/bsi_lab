import { Box } from "@material-ui/core";
import React, { PureComponent } from "react";
import { TitleContainer } from "./Title.styled";

interface IProps {
  fontSize?: string;
}

export class Title extends PureComponent<IProps> {
  render() {
    const { fontSize } = this.props;
    return (
      <TitleContainer>
        <Box fontSize={fontSize || "34px"}>{this.props.children}</Box>
      </TitleContainer>
    );
  }
}

export default Title;
