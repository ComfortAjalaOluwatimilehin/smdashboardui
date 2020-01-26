import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useObservable, observer } from "mobx-react-lite";
import { OrderStore } from "./store";
import { toJS } from "mobx";
import { Typography, Table, Card, Alert, Switch, Button } from "antd";
import moment from "moment";

interface IAllOrdersProps extends RouteComponentProps {}
export const AllOrders: React.FC<IAllOrdersProps> = observer(
  ({ ...otherprops }) => {
    const store = useObservable(OrderStore);
    let { hasAccess, orders, info } = store;
    hasAccess = toJS(hasAccess);
    orders = toJS(orders);

    useEffect(() => {
      store.init();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const tablecolumns: { title: string; dataIndex: string; key: string }[] = [
      { key: "order_status", value: "Order Status" },
      { key: "delivery_address", value: "Delivery Address" },
      { key: "delivery_date", value: "Delivery Date" },
      { key: "valid", value: "Active" },
      { key: "details", value: "" }
    ].map((item: { key: string; value: string }) => {
      return {
        title: item.value,
        dataIndex: item.key,
        key: item.key,
        render: (text: any, record: any, index: number) => {
          if (item.key === "delivery_date") {
            return moment(text).format("LL");
          } else if (item.key === "valid") {
            return <Switch disabled={true} defaultChecked={text} />;
          } else if (item.key === "details") {
            return (
              <Button
                type="primary"
                onClick={() => {
                  ///console.log(record);
                  otherprops.history.push(`/orders/${record._id}`);
                }}
              >
                More Details
              </Button>
            );
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
          <Card title={<Typography.Title>Orders</Typography.Title>}>
            <Table
              scroll={{ x: true }}
              dataSource={orders}
              columns={tablecolumns}
              rowKey="orderlist"
            />
          </Card>
        )}
      </>
    );
  }
);
