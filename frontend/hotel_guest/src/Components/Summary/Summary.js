import React, {useContext, Fragment} from "react";
import styled from "styled-components";
import ButtonNext from "./ButtonNext";
import LogContext from "../log-context";
import {CircularProgress , Grid, Divider, Paper} from "@material-ui/core";
import Info from "./Info";
import AugImg from "../../Pictures/augsburg.jpg";
import Address from "./Address";
import Pricing from "./Pricing";
import {CroppingDiv} from "../SharedComponents"

const LoadDiv = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    align-items: left;
    padding-top: 70%;
`;


const HeaderImg = styled.img`
  display: block;
  float: center;
  width: 100%;
  margin-bottom: auto;
`;

export default (props, {match}) => {
  const value = useContext(LogContext);
  return(  
    value.reservation ? (
      <Fragment>
        <Grid container xs={11} style={{margin:"auto", marginTop:"3.5%"}}>
          <Paper style={{ borderRadius:"15px 15px 15px 15px"}}>
            <CroppingDiv>
              <HeaderImg src={AugImg} alt="" style={{ borderRadius:"15px 15px 0px 0px"}}/>
            </CroppingDiv>
            <Grid container item xs={11} style={{margin:"auto", marginTop:"3%"}}>
              <Info newCheckIn={props.newCheckInTime} newCheckOut={props.newCheckOutTime}/>
              <Divider style={{width:"100%"}}/>
          {/*   <Address/> */}
              <Divider style={{width:"100%"}}/>
              <Pricing totalPrice={props.totalPrice}/>
            </Grid>
          </Paper>
        </Grid>
        <ButtonNext></ButtonNext>
      </Fragment>
    ) : (    
      <LoadDiv>
        <CircularProgress/>
      </LoadDiv>
      )
  );
}
