import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    alignItems: "center",
    justify: "center"
  },
  input: {
    display: "none"
  }
}));

export default function ContainedButtons() {
  const classes = useStyles();

  //Use the textDecoration "none" style to get rid of the underlined Link layout
  return (
    <div>
      <label htmlFor="contained-button-file">
        <Link style={{ textDecoration: "none" }} to="/booking">
          <Button
            variant="contained"
            component="span"
            className={classes.button}
          >
            Register
          </Button>
        </Link>
      </label>
    </div>
  );
}
