import { TableCell, TableRow, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import {
  CreatePasswordPayload,
  PasswordDTO,
} from "../../../store/user/user.interface";
import { decipherPassword } from "../../../utils/cipher";
import { CustomIconButton } from "../../button/IconButton";

interface IState {
  visible: boolean;
  edit: boolean;
  password: string;
  passwordDecoded: string;
}

interface IForm {}

interface IProps {
  data: PasswordDTO;
  deletePassword: (id: number) => () => void;
  updatePassword: (payload: PasswordDTO) => () => void;
}

type PropType = IProps;

class PasswordRow extends Component<PropType, IState> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      password: props.data.password,
      passwordDecoded: "",
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

  handleSubmit = (values: CreatePasswordPayload) => {
    this.setState({ edit: false });
    this.props.updatePassword({ ...values, id: this.props.data.id })();
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
      <Form
        onSubmit={this.handleSubmit}
        render={({ handleSubmit }) => (
          <TableRow>
            <TableCell>
              {edit ? (
                <Field
                  name="webAddress"
                  component="input"
                  initialValue={data.webAddress}
                />
              ) : (
                <Typography>{data.webAddress}</Typography>
              )}
            </TableCell>
            <TableCell>
              {edit ? (
                <Field
                  name="description"
                  component="input"
                  initialValue={data.description}
                />
              ) : (
                <Typography>{data.description}</Typography>
              )}
            </TableCell>
            <TableCell>
              {edit ? (
                <Field
                  name="login"
                  component="input"
                  initialValue={data.login}
                />
              ) : (
                <Typography>{data.login}</Typography>
              )}
            </TableCell>
            <TableCell>
              {edit ? (
                <Field
                  name="password"
                  component="input"
                  initialValue={decipherPassword(data.password)}
                />
              ) : (
                <Typography>
                  {visible ? decipherPassword(data.password) : data.password}
                </Typography>
              )}
            </TableCell>
            <TableCell>
              {!edit ? (
                <Fragment>
                  <CustomIconButton
                    iconButtonProps={{ size: "small" }}
                    tooltip={visible ? "Hide password" : "Show password"}
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
                  <CustomIconButton
                    iconButtonProps={{ size: "small" }}
                    tooltip="Delete"
                    onClick={this.props.deletePassword(data.id)}
                  >
                    <DeleteIcon />
                  </CustomIconButton>
                </Fragment>
              ) : (
                <Fragment>
                  <CustomIconButton
                    iconButtonProps={{ size: "small" }}
                    tooltip="Confirm"
                    onClick={handleSubmit}
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
        )}
      />
    );
  }
}

export default PasswordRow;
