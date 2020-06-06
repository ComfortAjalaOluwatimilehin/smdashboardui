import React, { ReactChild, ReactChildren } from "react";
import { Row } from "antd";
export const Wrapper = ({
  children,
}: {
  children: ReactChild | ReactChildren;
}) => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ width: "100vw", minHeight: "100vh" }}
    >
      {children}
    </Row>
  );
};
