import React, {
  Component,
  Fragment,
  useEffect,
  useContext,
  useState,
  useRef
} from "react";
import "../index.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "./AppBar";
import BookingInterface from "./Booking/Booking";
import CreditCard from "./CreditCard/CreditCard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Confirmation from "./Confirmation/Confirmation";
import Booking from "./Booking/Booking";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "../theme";
import DisplayReservation from "./DisplayReservation";
import axios from "axios";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import Intro from "./Intro/Intro";
import LogContext from "./log-context";
import Summary from "./Summary/Summary";
import { config } from "./Constants";
import Looser from "./Raffle/Looser";
import Winner from "./Raffle/Winner";

// You can also use another index.js file, which is importing the relevant components and then import {Header, Footer} from './Components'

const API = "api/v1";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // Define a custom insertion for injecting the JSS styles in the DOM
  insertionPoint: document.getElementById("jss-insertion-point")
});

const Page = styled.body`
  max-width: 1000px;
  float: center;
  align: center;
  margin: auto;
`;

const App = props => {
  const mounted = useRef(); /**  Indicate whether the component has been loaded for 
   Indicate whether the component has been loaded for */
  const [logStatus, setLogStatus] = useState(true);

  // Fetching the reservation object from the backend
  const [reservationStr, setReservationStr] = useState("");
  const [reservation, setReservation] = useState("");
  // Holds check_in, check_out, early_constraint, late constraint, main_guest.name

  // Easing the passing of the strings
  const [strIn, setStrIn] = useState("");
  const [strOut, setStrOut] = useState("");

  // Managing local changes
  const [totalPrice, setTotalPrice] = useState(0);
  const [newCheckIn, setNewCheckIn] = useState("");
  const [newCheckOut, setNewCheckOut] = useState("");

  const login = async e => {
    setLogStatus(true);
  };
  const logout = () => {
    setLogStatus(false);
  };

  useEffect(
    _ => {
      if (reservationStr != "") {
        axios
          .get(
            "http://127.0.0.1:1337/" +
              API +
              "/reservations/" +
              reservationStr +
              "/get_availability"
          )
          .then(response => setReservation(response.data));
      }
    },
    [reservationStr]
  );

  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <LogContext.Provider
          value={{
            status: logStatus,
            login: login,
            logout: logout,
            reservation: reservation
          }}
        >
          <AppBar />
          <Switch>
            <Fragment>
              <Route
                exact
                path={"/booking" + "/:handle"}
                render={props => (
                  <Intro
                    {...props}
                    setReservation={setReservationStr}
                    setStrIn={setStrIn}
                    setStrOut={setStrOut}
                  />
                )}
              />{" "}
              {/* In this view we pass the handle up, retrieve the object, 
                  and then set the object as an state so it re-renders the view 
                  with the specific user data */}
              <Route
                path={"/extend"}
                render={props => (
                  <Booking
                    {...props}
                    setNewCheckIn={setNewCheckIn}
                    setNewCheckOut={setNewCheckOut}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                    strIn={strIn}
                    strOut={strOut}
                  />
                )}
              />
              {/* In this view we can modify the check in and check out times,
                 and it should return a price. It also receives the reservation 
                 data as it has to do some processing with it. */}
              <Route path="/credit" component={CreditCard} />
              <Route
                path={"/confirmation"}
                render={props => <Confirmation 
                  {...props} 
                  reservationStr={reservationStr}
                  reservation={reservation}
                  />}
              />
              {/* In this view we just need to accesss the context object */}
              <Route path={"/login"} component={Login} />
              {/* <Route
                      path="/reservation"
                      reservation={this.res}
                      component={DisplayReservation}
                    />
                    <Route
                      path="/reservation"
                      reservation={this.res}
                      component={DisplayReservation} */}
              {/* /> */}
              <Route path={"/register"} component={Registration} />
              <Route
                path={"/summary"}
                render={props => (
                  <Summary
                    {...props}
                    newCheckInTime={newCheckIn}
                    newCheckOutTime={newCheckOut}
                    totalPrice={totalPrice}
                  />
                )}
              />
              <Route exact
                path={"/booking/limehomepays"}
                render={props => (
                  <Winner
                    {...props}
                    setReservation={setReservation}
                    setStrIn={setStrIn}
                    setStrOut={setStrOut}
                  />
                )}       
                />
              <Route
                path={"/booking/keep_trying"}
                render={props => (
                  <Looser
                    {...props}
                    setReservation={setReservation}
                    setStrIn={setStrIn}
                    setStrOut={setStrOut}
                  />
                )}  
              />
            </Fragment>
            )}
          </Switch>
        </LogContext.Provider>
      </MuiThemeProvider>
    </JssProvider>
  );
};

export default App;
