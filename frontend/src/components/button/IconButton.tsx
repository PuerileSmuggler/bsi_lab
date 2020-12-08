import { IconButton, IconButtonProps, Tooltip } from "@material-ui/core";
import React, { Fragment, ReactElement } from "react";

interface IProps {
  tooltip?: string;
  children: ReactElement;
  onClick?: () => void;
  iconButtonProps?: IconButtonProps;
  color?: "primary" | "secondary";
}

export const CustomIconButton = (props: IProps) => {
  const { tooltip, children, onClick, iconButtonProps, color } = props;
  return (
    <Fragment>
      {tooltip && (
        <Tooltip title={tooltip}>
          <IconButton onClick={onClick} {...iconButtonProps} color={color}>
            {children}
          </IconButton>
        </Tooltip>
      )}
      {!tooltip && (
        <IconButton onClick={onClick} {...iconButtonProps} color={color}>
          {children}
        </IconButton>
      )}
    </Fragment>
  );
};

export default IconButton;
