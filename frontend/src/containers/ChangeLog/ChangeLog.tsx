import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ChangeLogTable from "../../components/table/changeLog/ChangeLogTable";

class ChangeLog extends Component<RouteComponentProps> {
  render() {
    return <ChangeLogTable />;
  }
}

export default withRouter(ChangeLog);
