import React from "react";
import { Form, Input, Button, Col, Typography } from "antd";
import Icon from "@ant-design/icons";
interface ILoginProps {
  handlelogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => any;
}
const NormalLoginForm: React.FC<ILoginProps> = (props: any) => {
  const onFinish = (values: any) => {
    props.handlelogin({ ...values });
  };
  return (
    <Col style={{ maxWidth: "500px", flex: 1 }}>
      <Typography.Title
        style={{ textAlign: "center", textDecoration: "underline" }}
        level={3}
      >
        Login to TQ Sales Management Dashboard
      </Typography.Title>
      <Form onFinish={onFinish} className="login-form">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<Icon type="email" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export const WrappedNormalLoginForm = NormalLoginForm;
