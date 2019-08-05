import React from "react";
import styled from "styled-components";
import { Paper, Grid} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const Content = styled.div`
  align: center;
  margin-top: 5px;
`;

const CellRight = styled.td`
  text-align: right;
`;

const useStyles = makeStyles({
  root: {
    borderRadius: 15,
    padding: "1% 10%"
  }
});

const CheckTitle = styled.h3`
    margin: 0;
`;
const CheckSubTitle = styled.h4`
    margin : 0;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 0.8rem;
`;

export default props => {
  const classes = useStyles();
  return (
    <Content>
      <Paper classes={{ root: classes.root }}>
        <p>
          Hello{" "}
          <strong>
            {props.firstName} {props.lastName},
          </strong>{" "}
          <br /> Here you can change the booking times of your prospective stay!
        </p>
        <Grid container style={{marginBottom:"4%"}}>
          <Grid item xs={6}>
                  <CheckTitle>Check-in</CheckTitle>
                  <CheckSubTitle>{props.checkInTime.getHours() +':'+ props.checkInTime.getMinutes()+'0'}</CheckSubTitle>
                  <CheckSubTitle>{props.strIn}</CheckSubTitle>
              </Grid>
          <Grid item xs={6} align="right"> 
              <CheckTitle>Check-out</CheckTitle>
              <CheckSubTitle>{props.checkOutTime.getHours() +':'+ props.checkOutTime.getMinutes()+'0'}</CheckSubTitle>
              <CheckSubTitle>{props.strOut}</CheckSubTitle>
          </Grid>
        </Grid>
      </Paper>
    </Content>
  );
};
