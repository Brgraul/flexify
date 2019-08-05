import React from "react";
import { Paper, Grid } from "@material-ui/core/";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const CheckInPrice = styled.h2`
  fontweight: "bold";
  textalign: "center";
  margin-top: 5px;
  font-size: 15px;
`;

const useStyles = makeStyles({
  root: {
    borderRadius: 15,
    padding: "1% 10%"
  }
});

export default props => {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.root }}>
      <h3 align="center">Adjust your check-in time</h3>

      {props.sliderIn}
      <Grid container>
        <Grid item xs={5}>
          <CheckInPrice>Price: {props.price}</CheckInPrice>
        </Grid>
        <Grid item xs={7}>
          <CheckInPrice>New Check-in: {props.updatedTime.getHours().toString()+":00"}</CheckInPrice>
        </Grid>
      </Grid>
    </Paper>
  );
};
