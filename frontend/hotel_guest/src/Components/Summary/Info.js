import React, { useContext, Fragment } from 'react';
import LogContext from '../log-context';
import { Grid} from '@material-ui/core';
import Check from './Check';
import {Header} from '../SharedComponents';
import {SubHeader} from '../SharedComponents';


const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const formatDate = (date,days,months) => 
    days[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate();

export default props => {
    const context = useContext(LogContext);
    const cInStr = formatDate(props.newCheckIn, days, months);
    const cOutStr = formatDate(props.newCheckOut, days,months);
    return(
        <Grid container item xs = {12} style={{marginBottom:"3%"}}>
            <Grid item xs = {12}>
                <SubHeader>{ cInStr + '-' + cOutStr }</SubHeader>
            </Grid>
            <Grid item xs = {12}>
                <Header>{context.reservation.property} {context.reservation.address.street}</Header>
                <SubHeader> New reservation times</SubHeader>
            </Grid>
            <Check what="in" time={props.newCheckIn} cStr={cInStr}/>
            <Check what="out" time={props.newCheckOut} cStr={cInStr}/>
        </Grid>

    );
}