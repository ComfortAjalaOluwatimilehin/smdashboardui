import React from "react"
import {Tabs } from "antd"
import { CreateEmployee } from "./create";
import { EmployeeList } from "./table";

const { TabPane } = Tabs;

export const Employees : React.FC<any> = () => {


        return (

            <Tabs type="card">
            <TabPane tab="Employees" key="1">
             <EmployeeList />
            </TabPane>
            <TabPane tab="New employee" key="2">
              <CreateEmployee/>
            </TabPane>
          </Tabs>
        )
}