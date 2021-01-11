import { Tabs } from "antd";
import React from "react";
import { CreateMaterial } from "./create";
import { MaterialList } from "./table";

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