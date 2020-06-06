import { useLocalStore, observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { StatsStore } from "./stats.store";
import { useEffect } from "react";
import React from "react";
import { Row, Col, DatePicker, Radio, Table, Card } from "antd";
import moment, { Moment } from "moment";
export const ReadStats: React.FC<any> = observer(() => {
  const store = useLocalStore(() => new StatsStore());
  let { stats, currentDateFilter, currenttimestamp } = store;
  stats = toJS(stats);
  currentDateFilter = toJS(currentDateFilter);
  currenttimestamp = toJS(currenttimestamp);
  useEffect(() => {
    store.fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenttimestamp, currentDateFilter]);
  useEffect(() => {
    //
  }, [stats]);
  return (
    <div id="readstatsview">
      <h1>Here are the Stats</h1>
      <Row>
        <Col>
          <DatePicker
            format="YYYY/MM/DD"
            defaultPickerValue={moment(currenttimestamp)}
            onChange={(date: Moment | null, dateString: string) => {
              if (!date || date == null) return;
              store.setCurrentTimestamp(date.valueOf());
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
            <Radio value={"Y"}>By Year</Radio>
            <Radio value={"D"}>By Month</Radio>
            <Radio value={"M"}>By Date</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Card title="Simple Stats">
          <Table
            dataSource={stats}
            columns={[
              {
                title: "Key",
                dataIndex: "dateAsString",
                key: "dateAsString",
              },
              {
                title: "Bags Sold",
                dataIndex: "bags_solds",
                key: "bags_solds",
              },
              {
                title: "Expected Cash",
                dataIndex: "derived_sales",
                key: "derived_sales",
                render: (value: number) =>
                  Number(value).toLocaleString(undefined, {
                    style: "currency",
                    currency: "NGN",
                  }),
              },
              {
                title: "Paid Cash",
                dataIndex: "paid_cash",
                key: "paid_cash",
                render: (value: number) =>
                  Number(value).toLocaleString(undefined, {
                    style: "currency",
                    currency: "NGN",
                  }),
              },

              {
                title: "Expenses",
                dataIndex: "Expenses",
                key: "Expenses",
                render: (value: number) =>
                  Number(value).toLocaleString(undefined, {
                    style: "currency",
                    currency: "NGN",
                  }),
              },
              {
                title: "Paid Outstanding",
                dataIndex: "PaidOutandings",
                key: "PaidOutandings",
                render: (value: number) =>
                  Number(value).toLocaleString(undefined, {
                    style: "currency",
                    currency: "NGN",
                  }),
              },
              {
                title: "Unpaid Outstanding",
                dataIndex: "remaining_outstanding",
                key: "remaining_outstanding",
                render: (value: number) => Number(value).toFixed(2),
              },
            ]}
          />
        </Card>
      </Row>
    </div>
  );
});
