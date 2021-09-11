/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Row, Col, DatePicker, Radio } from "antd";
import { Chart, Tooltip, Interaction, Line, Point } from "bizcharts";
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
    ]);
    const scale: any = {
      cash: {
        formatter: (str: number) => `₦ ${str.toLocaleString("en")}`,
      },
    };
    return (
      <div style={{ marginTop: "10px" }}>
        <Card style={{ width: "100%", minHeight: "500px" }}>
          <Row style={{ marginBottom: "50px" }}>
            <Col span={10}>
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
            <Col span={2} />
            <Col span={10}>
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
          </Row>
          <Chart
            autoFit
            padding="auto"
            height={400}
            data={toJS(OtherProductStore.activeProductStats)}
            scale={scale}
          >
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
      </div>
    );
  });
