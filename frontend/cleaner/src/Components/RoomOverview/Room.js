import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Switch} from "@material-ui/core";
import { Link } from "react-router-dom";
import {CheckTitle} from "../SharedComponents";
import Notifications from "@material-ui/icons/Notifications";
import {makeStyles} from "@material-ui/styles";

const PaperRoom = styled(Paper)`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 1% 5%;
  display:flex;
  width:100%;
  align-items: center;
`;

const Dot = styled.div`
  height: 20px;
  width: 20px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left:-41.1px;
`

const Time = styled.div`
  position:absolute;
  left: -96px;
`

const LinkNoStyle = styled(Link)`
  &&{
    text-decoration: none;
    color: inherit;
    text-align: left;
  }
`

const StatusTag = styled.div`
    padding: 2%;
    display: inline-block;
    border-radius:10px;
    padding-right: 7%;
    padding-left: 7%;
    color: white;
    margin-right: auto;
    width: 80px;
    text-align: center;
    margin-top: 2%;
`

const CardText = styled.h4`
  font-size: 0.8rem;
  font-weight: 400;
  margin:0;
  text-align: left;
`

function pickTagColor(colorString){
  const colorPicker = {
    "VIP": "#f6b93b",
    "Standard": "#EC5E2A",
    "Frequent": "#95a5a6"
  }
  return colorPicker[colorString]
}


const useStyles = makeStyles({
  root: {
    marginRight: "6.5%"
  },
});


export default props => {
  const classes = useStyles();
/* const mutateObject= (stateHandle, obj, identifier) => {
  let _obj = {...obj};
  _obj["ToggleRoom"+identifier] = !_obj["ToggleRoom"+identifier];

  stateHandle(_obj);
} */
let paperStyle = {};
paperStyle= {
  position:"relative",
  display:"grid",
}

if (props.modified){
  paperStyle= {
    position:"relative",
    display:"grid",
    opacity: 0.34,
    backgroundColor: "#EC5E2A"
  }
}

  return (

      <Grid item container xs={12}>
        {props.roomNumber && 
                <PaperRoom style={paperStyle}>
                <Dot/>
                <Time>
               <h4>{props.markers[0]}
                <br/>
                {props.markers[1]}
                </h4>  
                </Time>
                <Grid item container xs ={12} style={{marginTop:"2%"}}>
                  <Grid item xs={6}>
                  <LinkNoStyle to={"/deepdive/"+props.roomNumber.slice(-1)}>
                        <CheckTitle style={{ textDecoration: "none", display:"flex"}}>
                        {"Room "+ props.roomNumber} {props.modified && <Notifications style={{marginTop:"2%", fontSize:"1.3rem", marginLeft:"3%"}}/>}
                        </CheckTitle>
                    </LinkNoStyle>
                  </Grid>
                  <Grid item xs={6}>
                    <StatusTag style={{
                      backgroundColor: pickTagColor(props.roomObj[props.roomNumber]["status"])
                    }}>
                      {props.roomObj[props.roomNumber]["status"]}
                    </StatusTag> 
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={6} style={{display:"flex", alignItems:"center"}}>
                    <CardText>{props.roomObj[props.roomNumber]["guest"]}</CardText>
                  </Grid>
                  <Grid item xs={6}>
                  <Switch 
                  onChange={(e,b) => {
                    let _obj = {...props.roomObj};
                    _obj[props.roomNumber]["cleaned"] = !_obj[props.roomNumber]["cleaned"];
                    props.setRoomObj(_obj);
                  }}
                  color="primary"
                  classes={{
                    root: classes.root, // class name, e.g. `classes-nesting-root-x`
                  }}
                  />
                    </Grid>
                </Grid>
                </PaperRoom>
        }
      </Grid>
  );
};
