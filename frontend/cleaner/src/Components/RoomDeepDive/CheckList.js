import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Checkbox} from "@material-ui/core";
import  Chat  from "@material-ui/icons/Chat";


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function checkCleaned(markedVector){
  let cleaned = true;
  for(let i = 0; i<markedVector.length;i++){
    if(markedVector[i] === false){
      cleaned = false;
    }
  }
  return cleaned
}

export default props => {
  const toDos = ["Clean bathroom", "Refill fridge", "Refill soap"];
  useEffect(() => {
/*     if (props.marked != undefined ){
      if(props.roomObj[`30${props.room}`]["cleaned"]===false){
        if(checkCleaned(props.marked)){
          console.log("Changes!")
          let _obj = {...props.roomObj}
          _obj[`30${props.room}`]["cleaned"] = true;
          props.setRoomObj(_obj)        
        }
      }
    } */
  })
  return(<Grid container xs={12}>
    {toDos.map((x, i) => 
      <Grid item container xs={12} >
        <Grid item xs={4} style={{margin: "auto"}}>
          <Checkbox
          color="primary"
          onChange={() => {
            let _current = [...props.marked];
            _current[i] = !_current[i];
            props.setMarked(_current);
          }}
          />
        </Grid>
        <Grid item xs={4} style={{margin: "auto"}}>
          {x}
        </Grid>
        <Grid item xs={4} style={{margin: "auto"}}>
          <Chat style={{marginLeft: "auto", display:"block"
        }}/>
        </Grid>
      </Grid>
      )}
  </Grid>)
}
