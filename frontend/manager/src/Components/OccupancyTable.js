import React, { Fragment, useState } from "react";
import { Paper, Grid, CircularProgress } from "@material-ui/core";
import Occupation1 from "../../Pictures/Table_1.svg";
import Occupation2 from "../../Pictures/Table_2.svg";
import styled from "styled-components";

const StaticOccupation = styled.img`
  max-width: 94%;
  margin-top: 1.6%;
  margin-bottom: 1.8%;
`;
const LoadDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
`;

const NotificationText = styled.h1`
  color: green;
`

export default props => {
  const [loaded, setLoaded] = useState(false);
  const [component, setComponent] = useState(
    <StaticOccupation src={Occupation1} alt="" />
  );
  const [notification, setNotification] = useState(false);

  function delayUpdate() {
    setTimeout(() => {
      setComponent(<StaticOccupation src={Occupation2} alt="" />);
    }, 2000);
  }

  function notificationTrigger(){
    setTimeout(() => {
      setNotification(true);
    }, 2000).then(
      setTimeout(() => {
        setNotification(false);
      },3000)
    )
  }

  function notificationTrigger(){
    return new Promise(function(resolve, reject) {
      setTimeout((function() {
        setNotification(true);
        resolve("Stuff worked!");
     }), 2000);
    });
  }

  function notificationDisable(){
    setTimeout(() => {
      setNotification(false);
    },3000)
  }

 

  return (
    <Grid container xs={11} style={{ margin: "auto" }}>
      <Paper
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
        onClick={() => {
          setComponent(
            <LoadDiv>
              <CircularProgress />
              <h1>Please wait, reallocating the cleaning appointments...</h1>
            </LoadDiv>
          );
          delayUpdate();
          notificationTrigger().then(notificationDisable);
        }}
      >
        {component}
      </Paper>
      {notification && <NotificationText>
      Cleaning appointments rescheduled, all cleaners have been notified!
      </NotificationText>}
    </Grid>
  );
};
