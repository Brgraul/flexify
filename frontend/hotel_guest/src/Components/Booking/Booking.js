import React, { useEffect, useContext, useState } from "react";
import { Fragment } from "react";
import { Grid, Button } from "@material-ui/core/";
import { Slider } from "@material-ui/lab/";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";
import ButtonVisa from "./ButtonVisa";
import ButtonPaypal from "./ButtonPaypal";
import Headline from "./Headline";
import { textAlign, flexbox } from "@material-ui/system";
import FinalSum from "./FinalSum";
import styled from "styled-components";
import LogContext from "../log-context";
import { createMarkersMobile, getSliderInterval } from "../utils.js";
import { makeStyles } from "@material-ui/core/styles";
import { func } from "prop-types";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles({
  track: {
    backgroundColor: "#FAC4B2"
  },
  rail: {
    backgroundColor: "#EC5E2A",
    opacity: "1"
  },
  mark: {
    backgroundColor: "white"
  },
  markActive: {
    backgroundColor: "#EC5E2A"
  }
});

const ROOT = "http://127.0.0.1:1337/";
const API = "api/v1";

const CardTitle = styled.h2`
  margin-left: 5px;
  margin-right: 5px;
  text-align: left;
  margin-bottom: 5px;
  font-weight: 200;
  font-size: 15px;
`;

const NextButton = styled(Button)`
  && {
    min-width: 100%;
    margin: 0;
    border-radius: 0;
    position: fixed;
    bottom: 0;
    height: 7%;
  }
`;

const CheckTitle = styled.h3`
  margin: 0;
`;

const CheckSubTitle = styled.h4`
  margin: 0;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 0.8rem;
`;

