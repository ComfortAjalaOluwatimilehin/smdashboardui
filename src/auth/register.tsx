import React, { useState } from "react";

import { Form, Input, Tooltip, Row, Col, Button } from "antd";
import Icon from "@ant-design/icons";
const NormalRegister: React.FC<any> = (props: any) => {
  const [confirmDirty, setconfirmDirty] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const handleConfirmBlur = (e: any) => {
    const { value }: { value: boolean } = e.target;
    const newvalue = confirmDirty || !!value;
    setconfirmDirty(newvalue);
  };

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule: any, value: any, callback: any) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"]);
    }
    callback();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <Form {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        hasFeedback
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            validator: validateToNextPassword,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        hasFeedback
        name="confirm"
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          {
            validator: compareToFirstPassword,
          },
        ]}
      >
        <Input.Password onBlur={handleConfirmBlur} />
      </Form.Item>
      <Form.Item
        name="nickname"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
        label={
          <span>
            Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Captcha"
        name="captcha"
        extra="We must make sure that your are a human."
        rules={[
          {
            required: true,
            message: "Please input the captcha you got!",
          },
        ]}
      >
        <Row gutter={8}>
          <Col span={12}>
            <Input />
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export const WrappedRegister = NormalRegister;
