import React, { useEffect, useState } from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Select,
  Alert,
  Typography,
  InputNumber,
  Tag
} from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { OrderStore } from "./store";
import { useObservable, observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { ICustomer } from "../../interfaces/customer";
import { RouteComponentProps } from "react-router";
import { AllCustomers } from "../customers";
import { IProduct } from "../../interfaces/product";
const { Option } = Select;
interface ICreateOrders extends RouteComponentProps, FormComponentProps {}

const CreateOrders: React.FC<ICreateOrders> = observer((props: any) => {
  const store = useObservable(OrderStore);
  const [currentquantity, setquantity] = useState(1);
  let {
    hascustomerid,
    customers,
    prefixSelector,
    hasAccess,
    products,
    orderproducts
  } = store;
  hascustomerid = toJS(hascustomerid);
  customers = toJS(customers);
  prefixSelector = toJS(prefixSelector);
  hasAccess = toJS(hasAccess);
  products = toJS(products);
  orderproducts = toJS(orderproducts);
  useEffect(() => {
    store.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAccess, hascustomerid, AllCustomers]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        // console.log(orderproducts);
        store.createorder({
          address: values.address,
          full_name: values.full_name,
          phone_number: values.phone_number
        });
      }
    });
  };
  const { getFieldDecorator } = props.form;

  return (
    <>
      {hasAccess ? (
        <Form onSubmit={handleSubmit} className="login-form">
          <Button
            onClick={() => {
              if (customers.length > 0) {
                store.togglehascustomerid();
              }
            }}
          >
            {hascustomerid && customers.length > 0
              ? "New Customer?"
              : "Old Customer?"}
          </Button>
          {hascustomerid && customers.length > 0 ? (
            <>
              <Typography.Title level={2}>Select Customer</Typography.Title>
              <Form.Item>
                <Select defaultValue={customers[0].id}>
                  {customers.map((customer: ICustomer) => {
                    return (
                      <Option value={customer.id}>{customer.full_name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </>
          ) : (
            <>
              <Typography.Title level={2}>
                New Customer Details
              </Typography.Title>
              <Form.Item>
                {getFieldDecorator("full_name", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your full name !",
                      min: 1,
                      max: 100,
                      type: "string"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="text" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Full Name"
                  />
                )}
              </Form.Item>
              <Form.Item label="Phone Number">
                {getFieldDecorator("phone_number", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your phone number!"
                    }
                  ]
                })(
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("address", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your Delivery address !",
                      min: 1,
                      max: 100,
                      type: "string"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="text" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Delivery address"
                  />
                )}
              </Form.Item>
            </>
          )}
          <Typography.Title level={2}> Order Details </Typography.Title>
          <div>
            <Form.Item>
              {products && products.length > 0 && (
                <>
                  <InputNumber
                    min={1}
                    max={5000}
                    defaultValue={1}
                    value={currentquantity}
                    placeholder="How many"
                    onChange={(value: number | undefined) => {
                      if (!value) return;
                      setquantity(value);
                    }}
                  />
                  <Select
                    defaultValue={products[0]._id}
                    onSelect={(value: string) => {
                      store.handleorderproducts(value, currentquantity);
                      setquantity(1);
                    }}
                  >
                    {products.map((product: IProduct, index: number) => {
                      return (
                        <Option value={product._id} key={product._id}>
                          {product.product_name}
                        </Option>
                      );
                    })}
                  </Select>
                </>
              )}

              {orderproducts &&
                orderproducts.length > 0 &&
                orderproducts.map((orderproduct, index) => {
                  return (
                    <Tag key={`orderproduct${orderproduct.product_id}`}>
                      {orderproduct.name}
                      {": "}
                      {orderproduct.quantity}{" "}
                      <Icon
                        type="close"
                        onClick={() => {
                          store.removeorderproductbyposition(index);
                        }}
                      />
                    </Tag>
                  );
                })}
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Save Order
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Alert message="You have no access" type="warning" />
      )}
    </>
  );
});
export const WrappedNormalCreateOrdersForm = Form.create<ICreateOrders>({
  name: "normal_create_order"
})(CreateOrders);
