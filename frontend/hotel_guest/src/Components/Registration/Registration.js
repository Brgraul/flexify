import React from "react";
import RegDialog from "./RegDialog";
import ButtonReg from "./ButtonReg";
import LimehomeLogoDark from "../../Pictures/limehomeLogoDark.png";
import styled from "styled-components";

const Img = styled.img`
  display: block;
  width: 70%;
  margin-top: auto;
  margin-bottom: auto;
`;

export default props => (
  <div justify="center">
    <Img src={LimehomeLogoDark} alt="LimehomeLogoDark" />
    <h4>Please enter your credentials here</h4>
    <RegDialog />
    <ButtonReg />
  </div>
);
