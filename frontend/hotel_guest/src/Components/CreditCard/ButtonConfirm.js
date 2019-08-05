import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import styled from 'styled-components';



const NextButton = styled(Button)`
    &&{
      min-width: 100%;
      margin: 0;
      border-radius: 0;
      position: fixed;
      bottom: 0;
      height: 7%;
    } 
`;


export default function ContainedButtons() {

  //Use the textDecoration "none" style to get rid of the underlined Link layout
  return (
    <Link style={{ textDecoration: "none", display: "flex"}} to="/summary">
      <NextButton
        variant="contained"
        color="primary"
        component="span"
        size="large"
      >
        Confirm Payment
      </NextButton>
    </Link>
  );
}
