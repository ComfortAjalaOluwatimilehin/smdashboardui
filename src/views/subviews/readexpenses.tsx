import { observer, useObservable } from "mobx-react-lite";
import { toJS } from "mobx";
import { StatsStore } from "./stats.store";
import { useEffect } from "react";
import React from "react";
import { Table, Card, Button, message, Typography } from "antd";
import moment from "moment";
import { SmdashboardService } from "../../service";
export const ReadExpenses: React.FC<any> = observer(() => {
  const store = useObservable(StatsStore);
  let { expenses, currentDateFilter, currenttimestamp } = store;
  expenses = toJS(expenses);
  currentDateFilter = toJS(currentDateFilter);
  currenttimestamp = toJS(currenttimestamp);
  useEffect(() => {
    store.fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenttimestamp, currentDateFilter]);
  useEffect(() => {
    //
  }, [expenses]);

  const handledelete = async (record: any) => {
    const response = await SmdashboardService.deleteExpenseByDate(
      moment(record.dateAsString).valueOf()
    );
    if (response === undefined) {
      message.success("deleted...");
      store.fetchExpenses();
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
        title: "Expenses",
        dataIndex: "amount",
        key: "amount",
        render: (value: number) =>
          Number(value).toLocaleString(undefined, {
            style: "currency",
            currency: "NGN",
          }),
      },
    ];
    if (currentDateFilter === "day") {
      cols.push({
        title: "",
        dataIndex: "delete_stats_by_date",
        key: "delete_stats",
        render: (text: any, record: any) => {
          return (
            <Button
              danger
              type="primary"
              onClick={() => {
                if (!record.hasOwnProperty("dateAsString")) {
                  message.error(
                    "An error occured while deleting the record, please contact the IT department"
                  );
                } else {
                  const res = window.confirm("are you sure about deleting ?");
                  if (res === true) {
                    return handledelete(record);
                  } else {
                    message.info("Nothing was deleted...");
                  }
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
    <Card title={<Typography.Title level={3}>{store.datefiltertitle} expenses</Typography.Title>}>
      <Table dataSource={expenses} columns={columns()} scroll={{ x: true }} />
    </Card>
  );
});
