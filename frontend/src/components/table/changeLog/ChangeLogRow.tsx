import {
  Box,
  Button,
  Collapse,
  IconButton,
  TableRow,
  Typography,
} from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Dispatch } from "@reduxjs/toolkit";
import moment from "moment";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { revertDataChange } from "../../../store/data/data.actions";
import { DataChangeDTO } from "../../../store/user/user.interface";
import Subtitle from "../../text/Subtitle";
import Title from "../../text/Title";
import {
  PasswordCellNoDivider,
  PasswordCollapseCell,
} from "../password/Password.styled";

interface IDispatchProps {
  revertDataChange: (payload: DataChangeDTO) => AppDispatch;
}

interface IProps {
  data: DataChangeDTO;
}

interface IState {
  open: boolean;
}

type PropType = IProps & RouteComponentProps & IDispatchProps;

class ChangeLogRow extends Component<PropType, IState> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpenChange = () => {
    this.setState({ open: !this.state.open });
  };

  handleRevertDataChange = () => {
    const { revertDataChange, data } = this.props;
    revertDataChange(data);
  };

  render() {
    const { data } = this.props;
    const { open } = this.state;
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
            <Typography color="primary" component="div">
              <Box fontSize="18px">{`${data.actionType.charAt(
                0,
              )}${data.actionType.slice(1).toLowerCase()}`}</Box>
            </Typography>
          </PasswordCellNoDivider>
          <PasswordCellNoDivider>
            <Box display="flex" flexDirection="row" justifyContent="flex-start">
              <Typography>
                {moment(data.createdAt).format("YYYY-MM-DD HH:mm")}
              </Typography>
            </Box>
          </PasswordCellNoDivider>
        </TableRow>
        <TableRow>
          <PasswordCollapseCell colSpan={5}>
            <Collapse in={this.state.open}>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                margin="20px"
                width="100%"
              >
                {data.fields.map((field, index) => (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-around"
                    width="100%"
                  >
                    <Title fontSize="16px">{field}</Title>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      width="100%"
                      justifyContent="space-around"
                    >
                      {(data.previousValues[index] !==
                        data.currentValues[index] && (
                        <Fragment>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                          >
                            <Title fontSize="14px">Previous value</Title>
                            <Subtitle>
                              {data.previousValues[index] || "none"}
                            </Subtitle>
                          </Box>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                          >
                            <Title fontSize="14px">Current value</Title>
                            <Subtitle>{data.currentValues[index]}</Subtitle>
                          </Box>
                        </Fragment>
                      )) || (
                        <Box padding="12px">
                          <Subtitle>{data.currentValues[index]}</Subtitle>
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleRevertDataChange}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      fontWeight="fontWeightBold"
                      fontSize="12px"
                      color="#000"
                    >
                      Revert
                    </Box>
                    <Box color="#000" marginLeft="8px">
                      <HistoryIcon fontSize="small" />
                    </Box>
                  </Box>
                </Button>
              </Box>
            </Collapse>
          </PasswordCollapseCell>
        </TableRow>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<AppDispatch>,
): IDispatchProps => ({
  revertDataChange: (payload: DataChangeDTO) =>
    dispatch(revertDataChange(payload)),
});

export default connect(null, mapDispatchToProps)(withRouter(ChangeLogRow));
