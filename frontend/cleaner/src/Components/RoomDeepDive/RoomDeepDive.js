import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";
import Checklist from "./CheckList";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Close from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

const PaperToDo = styled(Paper)`
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5% 5%;
  min-height: 100px;
`;

export default props => {
  const [marked, setMarked] = useState([false, false, false]);
  const [cleaned, setCleaned] = useState(false);
  const room = props.match.params.handle;

  return (
    <Grid container xs={11} style={{ margin: "auto" }}>
      <Grid item xs={12}>
        <Link to="/rooms">
          <Close
            style={{ marginLeft: "auto", display: "block", marginTop: "5%" }}
          />
        </Link>
      </Grid>
      <Grid item container xs={12}>
        <h3 style={{ marginTop: "0px" }}>To-Dos</h3>
        <PaperToDo>
          <Checklist marked={marked} setMarked={setMarked} setCleaned={setCleaned} room={room} roomObj={props.roomObj} setRoomObj={props.setRoomObj}/>
        </PaperToDo>
      </Grid>
      <Grid item xs={12}>
        <h3>Guest Comments</h3>
        <PaperToDo>
          <body>Do not want to be disturbed! Slighlty overworked!</body>
        </PaperToDo>
      </Grid>
      <Grid item xs={12}>
        <h3>Reports</h3>
        <PaperToDo>
          <Grid container spacing={3}>
            <Grid item xs>
              <body>Did you find any personal belongings?</body>
            </Grid>
            <Grid item xs>
              <Button variant="contained" component="span">
                Report
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <body>Is there any maintenance required?</body>
            </Grid>
            <Grid item xs>
              <Button variant="contained" component="span">
                Report
              </Button>
            </Grid>
          </Grid>
        </PaperToDo>
      </Grid>
    </Grid>
  );
};
