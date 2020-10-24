import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { Dispatch } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { AppDispatch, AppState } from "../../../store";
import { getAllPasswords } from "../../../store/user/user.actions";
import { CreatePasswordPayload } from "../../../store/user/user.interface";
import { getPasswordsSelector } from "../../../store/user/user.selectors";
import PasswordRow from "./PasswordRow";

interface IDispatchProps {
  getAllPasswords: () => AppDispatch;
}

interface IStateProps {
  passwords: Array<CreatePasswordPayload>;
}

type PropType = IDispatchProps & IStateProps;
class PasswordTable extends Component<PropType> {
  componentDidMount() {
    this.props.getAllPasswords();
  }
  render() {
    const { passwords } = this.props;
    return (
      <Table>
        <TableHead>
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
          {passwords.map((data, index) => (
            <PasswordRow data={data} key={index} />
          ))}
        </TableBody>
      </Table>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getAllPasswords: () => dispatch(getAllPasswords()),
});

const mapStateToProps = (state: AppState): IStateProps => ({
  passwords: getPasswordsSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordTable);
