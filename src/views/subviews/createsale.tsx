import React, { useEffect, useState } from "react";
import {
  Form,
  Card,
  DatePicker,
  InputNumber,
  Select,
  Button,
  message,Alert 
} from "antd";
import moment, { Moment } from "moment";
import { SmdashboardService } from "../../service";
import { tz } from "moment-timezone";
const { Option } = Select;

export interface ICreateSale {
  sale_date: number;
  bags_solds: number;
  paid_cash: number;
  price_rate: number;
}
export const CreateSales: React.FC<any> = (props: any) => {
  const [buttonIsOnRequest, setButtonIsOnRequest] = useState(false)
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

  const handleSubmit = async (values: any) => {
    const res = window.confirm("Are you sure ? Pleae check all inputs");
    if (res === false) return;
    setButtonIsOnRequest(true)
    const response: string | undefined = await SmdashboardService.createSale({
      ...create,
    });
    if (response) {
      message.error(response);
    } else {
      message.success("Created.");
    }
    setButtonIsOnRequest(false)
  };
  const priceRateOptions = [10, 11, 12, 13, 14].map((item) => ({
    text: `₦1000 per ${item} bags`,
    value: 1000 / item,
  }));
  return (
    <Card>
      <Form onFinish={handleSubmit} className="createsaless-form">
        <Form.Item label="Date of Sale" required={true}>
          <DatePicker
            disabledDate={(current: Moment | null) => {
              if (current === null) return true;
              return moment(current).isAfter(moment());
            }}
            onChange={(date: Moment | null) => {
              if (!date || date == null) return;
              setcreate({
                ...create,
                sale_date: tz(date.valueOf(), SmdashboardService.tz).valueOf(),
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Number of Bags Sold">
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={(value: string | number | undefined) => {
              if (!value) return;
              setcreate({ ...create, bags_solds: Number(value) });
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
        <Form.Item>
          <Alert  type="info" message={`Expected Cash`} description= {`${(create.bags_solds * create.price_rate).toFixed(2)}`}/>
          <small>Difference: <b>{create.paid_cash - (create.bags_solds * create.price_rate)}</b></small>
        </Form.Item>
        <Form.Item label="How much cash is with you ?">
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={(value: string | number | undefined) => {
              if (!value) return;
              setcreate({ ...create, paid_cash: Number(value) });
            }}
          />
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
