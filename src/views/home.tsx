import { observer, useObservable } from "mobx-react-lite";
import { toJS } from "mobx";
import React, {  useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { HomeStore } from "./home.store";
import { Row } from "antd";
import { TodaysDeliveriesWidget } from "./orders/subcomponents/todaydeliveries";
import { IOrder } from "../interfaces/order";
import moment from "moment";
export interface IHome extends RouteComponentProps {}
export const Home: React.FC<IHome> = observer(props => {
  const store = useObservable(HomeStore);
  let { orders, hasAccess } = store;
  hasAccess = toJS(hasAccess);
  orders = toJS(orders);
  useEffect(() => {
    store.init();
  }, [store]);
  return (
    <>
      {hasAccess && orders && orders.length > 0 && (
        <Row>
          <TodaysDeliveriesWidget
            orders={orders.filter((order: IOrder) =>
              moment(order.delivery_date).isSame(new Date(), "day")
            )}
            openorderdetails={(orderid: string) => {
              props.history.push(`/orders/${orderid}`);
            }}
          />
        </Row>
      )}
    </>
  );
});
