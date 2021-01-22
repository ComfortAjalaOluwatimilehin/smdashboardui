import React from "react";

export const authContext = React.createContext({
  logout: () => {
    console.log("default logging out");
  }
});
