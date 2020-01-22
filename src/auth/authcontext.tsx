import React from "react";

export const authContext = React.createContext({
  token: "",
  logout: () => {
    console.log("default logging out");
  }
});
