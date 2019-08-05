import React from "react";

const logContext = React.createContext({
  status: false,
  login: () => {},
  logout: () => {}
});

export default logContext;
