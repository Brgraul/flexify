import React, {useContext, Fragment, useState} from "react";
import styled from "styled-components";
import ButtonNext from "./ButtonNext";
import LogContext from "../log-context";
import {CircularProgress , Grid, Divider, Paper} from "@material-ui/core";
import Info from "./Info";
import Provider from "./Provider";
import AugImg from "../../Pictures/augsburg.jpg";
import {CroppingDiv} from "../SharedComponents";
import './Intro.css';
import { useEffect } from "react";


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
  props.setReservation(props.match.params.handle);
  const [hidden, setHidden] = useState(false);
  const value = useContext(LogContext);
  useEffect(() => {
    if(props.match.params.handle==="limehomepays"){
      setHidden(true);
    }
    if(props.match.params.handle==="keep_trying"){
      setHidden(true);
    }
  }, [])

  return(  
    value.reservation ? (
      <Fragment>
        { !hidden &&
        <Fragment>
          <Grid container xs={11} style={{margin:"auto", marginTop:"2.5%"}}>
            <Paper style={{ borderRadius:"15px", height:"fit-content"}}>
              <CroppingDiv>
                <HeaderImg src={AugImg} alt="" style={{ borderRadius:"15px 15px 0px 0px"}}/>
              </CroppingDiv>
              <Grid container item xs={11} style={{margin:"auto"}}>
                <Info setStrIn={props.setStrIn} setStrOut={props.setStrOut}/>
                <Divider style={{width:"100%"}}/>
                <Provider/>
              </Grid>
            </Paper>
          </Grid>
          <ButtonNext></ButtonNext>
        </Fragment>
        }
      </Fragment>
    ) : (    
      <LoadDiv>
        <CircularProgress/>
      </LoadDiv>
      )
  );
}
