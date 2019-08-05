import React, { Fragment, useState, useEffect, createRef } from "react";
import Paper from "@material-ui/core/Paper";
import { Button, Grid } from "@material-ui/core";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import Box from "@material-ui/core/Box";
// import ToDoItems from "./ToDoItems";
import styled from "styled-components";
import { RoomList } from "./RoomList";
import ProgressTab from "./ProgressTab";
import { OuterGrid } from "../SharedComponents";

const CLEANED = 1;
const INIT_TIME = new Date("July 20, 2019 11:00:00");
const STATUS_LIST = ["Standard", "Frequent", "VIP"];
const CLEANINGLENGTH = 30;
const NAME_VECTOR = [
  "Jannik Wiedenhaupt",
  "Lisa Wegsteiner",
  "Raffael Giverzew",
  "Clara Randen",
  "Michael Traurig",
  "Veronika Schreider",
  "Timon Frankel",
  "Sarah Summer",
  "Frederic Forest"
];
const ROOMS_ORDERED = [
  "307",
  "300",
  "308",
  "301",
  "302",
  "303",
  "304",
  "305",
  "306"
];
const N_ROOMS = NAME_VECTOR.length;

const Line = styled.div`
  height: 100%;
  border-left: 6px solid #ec5e2a;
  margin-left: 64%;
  margin-top: 48%;
`;

function initTimeArray(nRoom, initTime, cleaningLength) {
  let timeMarkers = [];
  let finalTime = new Date(initTime.getTime() + cleaningLength * 60000);
  for (let i = 0; i < nRoom; i++) {
    timeMarkers.push([
      initTime.getHours() + ":" + ("0" + initTime.getMinutes()).slice(-2),
      finalTime.getHours() + ":" + ("0" + finalTime.getMinutes()).slice(-2)
    ]);
    initTime = new Date(finalTime);
    finalTime = new Date(initTime.getTime() + cleaningLength * 60000);
  }
  return timeMarkers;
}

export default props => {
  const [timeArray, setTimeArray] = useState([]);
  const [refreshButton, setRefreshButton] = useState(0);

  useEffect(() => {
    setTimeArray(initTimeArray(N_ROOMS, INIT_TIME, CLEANINGLENGTH));
  }, []);
  // Constructor

  const childRef = createRef();
  console.log(props);
  return (
    <Fragment>
      <OuterGrid
        container
        xs={11}
        style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}
      >
        <Grid item xs={12} onClick={() => childRef.current.clickEffect()}>
          <ProgressTab
            totalRooms={N_ROOMS}
            cleanedRooms={props.cleanedRooms}
            refreshVar={refreshButton}
            refreshHandle={setRefreshButton}
          />
        </Grid>
        <Grid item xs={3}>
          <Line />
        </Grid>
        <Grid item container xs={9} align="right">
          <RoomList
            ref={childRef}
            nRooms={N_ROOMS}
            setRoomObj={props.setRoomObj}
            roomObj={props.roomObj}
            markers={timeArray}
            refresh={refreshButton}
            renderOrder={ROOMS_ORDERED}
            setChanges={props.setChanges}
            setNNotifications={props.setNNotifications}
          />
        </Grid>
      </OuterGrid>
    </Fragment>
  );
};
