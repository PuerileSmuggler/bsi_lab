import AddIcon from "@material-ui/icons/Add";
import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import PasswordTable from "../../components/table/password/PasswordTable";
import { FloatingActionButton } from "./WalletContainer.styled";

class Walletcontainer extends Component<RouteComponentProps> {
  handleAddPasswordClick = () => {
    this.props.history.push("/addPassword");
  };

  render() {
    return (
      <div>
        <PasswordTable />
        <FloatingActionButton
          color="secondary"
          onClick={this.handleAddPasswordClick}
        >
          <AddIcon />
        </FloatingActionButton>
      </div>
    );
  }
}

export default withRouter(Walletcontainer);
