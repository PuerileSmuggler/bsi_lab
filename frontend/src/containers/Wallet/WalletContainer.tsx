import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import PasswordTable from "../../components/table/password/PasswordTable";

class Walletcontainer extends Component<RouteComponentProps> {
  render() {
    return (
      <div>
        <PasswordTable />
      </div>
    );
  }
}

export default withRouter(Walletcontainer);
