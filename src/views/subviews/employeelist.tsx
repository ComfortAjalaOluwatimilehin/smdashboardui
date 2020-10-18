import React, { useEffect, useState } from "react"
import {Table, Switch} from "antd"
import { SmdashboardService } from "../../service";

export interface IEmployee{
    address: string
    date_joined: Date;
    full_name: string;
    income: number;
    job_description: string;
    job_title: string;
    notes: string;
    phone_number: string;
    salary_type:string;
    status: boolean;
    __v: number;
    _id:string;
}
const cols : {
    title: string;
    dataIndex: string;
    key: string;
    render?: (...args: any) => any;
  }[] = [{
    title: "Full name",
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    title: "Phone number",
    dataIndex: "phone_number",
    key: "phone_number"
  },
  {
    title: "Active",
    dataIndex: "status",
    key: "status",
    render:(status:boolean) => {
      return <Switch disabled={true} defaultChecked={status} />
    }
  }
]
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