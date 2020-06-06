import { observable, action } from "mobx"
import moment from "moment";
import { SmdashboardService } from "../../service";
export interface IMonthlySales {
    "_id": string;
    "dateAsString": string;
    "count": number;
    "bags_solds": number;
    "paid_cash": number;
    "derived_sales": number;
    "PaidOutandings": number;
    "Expenses": number;
    "remaining_outstanding": number;
}
export type TCurrentDateFilter = "Y" | "M" | "D"
export class StatsStore {
    @observable stats: IMonthlySales[] = []
    @observable currenttimestamp: number;
    @observable currentDateFilter: TCurrentDateFilter = "Y"
    @observable hasAccess: boolean = false;
    constructor() {

        this.currenttimestamp = moment().valueOf()

    }

    @action public setCurrentDateFilter(filter: TCurrentDateFilter): void {
        this.currentDateFilter = filter;
    }
    @action public setCurrentTimestamp(timestamp: number): void {
        this.currenttimestamp = timestamp;
    }
    @action public async fetchStats(): Promise<void> {
        try {
            const stats = await SmdashboardService.fetchStats({ timestamp: this.currenttimestamp, filterType: this.currentDateFilter })
            this.stats = stats;
        } catch (err) {
            this.stats = []
            this.hasAccess = true
            console.error(err)
        }

    }

}