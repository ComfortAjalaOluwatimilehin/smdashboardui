import React from "react"
import {Tabs } from "antd"
import { CreateMaterial } from "./subviews/creatematerial";
import { MaterialList } from "./subviews/materiallist";

const { TabPane } = Tabs;

export const Materials : React.FC<any> = () => {


        return (

            <Tabs type="card">
            <TabPane tab="Materials" key="1">
             <MaterialList />
            </TabPane>
            <TabPane tab="New material" key="2">
              <CreateMaterial/>
            </TabPane>
          </Tabs>
        )
}