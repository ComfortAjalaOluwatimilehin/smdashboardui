
import { TCurrentDateFilter, IMonthlySales, IExpense, IPos } from "./views/stats/stats.store";
import { tz } from "moment-timezone"
import axios, { AxiosResponse } from "axios"
axios.defaults.withCredentials = true;
export interface IExpenseType{
    type:string
}
class SmdashboardServiceSingleton  {
    uri: "https://arcane-bastion-12919.herokuapp.com" | "http://localhost:8080" = "https://arcane-bastion-12919.herokuapp.com"
    tz: string;
    constructor() {
        this.tz = tz.guess()
    }

   
    async login({ email, password }: { email: string, password: string }): Promise<void> {
            await axios.post(`${this.uri}/login`, { email, password })
    }
    async unsettoken() {
       await axios.get(`${this.uri}/logout`)
    }
    async vtoken(): Promise<boolean> {
        try {

            const response: AxiosResponse = await axios.get(`${this.uri}/api/fvfjcnys`)
            if(response.status === 200){
                return true 
            }
            else return false
        } catch (err) {
            console.error(err)
            return false
        }


    }
    async fetchStats({ timestamp, filterType }: { timestamp: number, filterType: TCurrentDateFilter }): Promise<IMonthlySales[]> {
        let route = filterType === "year" ? "getStatsByYear" : filterType === "day" ? "getStatsByDate" : "getStatsByMonth"

        const timezone = this.tz
        timestamp = tz(timestamp, timezone).valueOf()
        try {
            const { data } = await axios.get(`${this.uri}/api/v1/stats/${route}?timestamp=${timestamp}&timezone=${timezone}`)
            return data
        } catch (err) {
            throw err
        }
    }


    async fetchExpenses({ timestamp, filterType }: { timestamp: number, filterType: TCurrentDateFilter }): Promise<IExpense[]> {
        let route = filterType === "year" ? "getExpensesByYear" : filterType === "day" ? "getExpensesByDate" : "getExpensesByMonth"

        const timezone = this.tz
        timestamp = tz(timestamp, timezone).valueOf()
        try {
            const { data } = await axios.get(`${this.uri}/api/v1/expenses/${route}?timestamp=${timestamp}&timezone=${timezone}`)
            return data
        } catch (err) {
            throw err
        }
    }
    async fetchPaidOutstandings({ timestamp, filterType }: { timestamp: number, filterType: TCurrentDateFilter }): Promise<IPos[]> {
        let route = filterType === "year" ? "getPaidOutstandingByYear" : filterType === "day" ? "getPaidOutstandingByDate" : "getPaidOutstandingByMonth"

        const timezone = this.tz
        timestamp = tz(timestamp, timezone).valueOf()
        try {
            const { data } = await axios.get(`${this.uri}/api/v1/paidoutstandings/${route}?timestamp=${timestamp}&timezone=${timezone}`)
            return data
        } catch (err) {
            throw err
        }
    }
    async createSale(props: any): Promise<string | undefined> {

        try {
            await axios.post(`${this.uri}/api/v1/sales`, { ...props })
            return

        } catch (err) {
            if (err.response) {
                return err.response.data
            } return err.message
        }
    }
    async createExpense(props: any): Promise<string | undefined> {

        try {
            await axios.post(`${this.uri}/api/v1/expenses`, [{ ...props }])
            return

        } catch (err) {
            if (err.response) {
                return err.response.data
            } return err.message
        }
    }
    async fetchExpenseTypes(): Promise<IExpenseType[]> {

        try {
            const { data } = await axios.get(`${this.uri}/api/v1/expenses/getExpenseTypes`)
            return data;
        } catch (err) {
            throw err;
        }
    }


    async createPaidOutstanding(props: any): Promise<string | undefined> {

        try {
            await axios.post(`${this.uri}/api/v1/paidoutstandings`, [{ ...props }])
            return

        } catch (err) {
            if (err.response) {
                return err.response.data
            } return err.message
        }
    }

    async deleteStatsByDate(timestamp: number): Promise<string | undefined> {
        const timezone = this.tz
        timestamp = tz(timestamp, timezone).valueOf()
        try {
            await axios.delete(`${this.uri}/api/v1/stats?timestamp=${timestamp}&timezone=${timezone}`)
            return
        } catch (err) {
            if (err.response) {
                return err.response.data
            } return err.message
        }
    }
    async deleteExpenseByDate(timestamp: number): Promise<string | undefined> {
        const timezone = this.tz
        timestamp = tz(timestamp, timezone).valueOf()
        try {
            await axios.delete(`${this.uri}/api/v1/expenses?timestamp=${timestamp}&timezone=${timezone}`)
            return
        } catch (err) {
            if (err.response) {
                return err.response.data
            } return err.message
        }
    }
    async deletePosByDate(timestamp: number): Promise<string | undefined> {
        const timezone = this.tz
        timestamp = tz(timestamp, timezone).valueOf()
        try {
            await axios.delete(`${this.uri}/api/v1/paidoutstandings?timestamp=${timestamp}&timezone=${timezone}`)
            return
        } catch (err) {
            if (err.response) {
                return err.response.data
            } return err.message
        }
    }
}

export const SmdashboardService = new SmdashboardServiceSingleton()