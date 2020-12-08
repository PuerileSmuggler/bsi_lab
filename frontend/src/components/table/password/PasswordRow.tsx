import {
  Box,
  Button,
  Collapse,
  IconButton,
  Link,
  TableRow,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React, { Component, Fragment } from "react";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";
import {
  CreatePasswordPayload,
  PasswordDTO,
} from "../../../store/user/user.interface";
import { decipherPassword } from "../../../utils/cipher";
import Subtitle from "../../text/Subtitle";
import Title from "../../text/Title";
import {
  PasswordCellNoDivider,
  PasswordCollapseCell,
  PasswordRowCollapseContainer,
} from "./Password.styled";

interface IState {
  visible: boolean;
  edit: boolean;
  password: string;
  passwordDecoded: string;
  open: boolean;
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
      open: false,
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

  handleOpenChange = () => {
    this.setState({ open: !this.state.open });
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
    const { edit, visible, open } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        render={({ handleSubmit }) => (
          <Fragment>
            <TableRow onClick={this.handleOpenChange}>
              <PasswordCellNoDivider>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={this.handleOpenChange}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </PasswordCellNoDivider>
              <PasswordCellNoDivider>
                {edit ? (
                  <Field
                    name="webAddress"
                    component="input"
                    initialValue={data.webAddress}
                  />
                ) : (
                  <Link
                    href={data.webAddress}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography color="primary" component="div">
                      <Box fontSize="18px">{data.webAddress}</Box>
                    </Typography>
                  </Link>
                )}
              </PasswordCellNoDivider>
              {/* <PasswordCellNoDivider>
                {edit ? (
                  <Field
                    name="description"
                    component="input"
                    initialValue={data.description}
                  />
                ) : (
                  <Typography>{data.description}</Typography>
                )}
              </PasswordCellNoDivider> */}
              <PasswordCellNoDivider>
                {edit ? (
                  <Field
                    name="login"
                    component="input"
                    initialValue={data.login}
                  />
                ) : (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                  >
                    <Typography>{data.login}</Typography>
                    <Box color="#fff" marginLeft="8px">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(event) => {
                          event.stopPropagation();
                          toast("Login copied to clipboard", {
                            hideProgressBar: true,
                            type: "info",
                          });

                          navigator.clipboard.writeText(data.login);
                        }}
                      >
                        <FileCopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </PasswordCellNoDivider>
              {/* <PasswordCellNoDivider>
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
              </PasswordCellNoDivider> */}
            </TableRow>
            <TableRow>
              <PasswordCollapseCell colSpan={5}>
                <Collapse in={this.state.open}>
                  <PasswordRowCollapseContainer>
                    <div>
                      <div>
                        <Title fontSize="14px">Description</Title>
                        <Subtitle>{data.description}</Subtitle>
                      </div>
                      <div>
                        <Box
                          display="flex"
                          flexDirection="row"
                          justifyContent="center"
                        >
                          <Title fontSize="14px">Password</Title>
                          <Box color="#fff" marginLeft="8px">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                toast("Password copied to clipboard", {
                                  hideProgressBar: true,
                                  type: "info",
                                });

                                navigator.clipboard.writeText(
                                  decipherPassword(data.password),
                                );
                              }}
                            >
                              <FileCopyIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        <Subtitle>
                          {visible
                            ? decipherPassword(data.password)
                            : data.password}
                        </Subtitle>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        onClick={this.handleVisibilityChange}
                        color="primary"
                      >
                        <Box display="flex" alignItems="center">
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize="12px"
                            color="#fff"
                          >
                            {visible ? "Hide password" : "Show password"}
                          </Box>
                          <Box color="#fff" marginLeft="8px">
                            <VisibilityIcon fontSize="small" />
                          </Box>
                        </Box>
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleEditChange}
                      >
                        <Box display="flex" alignItems="center">
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize="12px"
                            color="#fff"
                          >
                            Edit
                          </Box>
                          <Box color="#fff" marginLeft="8px">
                            <EditIcon fontSize="small" />
                          </Box>
                        </Box>
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.props.deletePassword(data.id)}
                      >
                        <Box display="flex" alignItems="center">
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize="12px"
                            color="#fff"
                          >
                            Delete
                          </Box>
                          <Box color="#fff" marginLeft="8px">
                            <DeleteIcon fontSize="small" />
                          </Box>
                        </Box>
                      </Button>
                    </div>
                  </PasswordRowCollapseContainer>
                </Collapse>
              </PasswordCollapseCell>
            </TableRow>
          </Fragment>
        )}
      />
    );
  }
}

export default PasswordRow;
