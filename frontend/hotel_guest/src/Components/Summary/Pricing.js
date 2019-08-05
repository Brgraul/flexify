import React, { useContext, Fragment } from 'react';
import {Grid} from '@material-ui/core';
import Context from '../log-context';
import {CheckTitle} from '../SharedComponents';
import {GridMargin} from '../SharedComponents';

export default props => {
    const context = useContext(Context);
    const origPrice = parseFloat(context.reservation.price);
    var content = [["Reservation price", origPrice], 
    ["Extension price", props.totalPrice], 
    ["Total price", props.totalPrice + origPrice]];
    const len = content.length;

    var elemArray = content.map(
        (x, i) => {
            if (len === i + 1) {
                return(
                <Grid item container xs={12}>
                    <Grid item xs={6}>
                        <strong> {x[0]}</strong>  
                    </Grid>
                    <Grid item xs={6} align="right">
                        <strong>{x[1]} €</strong>
                    </Grid>
                </Grid>);
            } else {
                return(
                <Grid item container xs={12}>
                    <Grid item xs={6}>
                    {x[0]}  
                    </Grid>
                    <Grid item xs={6} align="right">
                    {x[1]} €
                    </Grid>
                </Grid>
                );
            }
          }
    );

    return(
        <GridMargin container item xs={12}>
            <CheckTitle> Price </CheckTitle>
            {elemArray}
        </GridMargin>
    );
}