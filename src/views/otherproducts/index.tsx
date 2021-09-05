import { Card, Tabs } from "antd"
import { observer } from "mobx-react-lite"
import React from "react"
import { CreateProduct } from "./create.product"

export const OtherProducts :React.FC<any> = observer(() => {

    console.log("hi")

    return <Card>

<Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="create new product" key="1">
      <CreateProduct />
    </Tabs.TabPane>
    <Tabs.TabPane tab="product stats" key="2">
      Tab 2
    </Tabs.TabPane>
    <Tabs.TabPane tab="all product stats" key="3">
      Tab 3
    </Tabs.TabPane>
    <Tabs.TabPane tab="manager actions" key="4">
      Tab 4
    </Tabs.TabPane>
  </Tabs>
    </Card>
})