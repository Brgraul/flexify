import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { textAlign } from "@material-ui/system";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
import ButtonLog from "./ButtonLog";
import ButtonRegister from "./ButtonRegister";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width:"100%"
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
    email: "",
    password: "",
    showPassword: false
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Grid container xs={9}>
      <Grid item container xs={12}>
      <form className={classes.container} noValidate autoComplete="off">
        <Grid item xs={12}>
          <TextField
            id="standard-name"
            label="E-mail"
            placeholder="max.mustermann@cdtm.de"
            value={values.name}
            onChange={handleChange("email")}
            margin="normal"
            style={{width:"100%"}}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} style={{width:"100%"}}>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item container xs={12} style={{marginTop:"10%", marginBottom:"5%"}}>
          <Grid item xs={6} align="left">
            <ButtonLog />
          </Grid>
          <Grid item xs={6} align="right">
            <ButtonRegister />
          </Grid>
        </Grid>
    </form>
      </Grid>
    </Grid>
  );
}
