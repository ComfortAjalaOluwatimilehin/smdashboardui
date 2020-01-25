import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SmdashboardService } from "../../service";

interface IAllCustomersProps extends RouteComponentProps {}
export const AllCustomers: React.FC<IAllCustomersProps> = ({
  ...otherprops
}) => {
  console.log("token", SmdashboardService.token);
  return <>Hello All Customers</>;
};
