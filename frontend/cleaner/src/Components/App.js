import React, { Component, Fragment, useState, useEffect } from "react";
import "../index.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "./AppBar";
import { styled } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogContext from "./log-context";
import RoomOverview from "./RoomOverview/RoomOverview";
import Login from "./Login/Login";
import { create } from "jss";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import RoomDeepDive from "./RoomDeepDive/RoomDeepDive";
import { createGenerateClassName, jssPreset } from "@material-ui/styles";
import JssProvider from "react-jss/lib/JssProvider";

const STATUS_LIST = ["Standard", "Frequent", "VIP"];
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

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // Define a custom insertion for injecting the JSS styles in the DOM
  insertionPoint: document.getElementById("jss-insertion-point")
});

function initRoomObj(guestNameVector, statusList) {
  let rooms = {};
  for (let i = 0; i < guestNameVector.length; i++) {
    rooms[`30${i}`] = {
      guest: guestNameVector[i],
      cleaned: false,
      status: statusList[Math.floor(Math.random() * 3)],
      modified: false
    };
  }
  return rooms;
}

function checkKeys(obj) {
  let count = 0;
  for (var k in obj) {
    if (obj[k]["cleaned"] === true) {
      count++;
    }
  }
  return count;
}

const App = props => {
  const [logStatus, setLogStatus] = useState(false);
  const [nNotifications, setNNotifications] = useState(0);
  const [roomObj, setRoomObj] = useState({});
  const [cleanedRooms, setCleanedRooms] = useState(0);

  const login = async e => {
    setLogStatus(true);
  };
  const logout = () => {
    setLogStatus(false);
  };

  useEffect(() => {
    setRoomObj(initRoomObj(NAME_VECTOR, STATUS_LIST));
  }, []);

  useEffect(() => {
    console.log("RE-render");
    setCleanedRooms(checkKeys(roomObj));
  });

  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <LogContext.Provider
            value={{
              status: logStatus,
              login: login,
              logout: logout,
              notifications: nNotifications
            }}
          >
            <AppBar />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route
                path="/deepdive/:handle"
                render={props => (
                  <RoomDeepDive
                    {...props}
                    roomObj={roomObj}
                    setRoomObj={setRoomObj}
                  />
                )}
              />
              <Route
                path={"/rooms"}
                render={props => (
                  <RoomOverview
                    {...props}
                    nNotifications={nNotifications}
                    setNNotifications={setNNotifications}
                    cleanedRooms={cleanedRooms}
                    setCleanedRooms={setCleanedRooms}
                    roomObj={roomObj}
                    setRoomObj={setRoomObj}
                  />
                )}
              />
            </Switch>
          </LogContext.Provider>
        </Router>
      </MuiThemeProvider>
    </JssProvider>
  );
};
export default App;
