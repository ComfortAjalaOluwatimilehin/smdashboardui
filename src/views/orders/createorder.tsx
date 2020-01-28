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
  List,
  DatePicker,
  Tooltip,
  Card,
  Switch
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
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 }
    }
  };
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
    <Card>
      {info && <Alert message={info.text} type={info.type} />}
      {hasAccess ? (
        <Form
          onSubmit={handleSubmit}
          className="login-form"
          {...formItemLayout}
        >
          <Tooltip
            title={
              hascustomerid && customers.length > 0
                ? "If new customer, click here to type in details"
                : "If customer is already registered, click here"
            }
          >
            <Switch
              onChange={() => {
                if (customers.length > 0) {
                  if (hascustomerid === false) {
                    setcurrentcustomer(undefined);
                  }
                  store.togglehascustomerid();
                }
              }}
            >
              {hascustomerid && customers.length > 0
                ? "New Customer"
                : "Registered Customer"}
            </Switch>
            <Icon type="info-circle" style={{ marginLeft: "10px" }} />
          </Tooltip>
          {hascustomerid && customers.length > 0 ? (
            <>
              <Typography.Title level={2}>
                Select Registered Customer
              </Typography.Title>
              <Form.Item
                label={
                  <span>
                    Customer
                    <Tooltip title="Select from the list of customers, who have been registered. Do not forget to select the shipment address below">
                      <Icon type="info-circle" />
                    </Tooltip>
                  </span>
                }
                {...formItemLayout}
              >
                {getFieldDecorator("customer_id", {
                  rules: [
                    {
                      required: true,
                      message: "Please select customer !"
                    }
                  ]
                })(
                  <Select
                    placeholder={"Select a customer"}
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
              <Form.Item
                label={
                  <span>
                    Customer's Full Name
                    <Tooltip title="Type in the first name and last name">
                      <Icon type="info-circle" />
                    </Tooltip>
                  </span>
                }
                {...formItemLayout}
              >
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
                    placeholder="Type in new customer' full name"
                  />
                )}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Phone Number{" "}
                    <Tooltip title="After the phone call, please type in the phone number of the customer">
                      <Icon type="info-circle" />
                    </Tooltip>
                  </span>
                }
                {...formItemLayout}
              >
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
                    placeholder="Type in new customer's phone number"
                  />
                )}
              </Form.Item>
            </>
          )}
          <Form.Item
            label={
              <span>
                Delivery Date
                <Tooltip title="Click below to select the date of delivery. If a desired time is provided, please type it in the manager's note field below">
                  <Icon type="info-circle" />
                </Tooltip>
              </span>
            }
            {...formItemLayout}
          >
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
            <Form.Item
              label={
                <span>
                  Select from available customer addresses
                  <Tooltip title="Confirm if the expected delivery address is already in the options.If not, type in the new address below.">
                    <Icon type="info-circle" />
                  </Tooltip>
                </span>
              }
              {...formItemLayout}
            >
              <Select
                placeholder={"Please select the delivery address"}
                onSelect={(newad: any) => {
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
          <Form.Item
            label={
              <span>
                Add new Address
                <Tooltip
                  title={
                    hascustomerid && customers.length > 0
                      ? "Add a new (delivery) address of an already registered customer"
                      : "Type in the address of the new customer."
                  }
                >
                  <Icon type="info-circle" />
                </Tooltip>
              </span>
            }
            {...formItemLayout}
          >
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

          {products && products.length > 0 && (
            <>
              <Typography.Title level={2}> Order Details </Typography.Title>
              <Form.Item
                {...formItemLayout}
                label={
                  <span>
                    Quantity
                    <Tooltip title="Type in or select quantity of desired item. Then select the desired item. Minium = 1, maximum = 1000">
                      <Icon type="info-circle" />
                    </Tooltip>
                  </span>
                }
              >
                <InputNumber
                  min={1}
                  max={1000}
                  defaultValue={1}
                  value={currentquantity}
                  placeholder="Select quantity"
                  onChange={(value: number | undefined) => {
                    if (!value) return;
                    setquantity(value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={
                  <span>
                    Product Item
                    <Tooltip title="Select desired product. The corresponding quantity should have already been set above">
                      <Icon type="info-circle" />
                    </Tooltip>
                  </span>
                }
              >
                <Select
                  placeholder={"Select desired item"}
                  onSelect={(value: any) => {
                    if (!value) return;
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
              </Form.Item>
            </>
          )}
          <Form.Item
            {...formItemLayout}
            label={
              <span>
                Product Item
                <Tooltip title="List of Selected Product Items">
                  <Icon type="info-circle" />
                </Tooltip>
              </span>
            }
          >
            <List bordered>
              {orderproducts &&
                orderproducts.length > 0 &&
                orderproducts.map((orderproduct, index) => {
                  return (
                    <List.Item key={`orderproduct${orderproduct.product_id}`}>
                      <p style={{ marginRight: "10px" }}>
                        <b>Quantity: </b>

                        <span>{orderproduct.quantity}</span>
                        {"  "}
                      </p>
                      <p style={{ marginRight: "10px" }}>
                        <b>Product Item: </b>

                        <span>{orderproduct.name}</span>
                        {"  "}
                      </p>
                      <p style={{ marginRight: "10px" }}>
                        <Icon
                          style={{ marginLeft: "10px" }}
                          type="close-circle"
                          onClick={() => {
                            store.removeorderproductbyposition(index);
                          }}
                        />
                      </p>
                    </List.Item>
                  );
                })}
            </List>
          </Form.Item>
          <Form.Item
            label={<span>Add a note, if necessary</span>}
            {...formItemLayout}
          >
            {getFieldDecorator("manager_note", {
              rules: [
                {
                  min: 1,
                  max: 100,
                  type: "string"
                }
              ]
            })(<Input.TextArea placeholder="Order Note" />)}
          </Form.Item>

          <Form.Item {...formItemLayout}>
            <Button
              type="primary"
              size="large"
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
    </Card>
  );
});
export const WrappedNormalCreateOrdersForm = Form.create<ICreateOrders>({
  name: "normal_create_order"
})(CreateOrders);
