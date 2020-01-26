import React, { useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { useObservable, observer } from "mobx-react-lite";
import { toJS } from "mobx";
import moment from "moment";
import { SingleOrderStore } from "./single.store";
import { Typography, Row, Card, Table, Divider, Steps, Button } from "antd";
const { Step } = Steps;
interface ISingleOrdersProps extends RouteComponentProps {}
export const SingleOrder: React.FC<ISingleOrdersProps> = observer(() => {
  const store = useObservable(SingleOrderStore);
  const { orderid } = useParams();
  let {
    order,
    hasAccess,
    orderstatus,
    currentstatusposition,
    ordertotal
  } = store;
  order = toJS(order);
  hasAccess = toJS(hasAccess);
  orderstatus = toJS(orderstatus);
  currentstatusposition = toJS(currentstatusposition);
  ordertotal = toJS(ordertotal);
  useEffect(() => {
    store.init(orderid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderid]);

   // console.log(orderstatus, order);
  //  console.log(currentstatusposition, order);

  return (
    <>
      {hasAccess && order && (
        <Row>
          <Typography.Title level={3}>
            Reports: {order.order_status}
          </Typography.Title>
          <Card
            title={<Typography.Title level={4}>Bill: </Typography.Title>}
            style={{ maxWidth: "300px" }}
          >
            <Typography.Title style={{ color: " #009688" }}>
              {ordertotal}
            </Typography.Title>
          </Card>
          <Divider />
          <Card title="Progress">
            {orderstatus && orderstatus.length > 0 && (
              <Steps
                size="small"
                current={currentstatusposition}
                status={
                  currentstatusposition === undefined ||
                  currentstatusposition < orderstatus.length - 1
                    ? "process"
                    : "finish"
                }
              >
                {orderstatus.map((st, index: number) => {
                  return (
                    <Step
                      title={st}
                      key={st}
                      disabled={currentstatusposition <= index}
                    />
                  );
                })}
              </Steps>
            )}
            {currentstatusposition < orderstatus.length - 1 && (
              <Button
                type="primary"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  if (window.confirm("Are you sure?")) {
                    store.movetonextorderstatus();
                  }
                }}
              >
                Next
              </Button>
            )}
          </Card>
          <Divider />
          <Card title="Shipping Details">
            <Table
              scroll={{ x: true }}
              pagination={false}
              columns={[
                { key: "delivery_address", title: "Shipping Address" },
                { key: "delivery_date", title: "Shipping Date" },
                { key: "customer_fullname", title: "Customer" },
                { key: "order_status", title: "Status" }
              ].map((item: { key: string; title: string }) => {
                return {
                  key: item.key,
                  dataIndex: item.key,
                  title: item.title,
                  render: (text: any, record: any, index: number) => {
                    if (item.key === "delivery_date") {
                      return moment(text).format("LL");
                    }
                    return text;
                  }
                };
              })}
              dataSource={[order]}
            ></Table>
          </Card>
          <Divider />
          <Card title="Product details">
            <Table
              scroll={{ x: true }}
              pagination={false}
              columns={[
                { key: "product_name", title: "Product Item" },
                { key: "product_unit_price", title: "Single/Unit Price" },
                { key: "quantity", title: "Quantity" },
                { key: "total", title: "Cost" }
              ].map((item: { key: string; title: string }) => {
                return {
                  key: item.key,
                  dataIndex: item.key,
                  title: item.title,
                  render: (text: any, record: any, index: number) => {
                    if (item.key === "product_unit_price") {
                      return `₦ ${text.toFixed(3)}`;
                    }
                    if (item.key === "total") {
                      return `₦ ${(
                        record.quantity * record.product_unit_price
                      ).toFixed(3)}`;
                    }
                    return text;
                  }
                };
              })}
              dataSource={order.orderproducts}
            />
          </Card>
        </Row>
      )}
    </>
  );
});
