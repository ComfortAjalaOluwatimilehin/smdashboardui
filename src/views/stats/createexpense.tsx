import React, { useEffect, useState } from "react";
import {
  Form,
  Card,
  DatePicker,
  InputNumber,
  Select,
  Button,
  Input,
  message,
} from "antd";
import moment, { Moment } from "moment";
import { SmdashboardService, IExpenseType } from "../../service";
import { SelectValue } from "antd/lib/select";
import { tz } from "moment-timezone";
const { Option } = Select;

export interface ICreateExpense {
  expense_date: number;
  type: string;
  amount: number;
  manager_note?:string
}
export const CreateExpenses: React.FC<any> = (props: any) => {
  const [buttonIsOnRequest, setButtonIsOnRequest] = useState(false)
  const [create, setcreate]: [
    ICreateExpense,
    (obj: ICreateExpense) => any
  ] = useState({
    expense_date: moment().valueOf(),
    type: "",
    amount: 0,
  });
  const [expenseTypes, setexpenseTypes]: [
   IExpenseType[],
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
    const res = window.confirm("Are you sure ? Pleae check all inputs");
    if (res === false) return;
    setButtonIsOnRequest(true)
    const response: string | undefined = await SmdashboardService.createExpense(
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
              {expenseTypes.map((option: IExpenseType) => {
                return <Option value={option.type}>{option.type}</Option>;
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
        <Form.Item label="Extra Information?">
          <Input.TextArea rows={4} defaultValue=""  onChange={(e) =>{
            const value = e.target.value
            if(!value) return 
            setcreate({...create, manager_note:value})
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
