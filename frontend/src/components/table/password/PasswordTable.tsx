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
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FloatingActionButton } from "../../../containers/Wallet/WalletContainer.styled";
import { AppDispatch, AppState } from "../../../store";
import {
  deletePassword,
  getAllPasswords,
} from "../../../store/user/user.actions";
import {
  DeletePasswordDTO,
  PaginationDTO,
  PasswordsPaginatedDTO,
} from "../../../store/user/user.interface";
import { getPasswordsSelector } from "../../../store/user/user.selectors";
import Title from "../../text/Title";
import {
  PasswordContainer,
  PasswordCustomTable,
  PasswordTableContainer,
} from "./Password.styled";
import PasswordRow from "./PasswordRow";

interface IDispatchProps {
  getAllPasswords: (payload: PaginationDTO) => AppDispatch;
  deletePassword: (payload: DeletePasswordDTO) => AppDispatch;
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

  render() {
    const { passwords } = this.props;
    const { page, rowsPerPage } = this.state;
    return (
      <PasswordContainer>
        <FloatingActionButton
          color="secondary"
          onClick={this.handleAddPasswordClick}
        >
          <AddIcon />
        </FloatingActionButton>
        <PasswordTableContainer>
          <Title>Saved passwords</Title>
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
                  />
                ))}
              </TableBody>
            </Table>
          </PasswordCustomTable>
          <TablePagination
            component="td"
            count={passwords.count}
            onChangePage={this.handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            nextIconButtonProps={{ color: "primary" }}
            backIconButtonProps={{ color: "primary" }}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </PasswordTableContainer>
      </PasswordContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getAllPasswords: (payload: PaginationDTO) =>
    dispatch(getAllPasswords(payload)),
  deletePassword: (payload: DeletePasswordDTO) =>
    dispatch(deletePassword(payload)),
});

const mapStateToProps = (state: AppState): IStateProps => ({
  passwords: getPasswordsSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PasswordTable));
