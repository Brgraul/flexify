import React, { Fragment } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import DoubleChevronLeft from "../../Pictures/chevron_left.svg";
import ChevronRight from "@material-ui/icons/ChevronRight";
import DoubleChevronRight from "../../Pictures/chevron_right.svg";
import {Grid} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import styled from "styled-components";


const Icon = styled.img`
    fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 1.5rem;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    flex-shrink: 0;
    user-select: none;
`

const GridIcons = styled(Grid)`
    &&{
        display: flex;
        align-items: center;
    }
`
export default props => {
    const [selectedDate, setSelectedDate] = React.useState(new Date('July 21, 2019'));

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <GridIcons item xs={3} style={{justifyContent:"flex-end"}}>
                <Icon src={DoubleChevronLeft} alt="Logo" />
                <ChevronLeft style={{marginRight: "2%"}}/>
            </GridIcons>
            <Grid item xs={6} style={{display:"flex", alignItems:"center"}}>
                <KeyboardDatePicker
                margin="normal"
                id="mui-pickers-date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                style={{margin:0}}
                />
            </Grid>
            <GridIcons item xs={3} style={{justifyContent:"flex-start"}}>
                <ChevronRight/>
                <Icon src={DoubleChevronRight} alt="Logo" />
            </GridIcons>
        </MuiPickersUtilsProvider>
    );
}