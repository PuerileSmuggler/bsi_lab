import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { browserHistory } from "../utils/browserHistory";

export default class Walletcontainer extends Component {
  render() {
    return (
      <div>
        Walletcontaier
        <Button
          onClick={() => {
            browserHistory.push("/login");
          }}
        ></Button>
      </div>
    );
  }
}
