import React from "react";
import { Paper, Grid } from "@material-ui/core/";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const CheckOutPrice = styled.h2`
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
      <h3 align="center">Adjust your check-out time</h3>

      {props.sliderOut}
      <Grid container>
        <Grid item xs={5}>
          <CheckOutPrice>Price: {props.price}</CheckOutPrice>
        </Grid>
        <Grid item xs={7}>
          <CheckOutPrice>New Check-out: {props.updatedTime.getHours().toString()+":00"}</CheckOutPrice>
        </Grid>
      </Grid>
    </Paper>
  );
};