const OuterGrid = styled(Grid)`
  margin-top: 2.5% !important;
  display: flex;
  justify-content: center;
`;
export default props => {
  // Loading the context
  const log = useContext(LogContext);
  const classes = useStyles();

  // The only thing that should mutate are the newChecks that are passed as arguments
  const checkInTime = new Date(log.reservation.check_in);
  const checkOutTime = new Date(log.reservation.check_out);
  const earlyConstraint = new Date(log.reservation.prev_res_out);
  const lateConstraint = new Date(log.reservation.next_res_in);
  let newCheckIn = 0;
  let newCheckOut = 0;

  // CheckOut slider state control
  const [valueOut, setValueOut] = React.useState(0);
  const handleChangeOut = (event, newValue) => {
    setValueOut(newValue);
    console.log(newValue);
  };
  /*   useEffect(() => {
    // Update newCheckOutTime whenever you change the slider
    const difference = lateConstraint.getHours() - checkOutTime.getHours();
    props.setNewCheckOut(checkOutTime.getHours() + (valueOut / 100) * difference);
    console.log(props.newCheckOutTime);
  }, [valueOut]); */

  // CheckIn slider state control
  const [valueIn, setValueIn] = React.useState(100);
  const handleChangeIn = (event, newValue) => {
    setValueIn(newValue);
    console.log(newValue);
  };
  /*   useEffect(() => {
    // Update newCheckOutTime whenever you change the slider
    const difference = checkInTime.getHours() - earlyConstraint.getHours();
    props.setNewCheckIn(checkInTime.getHours() + (valueIn / 100) * difference);
    // So far it is set as 1 hour increments
    console.log(props.newCheckInTime);
  }, [valueIn]); */

  function sliderValueToDateTime(maxTime, minTime, sliderValue) {
    const difference = maxTime.getHours() - minTime.getHours();
    let temp = new Date(minTime);
    if (sliderValue === 0) {
      return minTime;
    }
    if (sliderValue === 100) {
      return maxTime;
    } else {
      temp.setHours(
        minTime.getHours() + Math.ceil((sliderValue / 100) * difference)
      );
      return temp;
    }
  }

  /** Returns a string with the calculated pricing based on the price of the slider */
  const pricingIn = function(val, maxTime, minTime) {
    const interval = getSliderInterval(maxTime, minTime);
    const maxValue = (100 / interval) * 5;
    return Math.abs(maxValue - (val / interval) * 5);
  };

  const pricingOut = function(val, maxTime, minTime) {
    const interval = getSliderInterval(maxTime, minTime);
    return Math.abs(val / interval) * 5;
  };

  useEffect(() => {
    props.setTotalPrice(pricingIn(valueIn, checkInTime, earlyConstraint) + 
    pricingOut(valueOut, lateConstraint, checkOutTime));
  });

  // This are already date Javascript objects
  const marksCheckIn = createMarkersMobile(earlyConstraint, checkInTime);
  const marksCheckOut = createMarkersMobile(checkOutTime, lateConstraint);

  function valuetext(value) {
    return `${value * 2}°C`;
  }

  function valueLabelFormat(value) {
    return marksCheckIn.findIndex(mark => mark.value === value) + 1;
  }

  const SliderIn = (
    <Slider
      value={valueIn}
      onChange={handleChangeIn}
      defaultValue={100}
      step={null}
      valueLabelDisplay="off"
      marks={marksCheckIn}
      valueLabelFormat={valueLeft => valueLeft}
      classes={{
        track: classes.track, // class name, e.g. `classes-nesting-root-x`
        rail: classes.rail,
        mark: classes.mark,
        markActive: classes.markActive
      }}
    />
  );

  const SliderOut = (
    <Slider
      value={valueOut}
      onChange={handleChangeOut}
      defaultValue={100}
      valueLabelFormat={valueLabelFormat}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider-restrict"
      step={null}
      valueLabelDisplay="off"
      marks={marksCheckOut}
    />
  );
  console.log(checkInTime);
  return (
    <Fragment>
      <OuterGrid container>
        <Grid item xs={11} style={{ marginBottom: "3%" }}>
          {log.reservation && (
            <Headline
              firstName={log.reservation.main_guest.first_name}
              lastName={log.reservation.main_guest.last_name}
              checkOutTime={checkOutTime}
              checkInTime={checkInTime}
              strIn={props.strIn}
              strOut={props.strOut}
            />
          )}
        </Grid>
        <Grid item xs={11} style={{ marginBottom: "3%" }}>
          <LeftPane
            sliderIn={SliderIn}
            price={pricingIn(valueIn, checkInTime, earlyConstraint).toFixed(2) + "€"}
            updatedTime={sliderValueToDateTime(
              checkInTime,
              earlyConstraint,
              valueIn
            )}
          />
        </Grid>

        <Grid item xs={11} style={{ marginBottom: "3%" }}>
          <RightPane
            sliderOut={SliderOut}
            price={pricingOut(valueOut, lateConstraint, checkOutTime ).toFixed(2) + "€"}
            updatedTime={sliderValueToDateTime(
              lateConstraint,
              checkOutTime,
              valueOut
            )}
          />
        </Grid>
        <Grid align="center" item xs={11}>
          <FinalSum totalPrice={props.totalPrice} />
        </Grid>
      </OuterGrid>
      {log.status ? (
        <div>
          <div
            style={{ textDecoration: "none" }}
            onClick={() => {
              props.history.push("summary");
              props.setNewCheckIn(
                sliderValueToDateTime(checkInTime, earlyConstraint, valueIn)
              );
              props.setNewCheckOut(
                sliderValueToDateTime(lateConstraint, checkOutTime, valueOut)
              );
            }}
          >
            <NextButton color="primary" variant="contained">
              Confirm booking
            </NextButton>
          </div>
        </div>
      ) : (
        <div
          style={{ textDecoration: "none" }}
          onClick={() => {
            props.history.push("credit");
            props.setNewCheckIn(
              sliderValueToDateTime(checkInTime, earlyConstraint, valueIn)
            );
            props.setNewCheckOut(
              sliderValueToDateTime(lateConstraint, checkOutTime, valueOut)
            );
          }}
        >
          <NextButton
            variant="contained"
            color="primary"
            component="span"
            align="center"
            size="large"
          >
            Enter Payment Details
          </NextButton>
        </div>
      )}
    </Fragment>
  );
};
