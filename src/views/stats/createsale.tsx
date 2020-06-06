import React, { useEffect, useState } from "react";
import {
  Form,
  Card,
  DatePicker,
  InputNumber,
  Select,
  Button,
  message,
} from "antd";
import moment, { Moment } from "moment";
import { SmdashboardService } from "../../service";

const { Option } = Select;

export interface ICreateSale {
  sale_date: number;
  bags_solds: number;
  paid_cash: number;
  price_rate: number;
}
export const CreateSales: React.FC<any> = (props: any) => {
  const [create, setcreate]: [
    ICreateSale,
    (obj: ICreateSale) => any
  ] = useState({
    sale_date: moment().valueOf(),
    bags_solds: 0,
    paid_cash: 0,
    price_rate: 1000 / 10,
  });
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response: string | undefined = await SmdashboardService.createSale({
      ...create,
    });
    if (response) {
      message.error(response);
    } else {
      message.success("Created. Redirecting...");
      props.history.push("/");
    }
  };
  const priceRateOptions = [10, 11, 12, 13, 14].map((item) => ({
    text: `₦1000 per ${item} bags`,
    value: 1000 / item,
  }));
  return (
    <Card>
      <Form onSubmit={handleSubmit} className="createsaless-form">
        <Form.Item label="Date of Sale" required={true}>
          <DatePicker
            disabledDate={(current: Moment | null) => {
              if (current === null) return true;
              return moment(current).isAfter(moment());
            }}
            onChange={(date: Moment | null) => {
              if (!date || date == null) return;
              setcreate({ ...create, sale_date: date.valueOf() });
            }}
          />
        </Form.Item>
        <Form.Item label="Number of Bags Sold">
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            onChange={(value: number | undefined) => {
              if (!value) return;
              setcreate({ ...create, bags_solds: value });
            }}
          />
        </Form.Item>
        <Form.Item label="Price Rate">
          <Select
            defaultValue={1000 / 10}
            style={{ width: "auto" }}
            onChange={(value: number | undefined) => {
              if (!value) return;
              setcreate({ ...create, price_rate: value });
            }}
          >
            {priceRateOptions.map((option) => {
              return <Option value={option.value}>{option.text}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item label="How much cash is with you ?">
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={(value: number | undefined) => {
              if (!value) return;
              setcreate({ ...create, paid_cash: value });
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
