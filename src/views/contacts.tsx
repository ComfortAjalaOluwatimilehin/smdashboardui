import React from "react"
import {Tabs } from "antd"
import { EmployeeList } from "./subviews/employeelist";
import { CreateEmployee } from "./subviews/createemployee";
import { ContactList } from "./subviews/contactlist";
import { CreateContact } from "./subviews/createcontact";

const { TabPane } = Tabs;

export const Contacts : React.FC<any> = () => {


        return (

            <Tabs type="card">
            <TabPane tab="Contacts" key="1">
             <ContactList />
            </TabPane>
            <TabPane tab="New contacts" key="2">
              <CreateContact/>
            </TabPane>
          </Tabs>
        )
}