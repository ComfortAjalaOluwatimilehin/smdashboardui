import React from "react";
import { IOrder } from "../../../interfaces/order";
import { Table, Button, Card, Typography } from "antd";
import moment from "moment";
export interface ITodaysDeliveriesWidget {
  openorderdetails: (orderid: string) => any;
  orders: IOrder[];
}
export const TodaysDeliveriesWidget: React.FC<ITodaysDeliveriesWidget> = props => {
  return (
    <Card
      className="table-widget"
      title={<Typography.Title level={4}>Today's Deliveries</Typography.Title>}
    >
      <Table
        scroll={{ x: true }}
        pagination={{ pageSize: 10 }}
        dataSource={props.orders}
        columns={[
          { key: "customer_fullname", title: "Customer" },
          { key: "delivery_date", title: "Delivery Date" },
          { key: "delivery_address", title: "Delivery Address" },
          { key: "details", title: "" }
        ].map((item: { key: string; title: string }) => {
          return {
            key: item.key,
            dataIndex: item.key,
            title: item.title,
            render: (text: any, record: IOrder, index: number) => {
              if (item.key === "delivery_date") {
                return (
                  <p>
                    {moment(text).format("L")}{" "}
                    <span className="tillmidnight">
                      {moment(text).format("LT")}
                    </span>
                  </p>
                );
              } else if (item.key === "details") {
                return (
                  <Button
                    type="primary"
                    onClick={() => {
                      props.openorderdetails(record._id);
                    }}
                  >
                    See More
                  </Button>
                );
              }

              return text;
            }
          };
        })}
      />
    </Card>
  );
};
