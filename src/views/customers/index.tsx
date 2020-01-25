import React from "react"
import {RouteComponentProps} from "react-router-dom"

interface IAllCustomersProps extends RouteComponentProps  {
    token:string
}
export const AllCustomers : React.FC<IAllCustomersProps> =  ({token, ...otherprops}) => {
    console.log("token", token)
    return (
        <>
            Hello All Customers
        </>
    )
}