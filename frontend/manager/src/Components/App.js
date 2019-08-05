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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styled from "styled-components";

import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "../theme";
import LogContext from "./log-context";

import Home from "./Home/index";
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

  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <LogContext.Provider>
            <Switch>
              < Fragment>
                <Route
                  exact
                  path={"/"}
                  render={props => (
                    <Home
                      {...props}
                    />
                  )}
                /> {/* In this view we pass the handle up, retrieve the object, 
                  and then set the object as an state so it re-renders the view 
                  with the specific user data */}
              </Fragment>
              )}
            </Switch>
          </LogContext.Provider>
      </MuiThemeProvider>
    </JssProvider>
  );
};

export default App;
