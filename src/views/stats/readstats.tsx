import { useLocalStore, observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { StatsStore } from "./stats.store";
import { useEffect } from "react";
import React from "react";
import {
  Row,
  Col,
  DatePicker,
  Radio,
  Table,
  Card,
  Typography,
  Button,
  message,
} from "antd";
import moment, { Moment } from "moment";
import { SmdashboardService } from "../../service";

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

  const handledelete = async (record: any) => {
    const response = await SmdashboardService.deleteStatsByDate(
      moment(record.dateAsString).valueOf()
    );
    if (response === undefined) {
      message.success("deleted...");
      store.fetchStats();
    } else {
      message.error(response);
    }
  };
  const columns = (): {
    title: string;
    dataIndex: string;
    key: string;
    render?: (...args: any) => any;
  }[] => {
    const cols: {
      title: string;
      dataIndex: string;
      key: string;
      render?: (...args: any) => any;
    }[] = [
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
    ];
    if (currentDateFilter === "D") {
      cols.push({
        title: "",
        dataIndex: "delete_stats_by_date",
        key: "delete_stats",
        render: (text: any, record: any) => {
          return (
            <Button
              type="danger"
              onClick={() => {
                if (!record.hasOwnProperty("dateAsString")) {
                  message.error(
                    "An error occured while deleting the record, please contact the IT department"
                  );
                } else {
                  return handledelete(record);
                }
              }}
            >
              Delete
            </Button>
          );
        },
      });
    }

    return cols;
  };

  return (
    <div id="readstatsview">
      <Typography.Title>Here are the Stats</Typography.Title>
      <Row type="flex" style={{ alignItems: "center" }}>
        <Col span={12}>
          <DatePicker
            format="YYYY/MM/DD"
            defaultValue={moment(currenttimestamp)}
            onChange={(date: Moment | null) => {
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
            <Radio value={"M"}>By Month</Radio>
            <Radio value={"D"}>By Date</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <p />
      <Row>
        <Card title="Simple Stats">
          <Table dataSource={stats} columns={columns()} />
        </Card>
      </Row>
    </div>
  );
});
