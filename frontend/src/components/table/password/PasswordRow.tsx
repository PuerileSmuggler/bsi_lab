import {
  Box,
  Button,
  Collapse,
  IconButton,
  Link,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React, { Component, Fragment } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { PasswordDTO } from "../../../store/user/user.interface";
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
  password: string;
  passwordDecoded: string;
  open: boolean;
}

interface IProps {
  data: PasswordDTO;
  deletePassword: (id: number) => () => void;
  shared?: boolean;
  handleDialogOpen?: () => void;
  handleRemoveSharing?: () => void;
  editMode: boolean;
}

type PropType = IProps & RouteComponentProps;

class PasswordRow extends Component<PropType, IState> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      password: props.data.password,
      passwordDecoded: "",
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

  handleEditChange = () => {
    const {
      history: { push },
      data: { id },
    } = this.props;
    push(`/addPassword/${id}`);
  };

  decodePassword() {
    this.setState({ visible: true });
  }

  encodePassword() {
    this.setState({ visible: false });
  }

  render() {
    const {
      data,
      shared,
      handleDialogOpen,
      handleRemoveSharing,
      editMode,
    } = this.props;
    const { visible, open } = this.state;
    return (
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
            <Link href={data.webAddress} style={{ textDecoration: "none" }}>
              <Typography color="primary" component="div">
                <Box fontSize="18px">{data.webAddress}</Box>
              </Typography>
            </Link>
          </PasswordCellNoDivider>
          {data.user && (
            <PasswordCellNoDivider>
              <Typography component="div">
                <Box color="#fff">{data.user}</Box>
              </Typography>
            </PasswordCellNoDivider>
          )}
          <PasswordCellNoDivider>
            <Box display="flex" flexDirection="row" justifyContent="flex-start">
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
          </PasswordCellNoDivider>
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
                              decipherPassword(
                                data.password,
                                shared ? data.key : undefined,
                              ),
                            );
                          }}
                        >
                          <FileCopyIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Subtitle>
                      {visible
                        ? decipherPassword(
                            data.password,
                            shared ? data.key : undefined,
                          )
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
                        color="#000"
                      >
                        {visible ? "Hide password" : "Show password"}
                      </Box>
                      <Box color="#000" marginLeft="8px">
                        <VisibilityIcon fontSize="small" />
                      </Box>
                    </Box>
                  </Button>
                  {!shared && (
                    <Tooltip
                      title={
                        editMode
                          ? ""
                          : "You have to switch to the edit mode in order to edit passwords"
                      }
                    >
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleEditChange}
                          disabled={!editMode}
                        >
                          <Box display="flex" alignItems="center">
                            <Box
                              fontWeight="fontWeightBold"
                              fontSize="12px"
                              color="#000"
                            >
                              Edit
                            </Box>
                            <Box color="#000" marginLeft="8px">
                              <EditIcon fontSize="small" />
                            </Box>
                          </Box>
                        </Button>
                      </div>
                    </Tooltip>
                  )}
                  {!shared && handleDialogOpen && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDialogOpen}
                    >
                      <Box display="flex" alignItems="center">
                        <Box
                          fontWeight="fontWeightBold"
                          fontSize="12px"
                          color="#000"
                        >
                          Share
                        </Box>
                        <Box color="#000" marginLeft="8px">
                          <EditIcon fontSize="small" />
                        </Box>
                      </Box>
                    </Button>
                  )}
                  <Tooltip
                    title={
                      editMode
                        ? ""
                        : "You have to switch to the edit mode in order to delete passwords"
                    }
                  >
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={
                          handleRemoveSharing ||
                          this.props.deletePassword(data.id)
                        }
                        disabled={!editMode}
                      >
                        <Box display="flex" alignItems="center">
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize="12px"
                            color="#000"
                          >
                            Delete
                          </Box>
                          <Box color="#000" marginLeft="8px">
                            <DeleteIcon fontSize="small" />
                          </Box>
                        </Box>
                      </Button>
                    </div>
                  </Tooltip>
                </div>
              </PasswordRowCollapseContainer>
            </Collapse>
          </PasswordCollapseCell>
        </TableRow>
      </Fragment>
    );
  }
}

export default withRouter(PasswordRow);
