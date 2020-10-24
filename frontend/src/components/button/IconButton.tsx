import { IconButton, IconButtonProps, Tooltip } from "@material-ui/core";
import React, { Fragment, ReactElement } from "react";

interface IProps {
  tooltip?: string;
  children: ReactElement;
  onClick?: () => void;
  iconButtonProps?: IconButtonProps;
}

export const CustomIconButton = (props: IProps) => {
  const { tooltip, children, onClick, iconButtonProps } = props;
  return (
    <Fragment>
      {tooltip && (
        <Tooltip title={tooltip}>
          <IconButton onClick={onClick} {...iconButtonProps}>
            {children}
          </IconButton>
        </Tooltip>
      )}
      {!tooltip && (
        <IconButton onClick={onClick} {...iconButtonProps}>
          {children}
        </IconButton>
      )}
    </Fragment>
  );
};

export default IconButton;
