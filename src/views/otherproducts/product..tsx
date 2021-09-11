/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteFilled, WarningOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Select,
  Form,
  InputNumber,
  Col,
  Row,
  DatePicker,
  Popconfirm,
  message,
  Spin,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { useEffect } from "react";
import { ProductStats } from "./stats";
import { OtherProductStore } from "./store";
import { v4 as uuidv4 } from "uuid";
export const Products: React.FC<any> = observer(() => {
  const [productSaleForm] = useForm();
  useEffect(() => {
    OtherProductStore.resetProperties();
    void OtherProductStore.getProducts();
  }, []);

  return (
    <div>
      {OtherProductStore.products.length > 0 && (
        <div>
          <div>
            {OtherProductStore.products.length > 0 && (
              <Select
                placeholder="select product"
                onSelect={(productId: any) => {
                  OtherProductStore.activeProduct = null;
                  setTimeout(() => {
                    console.log("product id set");
                    OtherProductStore.setActiveProductById(productId);
                  }, 1000);
                }}
                style={{ minWidth: "200px" }}
                defaultActiveFirstOption={true}
                options={OtherProductStore.products.map((product) => {
                  return {
                    value: product._id,
                    label: product.product_name || product.name,
                  };
                })}
              ></Select>
            )}
          </div>{" "}
          {OtherProductStore.activeProduct ? (
            <div>
              <Row>
                {" "}
                <Col span={10}>
                  <Form
                    key={uuidv4()}
                    colon={false}
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 10 }}
                    name="product_edit_form"
                    onFinish={(values) => {
                      void OtherProductStore.updateProduct(
                        OtherProductStore.activeProductId,
                        values
                      );
                    }}
                  >
                    <div style={{ marginTop: "10px" }}>
                      <Form.Item
                        name="name"
                        label="name"
                        initialValue={OtherProductStore.activeProductName}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="description"
                        label="description"
                        initialValue={
                          OtherProductStore.activeProduct.description
                        }
                      >
                        <Input.TextArea rows={4} />
                      </Form.Item>
                      <Form.Item
                        label="price per unit"
                        name="unitPrice"
                        initialValue={OtherProductStore.activeProductUnitPrice}
                        rules={[
                          {
                            min: 0,
                            type: "number",
                          },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          formatter={(value) => `₦${value}`}
                          parser={(value: any) => value.replace("₦", "")}
                        />
                      </Form.Item>{" "}
                      <Form.Item
                        name="numberOfItemsPerUnit"
                        label="Number of items per unit"
                        initialValue={
                          OtherProductStore.activeProduct.numberOfItemsPerUnit
                        }
                        rules={[{ type: "number", min: 1 }]}
                      >
                        <InputNumber min={1} />
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType="submit">Update</Button>
                      </Form.Item>
                    </div>
                  </Form>
                </Col>
                <Col span={10}>
                  <Form
                    colon={false}
                    form={productSaleForm}
                    key={uuidv4()}
                    name="product_sale_form"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 10 }}
                    onFinish={(values) => {
                      OtherProductStore.createProductSale(
                        values,
                        productSaleForm
                      );
                    }}
                    onValuesChange={(changedValues) => {
                      const amount = changedValues.amount;
                      if (amount !== undefined) {
                        const estimatedCosts =
                          (OtherProductStore.activeProduct?.unitPrice || 0) *
                          amount;
                        productSaleForm.setFieldsValue({
                          cash: estimatedCosts,
                        });
                      }
                    }}
                  >
                    <div style={{ marginTop: "10px" }}>
                      <Form.Item
                        label="today"
                        name="createdDate"
                        required
                        initialValue={moment()}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <DatePicker picker={"date"} disabled />
                      </Form.Item>
                      <Form.Item
                        label="date sold"
                        name="soldDate"
                        initialValue={moment()}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <DatePicker
                          picker={"date"}
                          disabledDate={(date) => {
                            return date.isAfter(moment(), "date");
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label={"number sold"}
                        name="amount"
                        rules={[
                          {
                            min: 1,
                            type: "number",
                            required: true,
                          },
                        ]}
                      >
                        <InputNumber min={1} />
                      </Form.Item>

                      <Form.Item
                        label="price per unit"
                        name="soldUnitPrice"
                        initialValue={OtherProductStore.activeProduct.unitPrice}
                        rules={[
                          {
                            min: 1,
                            type: "number",
                            required: true,
                          },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          formatter={(value) => `₦${value}`}
                          parser={(value: any) => value.replace("₦", "")}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Cash paid"
                        name="cash"
                        rules={[
                          {
                            min: 1,
                            type: "number",
                            required: true,
                          },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          formatter={(value) => `₦${value}`}
                          parser={(value: any) => value.replace("₦", "")}
                        />
                      </Form.Item>
                      <Form.Item
                        label="product id"
                        name="productId"
                        initialValue={OtherProductStore.activeProductId}
                        required
                      >
                        <Input disabled />
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType="submit">Save sale</Button>
                      </Form.Item>
                    </div>
                  </Form>
                </Col>
                <Col span={2}>
                  {" "}
                  <Popconfirm
                    title={"Are you sure?"}
                    onCancel={() => {
                      message.info("Product not deleted");
                    }}
                    onConfirm={() => {
                      OtherProductStore.deleteProduct(
                        OtherProductStore.activeProductId
                      );
                    }}
                  >
                    <Button
                      shape="circle"
                      danger
                      icon={<WarningOutlined />}
                    ></Button>
                  </Popconfirm>{" "}
                 
                </Col>
              </Row>
              <ProductStats activeProduct={OtherProductStore.activeProduct} />
            </div>
          ) : (
            <Spin />
          )}
        </div>
      )}
    </div>
  );
});
