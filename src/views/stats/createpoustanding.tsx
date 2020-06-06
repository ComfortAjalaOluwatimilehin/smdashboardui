import React, { useState } from "react";
import { Form, Card, DatePicker, InputNumber, Button, message } from "antd";
import moment, { Moment } from "moment";
import { SmdashboardService } from "../../service";

export interface ICreatePaidOutstanding {
  paid_date: number;
  amount_paid: number;
}
export const CreatePaidOutstanding: React.FC<any> = (props: any) => {
  const [create, setcreate]: [
    ICreatePaidOutstanding,
    (obj: ICreatePaidOutstanding) => any
  ] = useState({
    paid_date: moment().valueOf(),
    amount_paid: 0,
  });

  const handleSubmit = async (values: any) => {
    console.log("values", values);
    const res = window.confirm("Are you sure ? Pleae check all inputs");
    if (res === false) return;
    const response:
      | string
      | undefined = await SmdashboardService.createPaidOutstanding({
      ...create,
    });
    if (response) {
      message.error(response);
    } else {
      message.success("Created. Redirecting...");
      props.history.push("/");
    }
  };

  return (
    <Card>
      <Form onFinish={handleSubmit} className="createsaless-form">
        <Form.Item label="Date of Outstanding" required={true}>
          <DatePicker
            disabledDate={(current: Moment | null) => {
              if (current === null) return true;
              return moment(current).isAfter(moment());
            }}
            onChange={(date: Moment | null) => {
              if (!date || date == null) return;
              setcreate({ ...create, paid_date: date.valueOf() });
            }}
          />
        </Form.Item>
        <Form.Item label="How much was paid?">
          <InputNumber
            min={0}
            defaultValue={0}
            onChange={(value: string | number | undefined) => {
              if (!value) return;
              setcreate({ ...create, amount_paid: Number(value) });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
