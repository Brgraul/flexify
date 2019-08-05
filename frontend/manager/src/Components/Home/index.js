import React, {Fragment} from 'react';
import AppBar from "../AppBar";
import {Grid} from "@material-ui/core";
import Sidebar from "../Sidebar";
import styled from "styled-components";
import TablePane from "./TablePane";

const TweakedGridA = styled(Grid)`
   &&{
    flex-grow: 0;
    max-width: 18%;
    flex-basis: 18%;
   } 
`


const TweakedGridB = styled(Grid)`
   &&{
    flex-grow: 0;
    max-width: 82%;
    flex-basis: 82%;
   } 
`

export default props => {
    return(
        <div style={{height:"100vh"}}>
            <AppBar/>
            <Grid container style={{height:"100%"}}>
                <TweakedGridA item  style={{borderRight:"1px solid black"}}>
                    <Sidebar/>
                </TweakedGridA>
                <TweakedGridB>
                    <TablePane/>
                </TweakedGridB>
            </Grid>
        </div>
    );
}