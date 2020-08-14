
import React from "react"
import { Row, Card } from "antd";
import {Chart, Legend, Axis, Interval} from "bizcharts"
import { IMonthlySales } from "../stats/stats.store";
import { toJS } from "mobx";
export const GraphicalRepresentation: React.FC<{data:IMonthlySales[]}> = ((props:any) => {
  
  const scale : any = {
    dateAsString:{type:"time", mask: 'DD-MM-YYYY,dddd'},
    paid_cash:{type:"linear", formatter: (str: number) => str.toLocaleString("en") }
  }
    return (
        <div className="graphicalrepresentation">
            <Row>
          <Card style={{width:"100%"}}>
            <Chart 
            autoFit
            height={200} 
            data={toJS(props.data)}
            scale={scale}
            position="dateAsString*paid_cash">
            <Legend />
            <Axis name="dateAsString" />
            <Axis
              name="paid_cash"/>
            <Interval position="dateAsString*paid_cash" />
        </Chart>
          </Card>
        </Row>
        </div>
    )
})