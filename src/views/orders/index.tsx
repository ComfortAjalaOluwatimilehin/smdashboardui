import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useObservable } from "mobx-react-lite";
import { OrderStore } from "./store";
import { toJS } from "mobx";

interface IAllOrdersProps extends RouteComponentProps {
}
export const AllOrders: React.FC<IAllOrdersProps> = ({
  ...otherprops
}) => {
  const store = useObservable(OrderStore);
  let { hasAccess } = store;
  hasAccess = toJS(hasAccess);
  useEffect(() => {
    store.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAccess]);

  return <>Hello All orders</>;
};
