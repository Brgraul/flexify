import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ButtonConfirm from "./ButtonConfirm";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  textField: {
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

export default function TextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "Jannik Wiedenhaupt",
    creditcard: "DE25 1234 1234 1234 56",
    expirary: "09/22",
    code: "678"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Grid container style={{ justifyContent: "center" }}>
      <Grid item container xs={9} style={{ justifyContent: "center" }}>
        <form className={classes.container} noValidate autoComplete="off">
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="Cardholder's Name"
              defaultValue="Jannik Wiedenhaupt"
              // placeholder="Max Mustermann"
              className={classes.textField}
              value={values.name}
              onChange={handleChange("name")}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-creditcard"
              label="Credit Card Number"
              // placeholder="1234 1235 6728 7482"
              defaultValue="1234 1234 1234 1234"
              className={classes.textField}
              value={values.creditcard}
              onChange={handleChange("creditcard")}
              margin="normal"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="standard-expirary"
              label="Expirary Date"
              // placeholder="Ex. 09 / 12"
              defaultValue="12/22"
              className={classes.textField}
              value={values.expirary}
              onChange={handleChange("expirary")}
              margin="normal"
            />
          </Grid>
          <Grid xs={2} />
          <Grid item xs={5}>
            <TextField
              id="standard-code"
              label="Security Code"
              // placeholder="***"
              defaultValue="678"
              className={classes.textField}
              value={values.code}
              onChange={handleChange("code")}
              margin="normal"
            />
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
