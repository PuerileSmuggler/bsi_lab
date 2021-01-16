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
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppDispatch, AppState } from "../../../store";
import { getDataChanges } from "../../../store/data/data.actions";
import { getDataChangesSelector } from "../../../store/data/data.selectors";
import { DataChangeDTO } from "../../../store/user/user.interface";
import Title from "../../text/Title";
import {
  PasswordContainer,
  PasswordCustomTable,
  PasswordTableContainer,
} from "../password/Password.styled";
import ChangeLogRow from "./ChangeLogRow";

interface IDispatchProps {
  getDataChanges: () => AppDispatch;
}

interface IStateProps {
  dataChanges: Array<DataChangeDTO>;
}

type PropType = IDispatchProps & IStateProps & RouteComponentProps;
class ChangeLogTable extends Component<PropType> {
  componentDidMount() {
    const { getDataChanges } = this.props;
    getDataChanges();
  }

  render() {
    const { dataChanges } = this.props;
    return (
      <PasswordContainer>
        <PasswordTableContainer>
          <PasswordCustomTable>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <TableSortLabel>
                      <Title fontSize="14px">Type</Title>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>
                      <Title fontSize="14px">At</Title>
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataChanges.map((data, index) => (
                  <ChangeLogRow data={data} key={index} />
                ))}
              </TableBody>
            </Table>
          </PasswordCustomTable>
        </PasswordTableContainer>
      </PasswordContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getDataChanges: () => dispatch(getDataChanges()),
});

const mapStateToProps = (state: AppState): IStateProps => ({
  dataChanges: getDataChangesSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ChangeLogTable));
