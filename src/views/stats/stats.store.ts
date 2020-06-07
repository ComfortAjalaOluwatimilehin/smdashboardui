import { observable, action } from "mobx";
import moment from "moment";
import { SmdashboardService } from "../../service";
export interface IMonthlySales {
  _id: string;
  dateAsString: string;
  count: number;
  bags_solds: number;
  paid_cash: number;
  derived_sales: number;
  PaidOutandings: number;
  Expenses: number;
  remaining_outstanding: number;
}

export interface IExpense {
  count: number;
  dateAsDateObject: string;
  dateAsString: string;
  _id: number,
  amount: number
}

export interface IPos {
  count: number;
  dateAsDateObject: string;
  dateAsString: string;
  amount_paid: number
}
export type TCurrentDateFilter = "year" | "month" | "day";
export class StatsStoreSingleton {
  @observable stats: IMonthlySales[] = [];
  @observable expenses: IExpense[] = []
  @observable pos: IPos[] = []
  @observable currenttimestamp: number;
  @observable currentDateFilter: TCurrentDateFilter = "year";
  @observable hasAccess: boolean = false;

  constructor() {
    this.currenttimestamp = moment().utc().valueOf();
  }

  @action public setCurrentDateFilter(filter: TCurrentDateFilter): void {
    this.currentDateFilter = filter;
  }
  @action public setCurrentTimestamp(timestamp: number): void {
    this.currenttimestamp = timestamp;
  }

  @action public async fetchStats(): Promise<void> {
    this.stats = []
    try {
      const stats = await SmdashboardService.fetchStats({
        timestamp: this.currenttimestamp,
        filterType: this.currentDateFilter,
      });
      this.stats = stats;
    } catch (err) {
      this.stats = [];
      this.hasAccess = true;
      console.error(err);
    }
  }
  @action public async fetchExpenses(): Promise<void> {
    this.expenses = []
    try {
      const expenses = await SmdashboardService.fetchExpenses({
        timestamp: this.currenttimestamp,
        filterType: this.currentDateFilter,
      });
      this.expenses = expenses;
    } catch (err) {
      this.expenses = [];
      this.hasAccess = true;
      console.error(err);
    }
  }
  @action public async fetchPos(): Promise<void> {
    this.pos = []
    try {
      const pos = await SmdashboardService.fetchPaidOutstandings
        ({
          timestamp: this.currenttimestamp,
          filterType: this.currentDateFilter,
        });
      this.pos = pos;
    } catch (err) {
      this.pos = [];
      this.hasAccess = true;
      console.error(err);
    }
  }
}


export const StatsStore = new StatsStoreSingleton()