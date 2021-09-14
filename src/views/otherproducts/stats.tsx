/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteFilled, FileExcelFilled } from "@ant-design/icons";
import {
  Card,
  Row,
  Col,
  DatePicker,
  Radio,
  Button,
  message,
  Popconfirm,
  Table,
} from "antd";
import {
  Chart,
  Tooltip,
  Interaction,
  Line,
  Point,
  View,
  Axis,
} from "bizcharts";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { useEffect } from "react";
import { IProduct, OtherProductStore } from "./store";

export const ProductStats: React.FC<{ activeProduct: IProduct | null }> =
  observer(({ activeProduct }) => {
    useEffect(() => {
      OtherProductStore.activeProduct = activeProduct;
      void OtherProductStore.getProductStats();
    }, [
      OtherProductStore.currentDateFilter,
      OtherProductStore.currentTimeStamp,
      activeProduct,
    ]);
    const scale: any = {
      cash: {
        formatter: (str: number) => `₦ ${str.toLocaleString("en")}`,
        min: OtherProductStore.minMaxCosts.min,
        max: OtherProductStore.minMaxCosts.max,
      },
      expenses: {
        formatter: (str: number) => `₦ ${str.toLocaleString("en")}`,
        min: OtherProductStore.minMaxCosts.min,
        max: OtherProductStore.minMaxCosts.max,
      },
    };
    return (
      <div style={{ marginTop: "10px" }}>
        <Card style={{ width: "100%", minHeight: "500px" }}>
          <Row style={{ marginBottom: "50px" }}>
            <Col span={8} style={{minWidth:"300px"}}>
              <DatePicker
                picker={"date"}
                disabledDate={(date) => {
                  return date.isAfter(moment(), "date");
                }}
                onChange={(value) => {
                  if (value) {
                    OtherProductStore.currentTimeStamp = value;
                  }
                }}
              />
            </Col>
            <Col span={8}>
              <Radio.Group
                buttonStyle="solid"
                optionType="button"
                defaultValue={OtherProductStore.currentDateFilter}
                onChange={(e) => {
                  OtherProductStore.currentDateFilter = e.target.value;
                }}
                options={["year", "month", "day"].map((value: string) => ({
                  value,
                  label: value,
                }))}
              />
            </Col>
            <Col span={8} style={{ textAlign: "right", minWidth:"300px" }}>
              {OtherProductStore.currentTimeStamp && (
                <>
                  <Popconfirm
                    title={
                      "Are you sure you want to delete data for selected date ?"
                    }
                    onCancel={() => {
                      message.info("Product stats not deleted");
                    }}
                    onConfirm={() => {
                      OtherProductStore.deleteProductStatsForSelectedDate(
                        OtherProductStore.activeProduct
                          ? OtherProductStore.activeProduct._id
                          : "undefined"
                      );
                    }}
                  >
                    <Button
                      shape="circle"
                      danger
                      icon={<DeleteFilled />}
                    ></Button>
                  </Popconfirm>
                  <Button
                    style={{ marginLeft: "5px", background: "#d3ffbd" }}
                    loading={OtherProductStore.isExporting}
                    onClick={() => {
                      OtherProductStore.exportDataAsCSV();
                    }}
                    icon={<FileExcelFilled />}
                  >
                    Export as CSV
                  </Button>
                </>
              )}
            </Col>
          </Row>
          <Chart
            autoFit
            padding="auto"
            height={400}
            data={toJS(OtherProductStore.activeProductStats)}
            scale={scale}
          >
            <View
              data={toJS(OtherProductStore.activeProductStats)}
              scale={scale}
              padding={0}
            >
              <Axis name="expenses" position="right" grid={null} />
              <Line color="red" position="dateAsString*expenses" />
            </View>
            <Point
              position="dateAsString*cash"
              color="productName"
              shape="circle"
            />
            <Line
              shape="smooth"
              position="dateAsString*cash"
              color="productName"
              adjust={[
                {
                  type: "dodge",
                  marginRatio: 0,
                },
              ]}
            />
            <Tooltip shared />
            <Interaction type="active-region" />
          </Chart>
        </Card>

        <div style={{ marginTop: "10px" }} />
        <Table
          dataSource={OtherProductStore.activeProductStats}
          scroll={{x:"1000px"}}
          columns={[
            {
              dataIndex: "dateAsString",
              key: "dateAsString",
              title: "Sale date",
            },
            {
              dataIndex: "productName",
              key: "productName",
              title: "Product name",
            },
            {
              dataIndex: "cash",
              key: "cash",
              title: "Collected cash",
              render: (value) =>
                typeof value !== "number"
                  ? value
                  : `₦ ${value.toLocaleString("en")}`,
            },
            {
              dataIndex: "amount",
              key: "amount",
              title: "Number of items sold",
              render: (value) =>
                typeof value !== "number"
                  ? value
                  : `${value.toLocaleString("en")}`,
            },
            {
              dataIndex: "expenses",
              key: "expenses",
              title: "Expenses",
              render: (value) =>
                typeof value !== "number"
                  ? value
                  : `₦ ${value.toLocaleString("en")}`,
            },
          ]}
        ></Table>
      </div>
    );
  });
