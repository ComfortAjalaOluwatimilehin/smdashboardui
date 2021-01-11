import React, { useEffect, useState } from "react"
import {Table} from "antd"
import { SmdashboardService } from "../../service";

export interface IContact{
    full_name: string;
    address: string;
    phone_number: string;
    notes: string;
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
    title: "notes",
    dataIndex: "notes",
    key: "notes"
  }
]
export const ContactList: React.FC<any> = () => {

        const [contacts, setContacts]: [IContact[], (...args:any) => any]  = useState([]);
        useEffect(() => {
            SmdashboardService.fetchContacts().then((con) => {
                setContacts(con)
            })
        }, [])

        return (
                <div>
                   <Table dataSource={contacts} columns={cols}/>
                </div>

        )
}