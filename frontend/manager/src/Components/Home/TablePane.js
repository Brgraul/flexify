import React, { Fragment } from 'react';
import ControlBar from "./ControlBar";
import OccupancyTable from "./OccupancyTable";
import {Grid} from "@material-ui/core";
import styled from "styled-components";

const ControlGrid = styled(Grid)`
    &&{
        min-height: 60px;
        display: flex;
        align-items: center;
    }
`

export default props => {
    return(
        <Fragment>
            <ControlGrid container item xs={11} style={{margin:"auto"}}>
                <ControlBar/>
            </ControlGrid>
            <OccupancyTable/>
        </Fragment>
    );
}