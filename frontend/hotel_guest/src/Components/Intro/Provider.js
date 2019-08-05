import React, { Fragment } from 'react';
import {Grid, Paper} from '@material-ui/core';
import styled from 'styled-components';
import Logo from '../../Pictures/logoLH.svg';

const Title = styled.h3`
    margin: 0;
    margin-bottom: 0.5%;
`;

const SubTitle = styled.h4`
    margin : 0;
    font-weight: 400;
`;

export default props => {
    return(
        <Grid container item xs={12} style={{marginTop:"5%", marginBottom:"3%"}}>
            <Grid item container xs={6}>
                <Title>Apartment</Title>
                <SubTitle>hosted by <strong>Limehome</strong> </SubTitle>
            </Grid>
            <Grid item xs={6} align="right">
                <img src={Logo} alt="" style={{maxWidth:"30%"}}/>
            </Grid>
        </Grid>
    );
}