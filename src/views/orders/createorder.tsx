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
  Tag,
  DatePicker,
  Tooltip
} from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { useObservable, observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { ICustomer } from "../../interfaces/customer";
import { RouteComponentProps } from "react-router";
import { IProduct } from "../../interfaces/product";
import { CreateOrderStore } from "./createorder.store";
const { Option } = Select;
interface ICreateOrders extends RouteComponentProps, FormComponentProps {}

const CreateOrders: React.FC<ICreateOrders> = observer((props: any) => {
  const store = useObservable(CreateOrderStore);
  const [currentquantity, setquantity] = useState(1);
  const [currentcustomer, setcurrentcustomer]: [
    undefined | ICustomer,
    any
  ] = useState();
  let {
    hascustomerid,
    customers,
    prefixSelector,
    hasAccess,
    products,
    orderproducts,
    info
  } = store;
  hascustomerid = toJS(hascustomerid);
  customers = toJS(customers);
  prefixSelector = toJS(prefixSelector);
  hasAccess = toJS(hasAccess);
  products = toJS(products);
  orderproducts = toJS(orderproducts);
  info = toJS(info);
  useEffect(() => {
    store.init();
    store.unsetinfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        // console.log(orderproducts);
        const order: any =
          "customer_id" in values
            ? {
                customer_id: values.customer_id
              }
            : {
                full_name: values.full_name,
                phone_number: values.phone_number
              };
        order["newaddress"] = values.newaddress;
        order["delivery_date"] = values.delivery_date;
        store.createorder({ ...values, ...order });
      }
    });
  };
  const { getFieldDecorator } = props.form;

  return (
    <>
      {info && <Alert message={info.text} type={info.type} />}
      {hasAccess ? (
        <Form onSubmit={handleSubmit} className="login-form">
          <Button
            onClick={() => {
              if (customers.length > 0) {
                if (hascustomerid === false) {
                  setcurrentcustomer(undefined);
                }
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
              <Form.Item label="Customer">
                {getFieldDecorator("customer_id", {
                  rules: [
                    {
                      required: true,
                      message: "Please select customer !"
                    }
                  ]
                })(
                  <Select
                    onSelect={(newcustomerid: any) => {
                      if (!newcustomerid) return;
                      const matches = customers.filter(
                        customer => customer._id === newcustomerid
                      );
                      if (matches && matches.length > 0) {
                        const record = matches[0];
                        setcurrentcustomer(record);
                      }
                    }}
                  >
                    {customers.map((customer: ICustomer) => {
                      return (
                        <Option value={customer._id} key={customer._id}>
                          {customer.full_name}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </>
          ) : (
            <>
              <Typography.Title level={2}>
                New Customer Details
              </Typography.Title>
              <Form.Item label="Customer's Full Name">
                <Tooltip title="Type in the first name and last name">
                  <Icon type="info-circle" />
                </Tooltip>
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
            </>
          )}
          <Form.Item label="Delivery Date">
            <Tooltip title="Click on the field below to select the day all orders are to be delivered">
              <Icon type="info-circle" />
            </Tooltip>
            {getFieldDecorator("delivery_date", {
              rules: [
                {
                  type: "object",
                  required: true,
                  message: "Please select time!"
                }
              ]
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </Form.Item>
          {currentcustomer && (
            <Form.Item label="Select from available customer addresses">
              <Select
                defaultValue={currentcustomer.addresses[0]}
                onSelect={(newad: string) => {
                  if (!newad) return;
                  props.form.setFieldsValue({ newaddress: newad });
                }}
              >
                {[...currentcustomer.addresses].map((ad: string) => {
                  return (
                    <Option value={ad} key={ad}>
                      {ad}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
          <Form.Item label={"Add new Address"}>
            {getFieldDecorator("newaddress", {
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
                    {products.map((product: IProduct) => {
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
            <Form.Item label={"Add a note, if necessary"}>
              {getFieldDecorator("manager_note", {
                rules: [
                  {
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
                  placeholder="Order Note"
                />
              )}
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
