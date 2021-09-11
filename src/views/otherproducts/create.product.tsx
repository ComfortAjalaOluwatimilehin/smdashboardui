import { Button, Form, Input, InputNumber } from "antd";
import { useForm } from "antd/lib/form/Form";
import { observer } from "mobx-react-lite";
import React from "react";
import { OtherProductStore } from "./store";

export const CreateProduct: React.FC<any> = observer(() => {
  const [form] = useForm();
  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      onFinish={(values) => {
        OtherProductStore.createProduct(values, form);
      }}
    >
      <Form.Item
        name="name"
        label="name"
        rules={[{ type: "string", required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="description"
        rules={[{ type: "string", required: true }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="unitPrice"
        label="price per unit"
        rules={[{ type: "number", required: true, min: 1 }]}
      >
        <InputNumber
          formatter={(value) => `₦${value}`}
          parser={(value: any) => value.replace("₦", "")}
        />
      </Form.Item>
      <Form.Item
        name="numberOfItemsPerUnit"
        label="Number of items per unit"
        initialValue={1}
        rules={[{ type: "number", min: 1 }]}
      >
        <InputNumber min={1}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
});
