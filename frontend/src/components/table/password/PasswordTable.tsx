import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Dispatch } from "@reduxjs/toolkit";
import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  FloatingActionButton,
  FloatingActionButtonAbove,
} from "../../../containers/Wallet/WalletContainer.styled";
import { AppDispatch, AppState } from "../../../store";
import { getEditModeSelector } from "../../../store/config/user.selectors";
import {
  deletePassword,
  getAllPasswords,
  getAllSharedPasswords,
  getSharingPasswords,
  removeSharePassword,
  sharePassword,
} from "../../../store/user/user.actions";
import {
  DeletePasswordDTO,
  PaginationDTO,
  PasswordsPaginatedDTO,
  RemoveSharePasswordDTO,
  SharePasswordDTO,
} from "../../../store/user/user.interface";
import {
  getPasswordsSelector,
  getSharedPasswordsSelector,
  getSharingPasswordsSelector,
} from "../../../store/user/user.selectors";
import { keyStorageKey } from "../../../utils/cipher";
import Title from "../../text/Title";
import {
  PasswordContainer,
  PasswordCustomTable,
  PasswordTableContainer,
} from "./Password.styled";
import PasswordRow from "./PasswordRow";

interface IDispatchProps {
  getAllPasswords: (payload: PaginationDTO) => AppDispatch;
  getAllSharedPasswords: (payload: PaginationDTO) => AppDispatch;
  deletePassword: (payload: DeletePasswordDTO) => AppDispatch;
  sharePassword: (payload: SharePasswordDTO) => AppDispatch;
  getSharingPasswords: (payload: PaginationDTO) => AppDispatch;
  removeSharingPasswords: (payload: RemoveSharePasswordDTO) => AppDispatch;
}

interface IStateProps {
  passwords: PasswordsPaginatedDTO;
  sharedPasswords: PasswordsPaginatedDTO;
  sharingPasswords: PasswordsPaginatedDTO;
  editMode: boolean;
}

interface IState {
  page: number;
  rowsPerPage: number;
  value: number;
  dialogOpen: boolean;
  chosenPassword?: number;
  chosenUser: string;
}

