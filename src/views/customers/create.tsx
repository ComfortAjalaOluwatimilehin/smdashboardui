import React, { useState } from "react";
import {
  Form,
  Card,
  Button,
  Input,
  message,
} from "antd";
import { SmdashboardService } from "../../service";

export interface ICreateCustomer {
    fullName: string;
    phoneNumber: number;
    email: string;
    date_created: Date;
    addresses: string
}
export const CreateCustomer: React.FC<any> = (props: any) => {
  const [buttonIsOnRequest, setButtonIsOnRequest] = useState(false)
  

  const handleSubmit = async (values: any) => {
    const res = window.confirm("Are you sure ? Pleae check all inputs");
    if (res === false) return;
    setButtonIsOnRequest(true)
    const response: string | undefined = await SmdashboardService.createCustomer(
      {
        ...values,
      }
    );
    if (response) {
      message.error(response);
    } else {
      message.success("Created.");
      
    }
    setButtonIsOnRequest(false)
  };

  return (
    <Card>
      <Form onFinish={handleSubmit} className="createCustomer-form">
      <Form.Item label="Customer Name" name={"fullName"} rules={[{required:true}]}>
          <Input/>
        </Form.Item>
        <Form.Item label="Customer Address" name={"addresses"} rules={[{required:true}]}>
          <Input   />
        </Form.Item>
        <Form.Item label="Customer Phone Number" name={"phoneNumber"} rules={[{required:true}]}>
          <Input   />
        </Form.Item>
        <Form.Item label="Customer Email" name={"email"} rules={[{required:false}]}>
          <Input   />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={buttonIsOnRequest ? true : undefined}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
