import React, { useEffect, useState } from "react";
import {
  Form,
  Card,
  DatePicker,
  InputNumber,
  Select,
  Button,
  Input,
  message
} from "antd";
import moment, { Moment } from "moment";
import { SmdashboardService } from "../../service";
import { SelectValue } from "antd/lib/select";
import { tz } from "moment-timezone";
const { Option } = Select;

export interface ICreateMaterial {
    material_type: string;
    number: number;
    purchase_date: Date;
    usage_date_in_month_year: Date;
    cost: number;
    description: string;
}
export const CreateMaterial: React.FC<any> = (props: any) => {
  const [buttonIsOnRequest, setButtonIsOnRequest] = useState(false)
  const [create, setcreate]: [
    ICreateMaterial,
    (obj: ICreateMaterial) => any
  ] = useState({
    material_type: "",
    number: 1,
    purchase_date: moment().toDate(),
    usage_date_in_month_year: moment().toDate(),
    cost: 1,
    description: "",
  });
  const [materialTypes, setMaterialTypes]: [
   {type:string, value:string}[],
    (...args: any) => any
  ] = useState([]);
  useEffect(() => {
    SmdashboardService.fetchMaterialTypes().then((types) => {
      if (Array.isArray(types)) {
        setMaterialTypes(types);
      } else {
        message.error("Materials Types are invalid");
      }
    });
  }, []);

  const handleSubmit = async (values: any) => {
    const res = window.confirm("Are you sure ? Pleae check all inputs");
    if (res === false) return;
    setButtonIsOnRequest(true)
    console.log(create)
    const response: string | undefined = await SmdashboardService.createMaterialEntry(
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
      <Form onFinish={handleSubmit} className="create-material-purchase-form">
        <Form.Item label="Date of Purchase" required={true}>
          <DatePicker
            disabledDate={(current: Moment | null) => {
              if (current === null) return true;
              return moment(current).isAfter(moment());
            }}
            onChange={(date: Moment | null) => {
              if (!date || date == null) return;
              setcreate({
                ...create,
                purchase_date: tz(
                  date.valueOf(),
                  SmdashboardService.tz
                ).toDate(),
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Month of Usage" required={true}>
          <DatePicker
            picker="month"
            onChange={(date: Moment | null) => {
              if (!date || date == null) return;
              setcreate({
                ...create,
                usage_date_in_month_year: tz(
                  date.valueOf(),
                  SmdashboardService.tz
                ).toDate(),
              });
            }}
          />
        </Form.Item>
        {materialTypes && materialTypes.length > 0 && (
          <Form.Item label="Type of Material">
            <Select
              style={{ minWidth: "100px" }}
              onChange={(value: SelectValue) => {
                if (!value) return;
                setcreate({ ...create, material_type: value + "" });
              }}
            >
              {materialTypes.map((option: {type:string, value:string}) => {
                return <Option value={option.type}>{option.value.toLowerCase()}</Option>;
              })}
            </Select>
          </Form.Item>
        )}
        <Form.Item label="Number of Material ?">
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={(value: any) => {
              if (!value || value == null) return;
              setcreate({ ...create, number: Number(value) });
            }}
          />
        </Form.Item>
        <Form.Item label="Cost ?">
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={(value: any) => {
              if (!value || value == null) return;
              setcreate({ ...create, cost: Number(value) });
            }}
          />
        </Form.Item>
        <Form.Item label="Extra Information?">
          <Input.TextArea rows={4} defaultValue=""  onChange={(e) =>{
            const value = e.target.value
            if(!value) return 
            setcreate({...create, description:value})
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
