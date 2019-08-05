import React, { Fragment } from 'react';
import {Button, Grid} from "@material-ui/core";
import Datepicker from "./Datepicker";
import FilterList from "@material-ui/icons/FilterList";
import Dropdown from "./Dropdown";
import styled from "styled-components";

const locations = ["Augsburg", "Berlin", "Regensburg"];
const floors = ["1st Floor","2nd Floor", "3rd Floor"];

const GridChild = styled(Grid)`
    &&{
        height:100%;
        display: flex;
        align-items: center;
    }
`
const ButtonText = styled.h4`
    margin:0;
    margin-right:auto;
`

export default props => {
    return(
        <Fragment>
            <GridChild item xs={2}>
                <Button
                color="primary"
                style={{textTransform:"capitalize"}}
                >
                + Add Booking
                </Button>
            </GridChild>
            <GridChild item container xs={4}>
                <Datepicker/>
            </GridChild>
            <GridChild item xs={2}>
                <Button
                color="primary"
                style={{textTransform:"capitalize", width:"60%"}}
                >
                    <ButtonText>Filter</ButtonText>     
                    <FilterList/>
                </Button>
            </GridChild>
            <GridChild item xs={2}>
                <Dropdown options={locations} defaultSelect={1}/>
            </GridChild>            
            <GridChild item xs={2}>
                <Dropdown options={floors} defaultSelect={2}/>
            </GridChild>
        </Fragment>
    );
}