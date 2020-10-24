import { TableCell, TableRow, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, { Component, Fragment } from "react";
import { CreatePasswordPayload } from "../../../store/user/user.interface";
import { CustomIconButton } from "../../button/IconButton";

interface IState {
  visible: boolean;
  edit: boolean;
}

interface IProps {
  data: CreatePasswordPayload;
}

type PropType = IProps;

class PasswordRow extends Component<PropType, IState> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      edit: false,
      visible: false,
    };
  }

  handleVisibilityChange = () => {
    const { visible } = this.state;
    if (visible) {
      this.encodePassword();
    } else {
      this.decodePassword();
    }
  };

  handleEditChange = () => {
    this.setState({ edit: !this.state.edit });
  };

  decodePassword() {
    this.setState({ visible: true });
  }

  encodePassword() {
    this.setState({ visible: false });
  }

  render() {
    const { data } = this.props;
    const { edit, visible } = this.state;
    return (
      <TableRow>
        <TableCell>
          <Typography>{data.webAddress}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{data.description}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{data.login}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{data.password}</Typography>
        </TableCell>
        <TableCell>
          {!edit ? (
            <Fragment>
              <CustomIconButton
                iconButtonProps={{ size: "small" }}
                tooltip="Show password"
                onClick={this.handleVisibilityChange}
              >
                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </CustomIconButton>
              <CustomIconButton
                iconButtonProps={{ size: "small" }}
                tooltip="Edit"
                onClick={this.handleEditChange}
              >
                <EditIcon />
              </CustomIconButton>
            </Fragment>
          ) : (
            <Fragment>
              <CustomIconButton
                iconButtonProps={{ size: "small" }}
                tooltip="Confirm"
                onClick={this.handleVisibilityChange}
              >
                <CheckIcon />
              </CustomIconButton>
              <CustomIconButton
                iconButtonProps={{ size: "small" }}
                tooltip="Cancel"
                onClick={this.handleEditChange}
              >
                <CloseIcon />
              </CustomIconButton>
            </Fragment>
          )}
        </TableCell>
      </TableRow>
    );
  }
}

export default PasswordRow;
