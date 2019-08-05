import React, {
  Fragment,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import Room from "./Room";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const NEW_ORDER = [
  "307",
  "303",
  "308",
  "301",
  "302",
  "304",
  "300",
  "305",
  "306"
];

const LoadDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  align-items: left;
  padding-top: 70%;
`;

function createDomList(
  roomObj,
  arrayDom,
  markerArray,
  stateHandle,
  nRooms,
  modifiedArray
) {
  let roomList = [];
  for (let i = 0; i < nRooms; i++) {
    roomList.push(
      <Room
        roomNumber={arrayDom[i]}
        setRoomObj={stateHandle}
        roomObj={roomObj}
        markers={markerArray[i]}
        modified={modifiedArray[i]}
      />
    );
  }
  return roomList;
}

function mutateArray(
  oldOrderArray,
  newOrderArray,
  modifiedArray,
  handleOrderArray,
  handleModified,
  handleNModifications
) {
  // Two tasks to accomplish:
  // Set the roomsDom vector to the new one
  // Create a proper modified array with the difference between the arrays
  let indexesModified = [];
  let newModifiedArray = [...modifiedArray];

  for (let i = 0; i < oldOrderArray.length; i++) {
    if (oldOrderArray[i] !== newOrderArray[i]) {
      indexesModified.push(i);
    }
  }

  handleNModifications(indexesModified.length);

  for (let i = 0; i < indexesModified.length; i++) {
    newModifiedArray[indexesModified[i]] = true;
  }
  handleOrderArray(newOrderArray);
  handleModified(newModifiedArray);
}

export const RoomList = forwardRef((props, ref) => {
  // Do something that you only want to do once...
  const [roomsDom, setRoomsDom] = useState([]);
  const [modified, setModified] = useState([]);

  useEffect(() => {
    let vect = [];
    for (let i = 0; i < props.nRooms; i++) {
      vect.push(false);
    }
    setModified(vect);
    setRoomsDom(props.renderOrder);
  }, []);

  useImperativeHandle(ref, () => ({
    clickEffect() {
      mutateArray(
        roomsDom,
        NEW_ORDER,
        modified,
        setRoomsDom,
        setModified,
        props.setNNotifications
      );
    }
  }));

  let roomArray = createDomList(
    props.roomObj,
    roomsDom,
    props.markers,
    props.setRoomObj,
    props.nRooms,
    modified
  );
  // Constructor
  return <Fragment>{roomArray}</Fragment>;
});
