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
import { makeStyles } from "@material-ui/core/styles";
import Jannik from "../Pictures/Jannik_round.png";

//Images
import FlexifyLogo from "./../Pictures/whiteFlexifyLogo.png";

const AccountButton = styled(IconButton)`
  color: white;
`;

const Img = styled.img`
  max-width: 37%;
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
    <div>
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
              {log.status ? (
                <Link style={{ textDecoration: "none" }} to="/login">
                  {/* <AccountButton edge="start" aria-label="Account">
                    <AccountCircle /> */}
                  {/* </AccountButton> */}
                  <img
                    src={Jannik}
                    alt="Jannik"
                    height="40px"
                    style={{ display: "block", margin: "auto" }}
                  />
                </Link>
              ) : (
                <Link style={{ textDecoration: "none" }} to="/login">
                  <Button color="secondary">Login</Button>
                </Link>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