type PropType = IDispatchProps & IStateProps & RouteComponentProps;
class PasswordTable extends Component<PropType, IState> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      value: 0,
      dialogOpen: false,
      chosenUser: "",
    };
  }

  componentDidMount() {
    const { page, rowsPerPage } = this.state;
    this.props.getAllPasswords({ page, count: rowsPerPage });
    this.props.getAllSharedPasswords({ page, count: rowsPerPage });
    this.props.getSharingPasswords({ page, count: rowsPerPage });
  }

  handleAddPasswordClick = () => {
    this.props.history.push("/addPassword");
  };

  handleChangleLogClick = () => {
    this.props.history.push("/changeLog");
  };

  handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number,
  ) => {
    const { rowsPerPage } = this.state;
    this.setState({ page });
    this.props.getAllPasswords({ page, count: rowsPerPage });
  };

  handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { page } = this.state;
    this.setState({ rowsPerPage: Number(event.target.value) });
    this.props.getAllPasswords({ page, count: Number(event.target.value) });
  };

  handleDeleteRow = (id: number) => () => {
    const { page, rowsPerPage } = this.state;
    this.props.deletePassword({ id });
    this.props.getAllPasswords({ page, count: rowsPerPage });
  };

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ value: newValue, page: 0 });
  };

  handleDialogOpen = (passwordId: number) => () => {
    this.setState({ dialogOpen: true, chosenPassword: passwordId });
  };

  handleRemoveSharing = (shareId: number | undefined, owner: boolean) => () => {
    if (shareId) {
      this.props.removeSharingPasswords({ owner, sharingId: shareId });
    }
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleEmailChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    this.setState({ chosenUser: event.target.value });
  };

  handleSharePassword = () => {
    const { chosenPassword, chosenUser } = this.state;
    const { sharePassword } = this.props;
    const key = localStorage.getItem(keyStorageKey);
    if (chosenPassword && chosenUser && key) {
      sharePassword({
        email: chosenUser,
        passwordId: chosenPassword,
        key,
      });
      this.setState({ dialogOpen: false });
    }
  };

  render() {
    const {
      passwords,
      sharedPasswords,
      sharingPasswords,
      editMode,
    } = this.props;
    const { page, rowsPerPage, value, dialogOpen, chosenUser } = this.state;
    return (
      <PasswordContainer>
        <Dialog
          open={dialogOpen}
          color="#1b1b1b"
          PaperProps={{ style: { backgroundColor: "#1b1b1b" } }}
        >
          <DialogTitle id="alert-dialog-title">Share password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Box
                bgcolor="#1b1b1b"
                color="white"
                flexDirection="column"
                display="flex"
              >
                <Box padding="12px">
                  Input an user email to share this password.
                </Box>
                <Box padding="12px">
                  Shared passwords can't be removed nor updated by chosen user.
                </Box>
                <TextField
                  variant="outlined"
                  size="small"
                  value={chosenUser}
                  onChange={this.handleEmailChange}
                />
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Box margin="12px">
              <Button color="primary" onClick={this.handleDialogClose}>
                Close
              </Button>
              <Button
                color="primary"
                autoFocus
                variant="contained"
                onClick={this.handleSharePassword}
              >
                Share
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
        <FloatingActionButtonAbove
          color="secondary"
          onClick={this.handleChangleLogClick}
        >
          <ListAltIcon />
        </FloatingActionButtonAbove>
        <FloatingActionButton
          color="secondary"
          onClick={this.handleAddPasswordClick}
        >
          <AddIcon />
        </FloatingActionButton>
        <PasswordTableContainer>
          <div>
            <Tabs
              variant="fullWidth"
              onChange={this.handleChange}
              value={value}
            >
              <Tab label="My Passwords" />
              <Tab label="Shared Passwords" />
              <Tab label="Passwords you're sharing" />
            </Tabs>
          </div>
          <div role="tabpanel" hidden={value !== 0}>
            {value === 0 && (
              <PasswordCustomTable>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>
                        <TableSortLabel>
                          <Title fontSize="14px">Website</Title>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel>
                          <Title fontSize="14px">Login</Title>
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {passwords.passwords.map((data, index) => (
                      <PasswordRow
                        data={data}
                        key={index}
                        deletePassword={this.handleDeleteRow}
                        handleDialogOpen={this.handleDialogOpen(data.id)}
                        editMode={editMode}
                      />
                    ))}
                  </TableBody>
                </Table>
              </PasswordCustomTable>
            )}
          </div>
          <div role="tabpanel" hidden={value !== 1}>
            {value === 1 && (
              <PasswordCustomTable>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>
                        <TableSortLabel>
                          <Title fontSize="14px">Website</Title>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel>
                          <Title fontSize="14px">Login</Title>
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sharedPasswords.passwords.map((data, index) => (
                      <PasswordRow
                        data={data}
                        key={index}
                        deletePassword={this.handleDeleteRow}
                        handleRemoveSharing={this.handleRemoveSharing(
                          data.shareId,
                          false,
                        )}
                        shared
                        editMode={editMode}
                      />
                    ))}
                  </TableBody>
                </Table>
              </PasswordCustomTable>
            )}
          </div>
          <div role="tabpanel" hidden={value !== 2}>
            {value === 2 && (
              <PasswordCustomTable>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>
                        <TableSortLabel>
                          <Title fontSize="14px">Website</Title>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel>
                          <Title fontSize="14px">User</Title>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel>
                          <Title fontSize="14px">Login</Title>
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sharingPasswords.passwords.map((data, index) => (
                      <PasswordRow
                        data={data}
                        key={index}
                        deletePassword={this.handleDeleteRow}
                        handleRemoveSharing={this.handleRemoveSharing(
                          data.shareId,
                          true,
                        )}
                        shared
                        editMode={editMode}
                      />
                    ))}
                  </TableBody>
                </Table>
              </PasswordCustomTable>
            )}
          </div>
          {value === 0 && (
            <TablePagination
              component="td"
              count={value === 0 ? passwords.count : sharedPasswords.count}
              onChangePage={this.handleChangePage}
              page={page}
              rowsPerPage={rowsPerPage}
              nextIconButtonProps={{ color: "primary" }}
              backIconButtonProps={{ color: "primary" }}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          )}
        </PasswordTableContainer>
      </PasswordContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getAllPasswords: (payload: PaginationDTO) =>
    dispatch(getAllPasswords(payload)),
  getAllSharedPasswords: (payload: PaginationDTO) =>
    dispatch(getAllSharedPasswords(payload)),
  getSharingPasswords: (payload: PaginationDTO) =>
    dispatch(getSharingPasswords(payload)),
  deletePassword: (payload: DeletePasswordDTO) =>
    dispatch(deletePassword(payload)),
  sharePassword: (payload: SharePasswordDTO) =>
    dispatch(sharePassword(payload)),
  removeSharingPasswords: (payload: RemoveSharePasswordDTO) =>
    dispatch(removeSharePassword(payload)),
});

const mapStateToProps = (state: AppState): IStateProps => ({
  passwords: getPasswordsSelector(state),
  sharedPasswords: getSharedPasswordsSelector(state),
  sharingPasswords: getSharingPasswordsSelector(state),
  editMode: getEditModeSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PasswordTable));
