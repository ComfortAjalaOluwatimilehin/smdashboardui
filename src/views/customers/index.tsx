import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { observer, useObservable } from "mobx-react-lite";
import { CustomerStore } from "./store";
import { toJS } from "mobx";
import { Typography, Table, Card, Alert } from "antd";
interface IAllCustomersProps extends RouteComponentProps {}
export const AllCustomers: React.FC<IAllCustomersProps> = observer(() => {
  const store = useObservable(CustomerStore);
  let { hasAccess, customers, info } = store;
  hasAccess = toJS(hasAccess);
  customers = toJS(customers);
  useEffect(() => {
    store.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const tablecolumns: { title: string; dataIndex: string; key: string }[] = [
    { key: "full_name", value: "Full Name" },
    { key: "phone_number", value: "Phone Number" },
    { key: "addresses", value: "Addresses" }
  ].map((item: { key: string; value: string }) => {
    return {
      title: item.value,
      dataIndex: item.key,
      key: item.key,
      render: (text: any, record: any, index: number) => {
        if (item.key === "addresses") {
          return record.addresses.join(", ");
        }
        return text;
      }
    };
  });

  //  console.log(hasAccess, tablecolumns, orders);

  return (
    <>
      {info && <Alert message={info.text} type={info.type} />}
      {hasAccess && (
        <Card title={<Typography.Title>Customers</Typography.Title>}>
          <Table
            scroll={{ x: true }}
            dataSource={customers}
            columns={tablecolumns}
            rowKey="orderlist"
          />
        </Card>
      )}
    </>
  );
});
