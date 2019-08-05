import React, { useContext, Fragment } from 'react';
import LogContext from '../log-context';
import Check from './Check';
import { Grid} from '@material-ui/core';
import styled from 'styled-components';


const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const formatDate = (date,days,months) => 
    days[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate();

const SubHeader = styled.h4`
    font-weight: 500;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-bottom: 1.5%;
`
const Header = styled.h2`
    margin-top: 0;
    margin-bottom: 6%;
`

export default props => {
    const context = useContext(LogContext);
    const checkInTime = new Date(context.reservation.check_in);
    const checkOutTime = new Date(context.reservation.check_out);
    const cInStr = formatDate(checkInTime, days, months);
    const cOutStr = formatDate(checkOutTime, days,months);
    props.setStrIn(cInStr);
    props.setStrOut(cOutStr);
    return(
        <Grid container item xs = {12} style={{marginBottom:"5%"}}>
            <Grid item xs = {12}>
                <SubHeader>{ cInStr + '-' + cOutStr }</SubHeader>
            </Grid>
            <Grid item xs = {12}>
                <Header>{context.reservation.property} {context.reservation.address.street}</Header>
            </Grid>
            <Check what="in" time={checkInTime} cStr={cInStr}></Check>
            <Check what="out" time={checkOutTime} cStr={cOutStr}></Check>
        </Grid>

    );
}