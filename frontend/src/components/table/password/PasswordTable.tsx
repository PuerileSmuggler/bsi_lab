import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React, { Component } from "react";
import PasswordRow from "./PasswordRow";

class PasswordTable extends Component {
  render() {
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
          <PasswordRow />
        </TableBody>
      </Table>
    );
  }
}

export default PasswordTable;
