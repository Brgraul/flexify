import React from "react";
import Dialog from "./Dialog";
import ButtonConfirm from "./ButtonConfirm";
import {Paper, Grid} from "@material-ui/core"
// import ReactCreditCards from "./Form";

export default props => (
  <div align="center" style={{marginTop:"3.5%"}}>
    <Grid xs={11}>
      <Paper style={{paddingTop: "2%", paddingBottom: "8%"}}>
        <h4 style={{marginBottom: "0%"}}>Please enter your credit Card information here:</h4>
        <Dialog />
      </Paper>
    </Grid>
    <ButtonConfirm/>
  </div>
);
