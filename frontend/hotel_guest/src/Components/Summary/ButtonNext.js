import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button, Grid} from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {BottomButton} from "../SharedComponents";

export default function ContainedButtons() {

  //Use the textDecoration "none" style to get rid of the underlined Link layout
  return (
      <Grid item xs={12}>
        <Link style={{ textDecoration: "none" }} to="/confirmation">
            <BottomButton
              variant="contained"
              color="primary"
              component="div"
              align="center"
            >
              Book now
            </BottomButton>
          </Link>
      </Grid>
  );
}
