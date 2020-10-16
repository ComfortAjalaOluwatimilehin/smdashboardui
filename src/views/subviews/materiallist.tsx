import React, { useEffect, useState } from "react"
import {Table} from "antd"
import { SmdashboardService } from "../../service";
import moment from "moment";
export interface IMaterial{
    cost: number;
description: string;
material_type: string;
number: number;
purchase_date: Date;
usage_date_in_month_year: Date
_id: string
}
const cols : {
    title: string;
    dataIndex: string;
    key: string;
    render?: (...args: any) => any;
  }[] = [{
    title: "Purchase",
    dataIndex: "purchase_date",
    key: "purchase_date",
    render:(purchase_date:string) => {
        return moment(purchase_date).format("dddd Do MMM YYYY")
      
        
    }
  },{
    title: "Type",
    dataIndex: "material_type",
    key: "material_type",
    render:(material_type:string) => {
        return material_type.toLowerCase()
       }
  },{
    title: "Amount",
    dataIndex: "number",
    key: "number"
  }]
export const MaterialList: React.FC<any> = () => {

        const [materials, setMaterials]: [IMaterial[], (...args:any) => any]  = useState([]);
        useEffect(() => {
            SmdashboardService.fetchMaterials().then((ms) => {
                    setMaterials(ms)
            })
        }, [])
        console.log(materials)
        return (
                <div>
                   <Table dataSource={materials} columns={cols}/>
                </div>

        )
}