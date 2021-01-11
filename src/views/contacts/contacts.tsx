import React from "react"
import {Tabs } from "antd"
import { CreateContact } from "./create";
import { ContactList } from "./table";

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