import { observable, action, computed } from "mobx";
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
export type TDateFilterTitle = "Annual" | "Monthly" | "Daily";
export class StatsStoreSingleton {
  @observable stats: IMonthlySales[] = [];
  @observable expenses: IExpense[] = []
  @observable pos: IPos[] = []
  @observable currenttimestamp: number;
  @observable currentDateFilter: TCurrentDateFilter = "year";
  @observable private hasAccess: boolean = false;
  @observable public exportingData:boolean = false;
  public exportDataAsCSV():void{
    this.exportingData = true;
    let data = "";
    data = "date,number of bags,expenses,cash collected\n"
    for(const stat of this.stats){
        data += `${stat.dateAsString}, ${stat.bags_solds}, ${stat.Expenses},${stat.paid_cash}\n`
    }
		const blob = new Blob([data], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const anchorTag = document.createElement("a");
		anchorTag.href = url;
		anchorTag.download = "stats.csv";
		anchorTag.click();
    this.exportingData = false;
    setTimeout(() => {
      anchorTag.remove()
    }, 1000)
  }
  @computed get datefiltertitle(): TDateFilterTitle {
    return this.currentDateFilter === "year" ? "Annual" : this.currentDateFilter === "day" ? "Daily" : "Monthly"
  }
  constructor() {
    this.currenttimestamp = moment().utc().valueOf();
  }
  @action public getHasAccess(): boolean {
    return this.hasAccess
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
      console.error(err);
    }
  }
}


export const StatsStore = new StatsStoreSingleton()