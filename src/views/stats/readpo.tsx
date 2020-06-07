import { observer, useObservable } from "mobx-react-lite";
import { toJS } from "mobx";
import { StatsStore } from "./stats.store";
import { useEffect } from "react";
import React from "react";
import { Table, Card, Button, message, Typography } from "antd";
import moment from "moment";
import { SmdashboardService } from "../../service";
export const ReadPos: React.FC<any> = observer(() => {
  const store = useObservable(StatsStore);
  let { pos, currentDateFilter, currenttimestamp } = store;
  pos = toJS(pos);
  currentDateFilter = toJS(currentDateFilter);
  currenttimestamp = toJS(currenttimestamp);
  useEffect(() => {
    store.fetchPos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenttimestamp, currentDateFilter]);
  useEffect(() => {
    //
  }, [pos]);

  const handledelete = async (record: any) => {
    const response = await SmdashboardService.deletePosByDate(
      moment(record.dateAsString).valueOf()
    );
    if (response === undefined) {
      message.success("deleted...");
      store.fetchPos();
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
        title: "Paid Outstanding",
        dataIndex: "amount_paid",
        key: "amount_paid",
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
    <Card
      title={<Typography.Title level={3}>Paid Outstandings</Typography.Title>}
    >
      <Table dataSource={pos} columns={columns()} />
    </Card>
  );
});
