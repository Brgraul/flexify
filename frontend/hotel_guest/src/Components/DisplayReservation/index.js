import React, {Fragment} from 'react';
import moment from 'moment';
import {CardActions, Card, CardContent, Typography , Button, Grid} from '@material-ui/core';

export default props => {  
    var checkIn = moment(props.reservation.check_in);
    var checkOut = moment(props.reservation.check_out);
    console.log(checkIn) 
    const checkInFormatted = checkIn.format("dddd, MMMM Do YYYY, h:mm:ss a");
    const checkOutFormatted = checkOut.format("dddd, MMMM Do YYYY, h:mm:ss a");

    return(
        <Grid container justify="center">
            <Grid item xs={10}>
                <Card>
                    <CardContent>
                        <Typography variant="h3" color="textPrimary">
                        {props.reservation.main_guest.first_name}
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            {props.reservation.main_guest.last_name}
                        </Typography>
                        <Typography color="textPrimary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

