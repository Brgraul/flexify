import React, { useContext, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import LogContext from "./log-context";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import LukasFace from "../Pictures/Lukas-Face.png";
//Images
import FlexifyLogo from "./../Pictures/whiteFlexifyLogo.png";

const AccountButton = styled(IconButton)`
  color: white;
`;

const Img = styled.img`
  max-width:37%;
  height: auto;
`;

const LogoDiv = styled(Grid)`  
  display: flex;
  align-items: center;
  margin-top: 3%;
  margin-left: 2%;
`;


export default props => {
  const log = useContext(LogContext);
  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Grid
            justify="space-between" // Add it here :)
            container
            alignItems="center"
          >
            <LogoDiv item>
              <Img src={FlexifyLogo} alt="FlexifyLogo" />
            </LogoDiv>

            <Grid item>
                <Link style={{ textDecoration: "none" }} to="/login">
                  <img
                    src={LukasFace}
                    alt="Lukas"
                    height="40px"
                    style={{ display: "block", margin: "auto" }}
                  />
                </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};
