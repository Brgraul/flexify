import React, { useContext, Fragment } from "react";
import Confirmation from "../../Pictures/tickmark.svg";
import Beer from "../../Pictures/beer.svg";
import Flexify from "../../Pictures/flexify.svg";

import Gift from "../../Pictures/gift.svg";
import ButtonAccount from "./ButtonAccount";
import LogContext from "../log-context";
import {Header} from "../SharedComponents";
import {Paper, Grid} from "@material-ui/core";

export default props => {
  const log = useContext(LogContext);

  return (
    <Grid xs={11} style={{margin: "auto", textAlign:"center", marginTop:"4%"}}>
      <Paper style={{padding:"4%", borderRadius:"15px"}}>
        {props.reservation.winner != undefined 
          ? <Fragment>
             {props.reservation.winner ?        
              <img
              src={Gift}
              alt="ConfirmationLogo"
              className="ConfirmationLogo"
              height="200px"
              style={{display: "block", margin: "auto"}}
               />
               :
               <img
               src={Beer}
               alt="ConfirmationLogo"
               className="ConfirmationLogo"
               height="200px"
               style={{display: "block", margin: "auto"}}
                />
             }
          </Fragment>
          :<Fragment>
            <img
            src={Confirmation}
            alt="ConfirmationLogo"
            className="ConfirmationLogo"
            height="200px"
            style={{display: "block", margin: "auto"}}
            />
          </Fragment>
          }
      
        <div>
        {props.reservation.winner != undefined 
          ? <Fragment>
             {props.reservation.winner ?        
            <Fragment>
              <Header>
              <strong style={{display:"block"}}>Congratulations!</strong>
              <strong>You've won a stay at a Limehome</strong>
              </Header>
              <p>
                Please come to our booth for more info
                <br />
                Enjoy your stay at Limehome (;
              </p>
            </Fragment>
               :
               <Fragment>
               <Header style={{fontWeight:"400"}}>
               <strong style={{display:"block"}}>Hey, we got you covered...</strong>
               You didn't get a stay at a Limehome, but you're getting some beer at our booth! 
               </Header>
               <p>
                 Thanks for joining us today and hope you enjoyed
                 <br />
                 With love, 
               </p>
               <img
            src={Flexify}
            alt="ConfirmationLogo"
            className="ConfirmationLogo"
            height="200px"
            style={{display: "block", margin: "auto", height: "20%"}}
            />
               </Fragment>
             }
          </Fragment>
          :<Fragment>
          <Header>
          <strong>You successfully extended your stay at Limehome!</strong>
          </Header>
          <p>
            We will send you an e-mail that confirms your booking.
            <br />
            Enjoy your stay at Limehome.
          </p>
          </Fragment>
        }

        </div>
        {log.status ? null : (
          <div className="ConfirmationText">
            <p position="fixed" bottom="0" text-align="center" font-size="8px">
              To extend your stay more easily next time, <br/> create an account!
            </p>
          </div>
        )}
      </Paper>

      <ButtonAccount reservationStr={props.reservationStr} logged={log.status} />

    </Grid>
  );
};
