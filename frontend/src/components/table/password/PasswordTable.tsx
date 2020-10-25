import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Dispatch } from "@reduxjs/toolkit";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FloatingActionButton } from "../../../containers/Wallet/WalletContainer.styled";
import { AppDispatch, AppState } from "../../../store";
import {
  deletePassword,
  editPassword,
  getAllPasswords,
} from "../../../store/user/user.actions";
import {
  DeletePasswordDTO,
  PaginationDTO,
  PasswordDTO,
  PasswordsPaginatedDTO,
  UpdatePasswordDTO,
} from "../../../store/user/user.interface";
import { getPasswordsSelector } from "../../../store/user/user.selectors";
import PasswordRow from "./PasswordRow";

interface IDispatchProps {
  getAllPasswords: (payload: PaginationDTO) => AppDispatch;
  deletePassword: (payload: DeletePasswordDTO) => AppDispatch;
  updatePassword: (payloade: UpdatePasswordDTO) => AppDispatch;
}

interface IStateProps {
  passwords: PasswordsPaginatedDTO;
}

interface IState {
  page: number;
  rowsPerPage: number;
}

type PropType = IDispatchProps & IStateProps & RouteComponentProps;
class PasswordTable extends Component<PropType, IState> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() {
    const { page, rowsPerPage } = this.state;
    this.props.getAllPasswords({ page, count: rowsPerPage });
  }

  handleAddPasswordClick = () => {
    this.props.history.push("/addPassword");
  };

  handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    const { rowsPerPage } = this.state;
    this.setState({ page });
    this.props.getAllPasswords({ page, count: rowsPerPage });
  };

  handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  handleUpdatePassword = (payload: PasswordDTO) => () => {
    const { page, rowsPerPage } = this.state;
    this.props.updatePassword({ ...payload, page, rowsPerPage });
  };

  render() {
    const { passwords } = this.props;
    const { page, rowsPerPage } = this.state;
    return (
      <Fragment>
        <FloatingActionButton
          color="secondary"
          onClick={this.handleAddPasswordClick}
        >
          <AddIcon />
        </FloatingActionButton>
        <Table style={{ backgroundColor: "aliceblue" }}>
          <TableHead>
            <TableRow>
              <TablePagination
                component="td"
                count={passwords.count}
                onChangePage={this.handleChangePage}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            </TableRow>
            <TableRow>
              <TableCell>
                <TableSortLabel>Website</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Description</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Login</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Password</TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passwords.passwords.map((data, index) => (
              <PasswordRow
                data={data}
                key={index}
                deletePassword={this.handleDeleteRow}
                updatePassword={this.handleUpdatePassword}
              />
            ))}
            <TableRow>
              <TablePagination
                component="td"
                count={passwords.count}
                onChangePage={this.handleChangePage}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableBody>
        </Table>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getAllPasswords: (payload: PaginationDTO) =>
    dispatch(getAllPasswords(payload)),
  deletePassword: (payload: DeletePasswordDTO) =>
    dispatch(deletePassword(payload)),
  updatePassword: (payload: UpdatePasswordDTO) =>
    dispatch(editPassword(payload)),
});

const mapStateToProps = (state: AppState): IStateProps => ({
  passwords: getPasswordsSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PasswordTable));
