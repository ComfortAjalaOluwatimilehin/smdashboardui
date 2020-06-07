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
import { SelectValue } from "antd/lib/select";
import { tz } from "moment-timezone";
const { Option } = Select;

export interface ICreateExpense {
  expense_date: number;
  type: string;
  amount: number;
}
export const CreateExpenses: React.FC<any> = (props: any) => {
  const [create, setcreate]: [
    ICreateExpense,
    (obj: ICreateExpense) => any
  ] = useState({
    expense_date: moment().valueOf(),
    type: "",
    amount: 0,
  });
  const [expenseTypes, setexpenseTypes]: [
    string[],
    (...args: any) => any
  ] = useState([]);
  useEffect(() => {
    SmdashboardService.fetchExpenseTypes().then((types) => {
      if (Array.isArray(types)) {
        setexpenseTypes(types);
      } else {
        message.error("Expense Types are invalid");
      }
    });
  }, []);

  const handleSubmit = async (values: any) => {
    console.log("values", values);
    const res = window.confirm("Are you sure ? Pleae check all inputs");
    if (res === false) return;
    const response: string | undefined = await SmdashboardService.createExpense(
      {
        ...create,
      }
    );
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
        <Form.Item label="Date of Expense" required={true}>
          <DatePicker
            disabledDate={(current: Moment | null) => {
              if (current === null) return true;
              return moment(current).isAfter(moment());
            }}
            onChange={(date: Moment | null) => {
              if (!date || date == null) return;
              setcreate({
                ...create,
                expense_date: tz(
                  date.valueOf(),
                  SmdashboardService.tz
                ).valueOf(),
              });
            }}
          />
        </Form.Item>

        {expenseTypes && expenseTypes.length > 0 && (
          <Form.Item label="Type of Expense">
            <Select
              style={{ minWidth: "100px" }}
              onChange={(value: SelectValue) => {
                if (!value) return;
                setcreate({ ...create, type: value + "" });
              }}
            >
              {expenseTypes.map((option: string) => {
                return <Option value={option}>{option}</Option>;
              })}
            </Select>
          </Form.Item>
        )}
        <Form.Item label="How much?">
          <InputNumber
            min={0}
            defaultValue={0}
            onChange={(value: string | number | undefined) => {
              if (!value) return;
              setcreate({ ...create, amount: Number(value) });
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
