import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import LogContext from "../log-context";

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

export default props => {
  const classes = useStyles();
  const loginStatus = useContext(LogContext);

  //Use the textDecoration "none" style to get rid of the underlined Link layout
  return (
    <div>
      <label htmlFor="contained-button-file">
        <Link style={{ textDecoration: "none" }} to="/booking">
          <Button
            variant="contained"
            component="span"
            className={classes.button}
            onClick={loginStatus.logout}
          >
            Logout
          </Button>
        </Link>
      </label>
    </div>
  );
};
