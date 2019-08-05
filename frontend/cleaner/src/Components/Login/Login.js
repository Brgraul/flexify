import React, { useEffect, useContext, useState } from "react";
import LogDialog from "./LogDialog";
import ButtonLog from "./ButtonLog";
import ButtonLogout from "./ButtonLogout";
import LimehomeLogoDark from "../../Pictures/limehomeLogoDark.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default props => {
  const Img = styled.img`
    display: block;
    width: 70%;
    margin-top: auto;
    margin-bottom: auto;
  `;

  return (
    <div align="center">
      <Img src={LimehomeLogoDark} alt="LimehomeLogoDark" />
      <h4>Please enter your credentials here</h4>
      <LogDialog />
      <Link to="/register">
        <body>No account yet? Create one</body>
      </Link>
    </div>
  );
};
