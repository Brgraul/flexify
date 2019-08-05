import React, { useEffect, Fragment } from 'react';
import ButtonNext from "./ButtonNext";
import {Grid , Paper, Divider} from "@material-ui/core"; 
import {CroppingDiv} from "../SharedComponents";
import AugImg from "../../Pictures/augsburg.jpg";
import styled from "styled-components";
import Info from "./Info";
import Provider from "./Provider";

const HeaderImg = styled.img`
  display: block;
  float: center;
  width: 100%;
  margin-bottom: auto;
`;

 const reservation = {
    "next_code": "df52180253",
    "next_res_in": "2019-07-06T16:00:00Z",
    "prev_code": "da1c2bbfe3",
    "prev_res_out": "2019-07-04T10:00:00Z",
    "property": "Berlin",
    "address": {
        "street": "Marstraße",
        "number": 21,
        "zip_code": "10625",
        "city": "Berlin",
        "country": "Deustchland"
    },
    "code": "limehomepays",
    "check_in": "2019-07-04T16:00:00Z",
    "check_out": "2019-07-06T10:00:00Z",
    "unit": 8,
    "main_guest": {
        "username": "CDTM guest",
        "first_name": "CDTM",
        "last_name": "Guest",
        "email": ""
    },
    "price": "0.00",
    "currency": "€",
    "extension": {
        "extended_check_in": "2019-07-04T14:00:00Z",
        "extended_check_out": "2019-07-06T13:00:00Z",
        "price_extension": "20.00",
        "currency": "€"
    },
    "winner": false
}

export default props => {
    useEffect(() => {
        props.setReservation(reservation)
    }, [])
    return(
        <Fragment>
            <Grid container xs={11} style={{margin:"auto", marginTop:"2.5%"}}>
            <Paper style={{ borderRadius:"15px", height:"fit-content"}}>
                <CroppingDiv>
                <HeaderImg src={AugImg} alt="" style={{ borderRadius:"15px 15px 0px 0px"}}/>
                </CroppingDiv>
                <Grid container item xs={11} style={{margin:"auto"}}>
                <Info setStrIn={props.setStrIn} setStrOut={props.setStrOut} reservation={reservation}/>
                <Divider style={{width:"100%"}}/>
                <Provider/>
                </Grid>
            </Paper>
            </Grid>
            <ButtonNext></ButtonNext>
        </Fragment>
    );    
}
