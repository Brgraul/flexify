import React from 'react';
import {Grid, Button} from '@material-ui/core';
import {CheckTitle, CheckSubTitle, CheckSubTitleNoUp} from '../SharedComponents';
import {GridMargin} from '../SharedComponents';
export default props => {
    return(
        <GridMargin container item>
            <Grid item xs={12}>
                <CheckTitle> Address </CheckTitle>
            </Grid>
            <Grid item xs={6}>
                <CheckSubTitleNoUp> Am Katzenstadel 10,</CheckSubTitleNoUp>
                <CheckSubTitleNoUp> 86152 Augsburg</CheckSubTitleNoUp> 
            </Grid>
            <Grid item xs={6} align="right">
                <Button to="https://maps.google.com/?q=Am Katzenstadel 10+86152+Augsburg">
                            Directions
                </Button>
            </Grid>
        </GridMargin>
    );
}