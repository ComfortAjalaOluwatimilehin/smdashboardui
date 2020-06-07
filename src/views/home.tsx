import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { RouteComponentProps } from "react-router";
import { ReadStats } from "./stats/readstats";
import { ReadExpenses } from "./stats/readexpenses";
import { ReadPos } from "./stats/readpo";
import { Row, Col, DatePicker, Radio } from "antd";
import { HomeStyles } from "./stats/homestyles";
import { StatsStore } from "./stats/stats.store";
import { Moment } from "moment";
export interface IHome extends RouteComponentProps {}
export const Home: React.FC<IHome> = observer((props) => {
  const store = useObservable(StatsStore);
  let { currentDateFilter } = store;
  const datepickeroptions: any =
    currentDateFilter === "day" ? {} : { picker: currentDateFilter };
  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <HomeStyles />
      </Col>
      <Col span={24}>
        <div>
          <Row justify="center" align="middle">
            <Col span={12}>
              <DatePicker
                {...datepickeroptions}
                onChange={(date: Moment | null) => {
                  if (!date || date == null) return;
                  store.setCurrentTimestamp(date.utc().valueOf());
                  return;
                }}
              />
            </Col>
            <Col>
              <Radio.Group
                defaultValue={currentDateFilter}
                onChange={(e) => {
                  e.preventDefault();
                  store.setCurrentDateFilter(e.target.value);
                  return;
                }}
              >
                <Radio value={"year"}>By Year</Radio>
                <Radio value={"month"}>By Month</Radio>
                <Radio value={"day"}>By Date</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </div>
        <div id="statsexpensespos" className="margin-sm-top">
          <div>
            <ReadStats />
          </div>
          <div className="margin-lg-top">
            <Row>
              <Col span={12} flex="1" className="margin-sm-left">
                <ReadExpenses />
              </Col>
              <Col span={12} flex="1" className="margin-sm-right">
                <ReadPos />
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
});
