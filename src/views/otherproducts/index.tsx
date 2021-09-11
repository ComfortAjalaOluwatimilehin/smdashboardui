import { Card, Tabs } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import { AllProductsStats } from "./allproducts.stats";
import { CreateProduct } from "./create.product";
import { Products } from "./product.";

export const OtherProducts: React.FC<any> = observer(() => {

  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="create new product" key="1">
          <CreateProduct />
        </Tabs.TabPane>
        <Tabs.TabPane tab="product stats" key="2">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="all product stats" key="3">
          <AllProductsStats />
        </Tabs.TabPane>
        <Tabs.TabPane tab="manager actions" key="4">
          Tab 4
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
});
