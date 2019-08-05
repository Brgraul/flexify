import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import LogContext from "./log-context";
import { Grid } from "@material-ui/core/";

//Images
import LimehomeLogo from "./../Pictures/whiteFlexifyLogo.png";

const LoginButton = styled(Button)`
  color: secondary;
  variant: text;
`;

const AccountButton = styled(IconButton)`
  color: white;
`;

const Img = styled.img`
  display: block;
  margin-left: 10 px;
  float: left;
  width: 100px;
  margin-top: auto;
  margin-bottom: auto;
`;

export default props => {
  const log = useContext(LogContext);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid
            justify="space-between" // Add it here :)
            container
            alignItems="center"
          >

            <Grid item>
              <Img src={LimehomeLogo} alt="LimehomeLogo" />
            </Grid>
            
            <Grid item>
              {log.notifications > 0 && 
                <h4>{log.notifications+" notifications"}</h4>
              }
            </Grid>

            <Grid item>
              {log.status ? (
                <Link style={{ textDecoration: "none" }} to="/login">
                  <AccountButton edge="start" aria-label="Account">
                    <AccountCircle />
                  </AccountButton>
                </Link>
              ) : (
                <Link style={{ textDecoration: "none" }} to="/login">
                  <LoginButton style={{ color: "white" }} color="inherit">
                    Logout
                  </LoginButton>
                </Link>
              )}
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
