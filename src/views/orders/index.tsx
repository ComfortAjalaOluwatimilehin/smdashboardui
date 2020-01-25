import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface IAllOrdersProps extends RouteComponentProps {
  token: string;
}
export const AllOrders: React.FC<IAllOrdersProps> = ({
  token,
  ...otherprops
}) => {
  console.log("token", token);
  return <>Hello All orders</>;
};
