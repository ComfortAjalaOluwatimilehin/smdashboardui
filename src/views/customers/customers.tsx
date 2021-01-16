import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

export const Customers: React.FC<any> = () => {
  return (
    <Tabs type="card">
      <TabPane tab="Customers" key="1">
      ff
      </TabPane>
      <TabPane tab="New customer" key="2">
      ff
      </TabPane>
    </Tabs>
  );
};
