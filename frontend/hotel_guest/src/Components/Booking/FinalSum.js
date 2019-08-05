import  React  from "react";
import Fab from "@material-ui/core/Fab";
import styled from "styled-components";

const Indicator = styled(Fab)`
  width: 100% !important;
`;

export default props => {
  return (
    <div>
      <Indicator variant="extended" size="big" variant="contained" aria-label="Add">
        {" "}
        {props.totalPrice.toFixed(2)} €
      </Indicator>
    </div>
  );
};
