/* eslint-disable react-hooks/exhaustive-deps */
import { WarningOutlined } from "@ant-design/icons";
import
  {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Popconfirm,
    Row
  } from "antd";
import { useForm } from "antd/lib/form/Form";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductListDropDown } from "./productlistdropdown";
import { OtherProductStore } from "./store";
export const Products: React.FC<any> = observer(() => {
  const [productSaleForm] = useForm();
  useEffect(() => {
    void OtherProductStore.getProducts();
  }, []);
  useEffect(() => {
    OtherProductStore.resetProperties();
    if(OtherProductStore.activeProduct){
      productSaleForm.setFieldsValue({soldUnitPrice: OtherProductStore.activeProduct.unitPrice})
    }
  }, [OtherProductStore.activeProduct]);
  return (
    <div>
      <div>
        <div>
          <ProductListDropDown />
        </div>{" "}
        {OtherProductStore.activeProduct && (
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
                      initialValue={OtherProductStore.activeProduct.description}
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
                  onValuesChange={(changedValues, values) => {
                    if (
                      changedValues.hasOwnProperty("amount") ||
                      changedValues.hasOwnProperty("soldUnitPrice")
                    ) {
                      const amount = values.amount;
                      const unitPrice = values.soldUnitPrice;
                      if (amount !== undefined) {
                        const estimatedCosts =
                          (unitPrice ||
                            OtherProductStore.activeProduct?.unitPrice ||
                            0) * amount;
                        productSaleForm.setFieldsValue({
                          cash: estimatedCosts,
                        });
                      }
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
                    <div style={{ textAlign: "right" }}>
                      <Button type="primary" htmlType="submit">
                        Save sale
                      </Button>
                    </div>
                  </div>
                </Form>
              </Col>
              <Col span={2}>
                {" "}
                <Popconfirm
                  title={
                    "Are you sure you want to delete the product and all its records?"
                  }
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
          </div>
        )}
      </div>
    </div>
  );
});
