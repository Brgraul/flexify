import React from 'react';
import styled from 'styled-components';
import {Paper, CircularProgress} from '@material-ui/core';
import {CheckTitle, CheckSubTitle} from "../SharedComponents";

const PaperProgress = styled(Paper)`
    position: relative;
    display: flex;
    height: 8rem;
    align-items: center;
    justify-content: center;
    z-index: -3;
`;

const CircleOuter = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #bdc3c7;
    z-index: -2;
`

const CircleCutOut = styled.div`
    width: 83%;
    height: 83%;
    background-color: #ffffff;
    position: absolute;
    left: 8%;
    top: 8.5%;
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
`


export default props => {
    return(
        <PaperProgress align="center">
        <div style={{position:"absolute"}}>
            <CheckTitle>{props.cleanedRooms}</CheckTitle>
            <CheckSubTitle>/{props.totalRooms} rooms</CheckSubTitle>
        </div>
        <CircularProgress
        value={(props.cleanedRooms/props.totalRooms)*100}
        variant="static"
        size={100}
        thickness={4}
        color="primary"
        style={{position:"absolute"}}
        />
        <CircleOuter>
        <CircleCutOut/>
        </CircleOuter>
        </PaperProgress>
    );
}

