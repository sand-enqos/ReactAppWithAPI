import React, { Component } from "react";
import UserTable from "../presentational/UserTable.jsx";
import Fab from "@material-ui/core/Fab";
import { DeleteOutline, AddCircleOutline } from "@material-ui/icons";


class APP extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  
  render() {
    return (
      <div >  
        <div style={{ display: "flex" , width: '45%' }}>
          <Fab style={{ marginLeft: "auto" }} color="primary" variant="extended"  aria-label="edit"  onClick={() => this.clickChild()}><AddCircleOutline />Add Person </Fab>
        </div>
      <UserTable handleAddButtonChange={click => this.clickChild = click} />
      </div>

      );
  }
}
export default APP;