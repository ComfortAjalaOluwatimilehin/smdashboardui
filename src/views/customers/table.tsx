import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { SmdashboardService } from "../../service";
import { ICreateCustomer } from "./create";

const cols: {
  title: string;
  dataIndex: string;
  key: string;
  render?: (...args: any) => any;
}[] = [
  {
    title: "Full name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Phone number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
];
export const CustomerList: React.FC<any> = () => {
  const [customers, setCustomers]: [
    ICreateCustomer[],
    (...args: any) => any
  ] = useState([]);
  useEffect(() => {
    SmdashboardService.fetchCustomers().then((response) => {
      setCustomers(response);
    });
  }, []);

  return (
    <div>
      <Table dataSource={customers} columns={cols} />
    </div>
  );
};
