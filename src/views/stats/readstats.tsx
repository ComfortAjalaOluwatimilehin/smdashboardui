import { observer, useObservable } from "mobx-react-lite";
import { toJS } from "mobx";
import { StatsStore } from "./stats.store";
import { useEffect } from "react";
import React from "react";
import { Table, Card, Button, message, Typography } from "antd";
import moment from "moment";
import { SmdashboardService } from "../../service";
import { GraphicalRepresentation } from "../plots/plot";
export const ReadStats: React.FC<any> = observer(() => {
  const store = useObservable(StatsStore);
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
    console.log(stats)
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
        render:(date:string) => {
          console.log(currentDateFilter)
          if(currentDateFilter === "day"){
            return moment(date).format("dddd Do MMM YYYY")
          }
          else if(currentDateFilter === "month"){
            return moment(date).format("dddd Do MMM YYYY")
          }
          else {
            return moment(date).format("MMMM YYYY")
          }
            
        }
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
        render: (value: number) => {
          const label: string = Number(value).toFixed(2);
          if (value <= 100)
            return (
              <span className="highlightedoutstanding greedfree">{label}</span>
            );
          if (value > 100 && value < 1000)
            return (
              <span className="highlightedoutstanding lightred">{label}</span>
            );
          if (value > 1000 && value < 2000)
            return (
              <span className="highlightedoutstanding mediumred">{label}</span>
            );
          return (
            <span className="highlightedoutstanding deepred">{label}</span>
          );
        },
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
      title={
        <Typography.Title level={3}>
          {store.datefiltertitle} sales summary
        </Typography.Title>
      }
    >
      <GraphicalRepresentation data={stats} />
      <Table dataSource={stats} columns={columns()} scroll={{ x: true }} pagination={{pageSize:100}} />
  
    </Card>
  );
});
