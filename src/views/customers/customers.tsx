import React from "react"
import {Tabs } from "antd"
import { CreateCustomer } from "./create";
import { CustomerList, } from "./table";

const { TabPane } = Tabs;

export const Customers : React.FC<any> = () => {


        return (

            <Tabs type="card">
            <TabPane tab="Customers" key="1">
             <CustomerList />
            </TabPane>
            <TabPane tab="New customer" key="2">
              <CreateCustomer/>
            </TabPane>
          </Tabs>
        )
}