import React, { useEffect, useState } from "react"
import {Table} from "antd"
import { SmdashboardService } from "../../service";
import moment from "moment";
export interface IEmployee{

}
const cols : {
    title: string;
    dataIndex: string;
    key: string;
    render?: (...args: any) => any;
  }[] = []
export const EmployeeList: React.FC<any> = () => {

        const [employees, setEmployees]: [IEmployee[], (...args:any) => any]  = useState([]);
        useEffect(() => {
            SmdashboardService.fetchEmployees().then((empl) => {
                setEmployees(empl)
            })
        }, [])
        console.log(employees)
        return (
                <div>
                   <Table dataSource={employees} columns={cols}/>
                </div>

        )
}