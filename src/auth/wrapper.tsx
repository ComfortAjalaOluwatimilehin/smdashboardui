import React, { ReactChild, ReactChildren } from "react";

export const Wrapper = ({
  children
}: {
  children: ReactChild | ReactChildren;
}) => {
  return <div style={{ padding: "5px" }}>{children}</div>;
};
