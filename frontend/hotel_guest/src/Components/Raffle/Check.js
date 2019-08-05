import React, {Fragment} from 'react';
import {Grid} from '@material-ui/core';
import styled from 'styled-components';

var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const CheckTitle = styled.h3`
    margin: 0;
`;
const CheckSubTitle = styled.h4`
    margin : 0;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 0.8rem;
`;


export default props => {
    return(
        <Fragment>
        {props.what === "in" ? 
            <Grid item xs={6}>
                <CheckTitle>Check-{props.what}</CheckTitle>
                <CheckSubTitle>{props.time.getHours() +':'+ props.time.getMinutes()+'0'}</CheckSubTitle>
                <CheckSubTitle>{props.cStr}</CheckSubTitle>
            </Grid>
            :
            <Grid item xs={6} align="right"> 
                <CheckTitle>Check-{props.what}</CheckTitle>
                <CheckSubTitle>{props.time.getHours() +':'+ props.time.getMinutes()+'0'}</CheckSubTitle>
                <CheckSubTitle>{props.cStr}</CheckSubTitle>
            </Grid>
        }
        </Fragment>
    );    
}