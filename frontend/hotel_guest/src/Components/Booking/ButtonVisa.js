import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
  return (
    <div>
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          VISA
        </Button>
      </label>
    </div>
  );
}

// Option 1: You declare a function
function name(params) {
}


// Option 2: You declare a function + a shorthand for it
const a  = function name(params){

}
// Option 3: You declare an arrow function, direct use of it
console.log(params => {return params*2})

// Option 4: You create an arrow 
var b  = (param_a, param_b) => {}