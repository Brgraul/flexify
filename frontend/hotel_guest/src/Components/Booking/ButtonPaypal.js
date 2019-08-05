import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

export default function ContainedButtons() {
  const classes = useStyles();
  const [data, setData] = useState({ hits: [] });

  //Use the textDecoration "none" style to get rid of the underlined Link layout
  return (
    <div>
      <label htmlFor="contained-button-file">
      <Link style={{ textDecoration: "none" }} to="/credit">
      <Button
            variant="contained"
            component="span"
            className={classes.button}>
            Paypal
          </Button> 
     </Link>
    </label>
    </div>
  );
}
