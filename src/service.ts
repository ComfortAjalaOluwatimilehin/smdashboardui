import { RestClientSingleton } from "./auth/rest";
import { IOrder } from "./interfaces/order";
import { ICustomer } from "./interfaces/customer";
import { IProduct } from "./interfaces/product";
import Cookie from "js-cookie"
class SmdashboardServiceSingleton extends RestClientSingleton {
    uri: "https://arcane-bastion-12919.herokuapp.com" | "http://localhost:8080" = "https://arcane-bastion-12919.herokuapp.com"
    init() {
        const token: string | undefined = this.extracttoken()

        this.settoken(token)
    }
    private extracttoken(): string | undefined {
        const token: string | undefined = Cookie.get("token")
        return token
    }
    async login({ email, password }: { email: string, password: string }): Promise<string> {
        try {

            const { data } = await this.getclient().post(`${this.uri}/login`, { email, password })
            if (typeof data !== "string") throw new Error("Format of login request response is invalid")
            //  console.log(data)
            return data
        } catch (err) {

            throw err
        }

    }
    async vtoken(): Promise<boolean> {
        try {

            const isvalid: boolean = await this.getclient().get(`${this.uri}/api/fvfjcnys`)
            return isvalid
        } catch (err) {
            throw err
        }


    }
    async order({ orderid }: { orderid: string }): Promise<IOrder> {

        try {
            const { data } = await this.getclient().get(`${this.uri}/api/orders/${orderid}`)
            if (typeof data === "object") return data
            throw new Error("data format for order is invalid")
        } catch (err) {
            throw err
        }
    }
    async orderstatus(): Promise<string[]> {

        try {
            const { data } = await this.getclient().get(`${this.uri}/api/orders/status`)

            if (Array.isArray(data)) return data
            throw new Error("data format for order  status is invalid")
        } catch (err) {
            throw err
        }
    }
    async orders(): Promise<IOrder[]> {

        try {
            const { data } = await this.getclient().get(`${this.uri}/api/orders`)
            if (Array.isArray(data)) return data
            throw new Error("data format for orders is invalid")
        } catch (err) {

            throw err
        }
    }
    async customers(): Promise<ICustomer[]> {

        try {
            const { data } = await this.getclient().get(`${this.uri}/api/customers`)
            if (Array.isArray(data)) return data
            throw new Error("data format for customers is invalid")
        } catch (err) {

            throw err
        }
    }
    async products(): Promise<IProduct[]> {

        try {
            const { data } = await this.getclient().get(`${this.uri}/api/products`)
            if (Array.isArray(data)) return data
            throw new Error("data format for products is invalid")
        } catch (err) {
            throw err
        }
    }
    async createorder(order: any): Promise<string> {

        try {
            await this.getclient().post(`${this.uri}/api/orders`, order)
            return "Order added"
        } catch (err) {
            throw err
        }
    }

    async patchorder({ orderid, update }: { orderid: string, update: any }): Promise<any> {

        try {
            await this.getclient().patch(`${this.uri}/api/orders/${orderid}`, update)
            return
        } catch (err) {
            throw err
        }
    }

}

export const SmdashboardService = new SmdashboardServiceSingleton()