import { Card, Tabs } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import { CreateExpenses } from "../expenses/create";
import { AllProductsStats } from "./allproducts.stats";
import { CreateProduct } from "./create.product";
import { ManagerActions } from "./manager.actions";
import { Products } from "./product.";

export const OtherProducts: React.FC<any> = observer(() => {
  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="product" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="all product stats" key="2">
          <AllProductsStats />
        </Tabs.TabPane>
        <Tabs.TabPane tab="expenses" key="3">
          <CreateExpenses />
        </Tabs.TabPane>
        <Tabs.TabPane tab="create new product" key="4">
          <CreateProduct />
        </Tabs.TabPane>
        <Tabs.TabPane tab="manager actions" key="5">
          <ManagerActions />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
});
