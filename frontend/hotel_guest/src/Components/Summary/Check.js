import React, {Fragment} from 'react';
import {Grid} from '@material-ui/core';
import {CheckTitle} from '../SharedComponents';
import {CheckSubTitle} from '../SharedComponents';

var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

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