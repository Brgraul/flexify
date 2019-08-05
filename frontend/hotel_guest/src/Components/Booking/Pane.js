import React from "react";
import { Paper } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    borderRadius: 15,
    padding: "1% 10%"
  }
});

export default props => {
  const classes = useStyles();

  return <Paper classes={{ root: classes.root }} />;
};
