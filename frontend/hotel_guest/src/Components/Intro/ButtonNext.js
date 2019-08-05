import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button, Grid} from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BottomButton = styled(Button)`
    &&{
      min-width: 100%;
      margin: 0;
      border-radius: 0;
      position: fixed;
      bottom: 0;
      height: 7%;
    } 
`

export default function ContainedButtons() {

  //Use the textDecoration "none" style to get rid of the underlined Link layout
  return (
      <Grid item xs={12}>
        <Link style={{ textDecoration: "none" }} to="/extend">
            <BottomButton
              variant="contained"
              color="primary"
              component="div"
              align="center"
            >
              Adjust your booking times
            </BottomButton>
          </Link>
      </Grid>
  );
}
