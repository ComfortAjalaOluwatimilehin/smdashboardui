import React, { useState } from "react";
import {
  Form,
  Card,
  DatePicker,
  InputNumber,
  Button,
  Input,
  message,
} from "antd";
import moment, { Moment } from "moment";
import { SmdashboardService } from "../../service";
import { tz } from "moment-timezone";

export interface ICreateEmployee {
    full_name: string;
    address: string;
    phone_number: string;
    job_description: string;
    job_title: string;
    salary_type: string;
    income: number;
    date_joined: Date;
    status: true;
    notes: string;
}
export const CreateEmployee: React.FC<any> = (props: any) => {
  const [buttonIsOnRequest, setButtonIsOnRequest] = useState(false)
  const [create, setcreate]: [
    ICreateEmployee,
    (obj: ICreateEmployee) => any
  ] = useState({
    full_name: "",
    address: "",
    phone_number: "",
    job_description: "",
    job_title: "",
    salary_type: "",
    income: 0,
    date_joined: moment().toDate(),
    status: true,
    notes: "",
  });

  const handleSubmit = async (values: any) => {
    const res = window.confirm("Are you sure ? Pleae check all inputs");
    if (res === false) return;
    setButtonIsOnRequest(true)
    const response: string | undefined = await SmdashboardService.createEmployee(
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
      <Form onFinish={handleSubmit} className="createemployee-form">
      <Form.Item label="Employee Name">
          <Input defaultValue=""  onChange={(e) =>{
            const value = e.target.value
            if(!value) return 
            setcreate({...create, full_name:value})
          }}/>
        </Form.Item>
        <Form.Item label="Employee Address">
          <Input defaultValue=""  onChange={(e) =>{
            const value = e.target.value
            if(!value) return 
            setcreate({...create, address:value})
          }}/>
        </Form.Item>
        <Form.Item label="Employee Phone Number">
          <Input defaultValue=""  onChange={(e) =>{
            const value = e.target.value
            if(!value) return 
            setcreate({...create, phone_number:value})
          }}/>
        </Form.Item>
        <Form.Item label="Employee Job Title">
          <Input defaultValue=""  onChange={(e) =>{
            const value = e.target.value
            if(!value) return 
            setcreate({...create, job_title:value})
          }}/>
        </Form.Item>
        <Form.Item label="Job description">
          <Input.TextArea defaultValue=""  onChange={(e) =>{
            const value = e.target.value
            if(!value) return 
            setcreate({...create, job_description:value})
          }}/>
        </Form.Item>
        <Form.Item label="Date of Employment" required={true}>
          <DatePicker
            onChange={(date: Moment | null) => {
              if (!date || date == null) return;
              setcreate({
                ...create,
                date_joined: tz(
                  date.valueOf(),
                  SmdashboardService.tz
                ).toDate(),
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Income">
          <InputNumber
            min={0}
            defaultValue={0}
            onChange={(value: number | string | undefined | null) => {
              if (!value || value == null) return;
              setcreate({ ...create, income: Number(value) });
            }}
          />
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
