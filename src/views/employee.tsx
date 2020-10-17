import React from "react"
import {Tabs } from "antd"
import { EmployeeList } from "./subviews/employeelist";
import { CreateEmployee } from "./subviews/createemployee";

const { TabPane } = Tabs;

export const Employees : React.FC<any> = () => {


        return (

            <Tabs type="card">
            <TabPane tab="Employees" key="1">
             <EmployeeList />
            </TabPane>
            <TabPane tab="Create new employee" key="2">
              <CreateEmployee/>
            </TabPane>
          </Tabs>
        )
}