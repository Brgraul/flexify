import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {BottomButton} from "../SharedComponents";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const CenteringLink = styled(Link)`
  display: flex;
  justify-content: center;
`;

export default function ContainedButtons(props) {
  const classes = useStyles();

  //Use the textDecoration "none" style to get rid of the underlined Link layout
  return (
    <div>
      <label htmlFor="contained-button-file">
        <CenteringLink style={{ textDecoration: "none" }}
         to={props.logged ? 
         "/booking/"+props.reservationStr : 
         "/register"
         }>
          {}
          <BottomButton
            color="primary"
            variant="contained"
            component="span"
            className={classes.button}
            align="center"
          >
            {props.logged ?
              "Modify reservation again" : 
              "Create limehome account"}
          </BottomButton>
        </CenteringLink>
      </label>
    </div>
  );
}
