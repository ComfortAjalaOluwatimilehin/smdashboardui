import React, { useState } from "react";
import {
  Form,
  Card,
  Button,
  Input,
  message,
} from "antd";
import { SmdashboardService } from "../../service";

export interface ICreateContact {
   c
}
export const CreateContact: React.FC<any> = (props: any) => {
  const [buttonIsOnRequest, setButtonIsOnRequest] = useState(false)
  const [create, setcreate]: [
    ICreateContact,
    (obj: ICreateContact) => any
  ] = useState({
    full_name: "",
    address: "",
    phone_number: "",
    notes: "",
  });

  const handleSubmit = async (values: any) => {
    const res = window.confirm("Are you sure ? Pleae check all inputs");
    if (res === false) return;
    setButtonIsOnRequest(true)
    const response: string | undefined = await SmdashboardService.createContact(
      {
        ...create,
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
      <Form onFinish={handleSubmit} className="createcontact-form">
      <Form.Item label="Contact Name">
          <Input defaultValue=""  onChange={(e) =>{
            const value = e.target.value
            if(!value) return 
            setcreate({...create, full_name:value})
          }}/>
        </Form.Item>
        <Form.Item label="Contact Address">
          <Input defaultValue=""  onChange={(e) =>{
            const value = e.target.value
            if(!value) return 
            setcreate({...create, address:value})
          }}/>
        </Form.Item>
        <Form.Item label="Contact Phone Number">
          <Input defaultValue=""  onChange={(e) =>{
            const value = e.target.value
            if(!value) return 
            setcreate({...create, phone_number:value})
          }}/>
        </Form.Item>
        <Form.Item label="Extra Information?">
          <Input.TextArea rows={4} defaultValue=""  onChange={(e) =>{
            const value = e.target.value
            if(!value) return 
            setcreate({...create, notes:value})
          }}/>
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
