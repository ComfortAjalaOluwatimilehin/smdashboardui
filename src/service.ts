import { RestClientSingleton } from "./auth/rest";
import { IOrder } from "./interfaces/order";
import { ICustomer } from "./interfaces/customer";
import { IProduct } from "./interfaces/product";
import Cookie from "js-cookie"
class SmdashboardServiceSingleton extends RestClientSingleton {

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

            const { data } = await this.getclient().post(`http://localhost:8080/login`, { email, password })
            if (typeof data !== "string") throw new Error("Format of login request response is invalid")
            console.log(data)
            return data
        } catch (err) {
            console.error(err)
            throw err
        }

    }
    async vtoken(): Promise<boolean> {
        try {

            const isvalid: boolean = await this.getclient().get(`http://localhost:8080/api/fvfjcnys`)
            return isvalid
        } catch (err) {
            console.error(err)
            return false
        }


    }
    async orders(): Promise<IOrder[]> {
        let defaultorders: IOrder[] = []
        try {
            const { data } = await this.getclient().get("http://localhost:8080/api/orders")
            if (Array.isArray(data)) return data
            throw new Error("data format for orders is invalid")
        } catch (err) {

            console.error(err)
            return defaultorders
        }
    }
    async customers(): Promise<ICustomer[]> {
        let defaultcustomers: ICustomer[] = []
        try {
            const { data } = await this.getclient().get("http://localhost:8080/api/customers")
            if (Array.isArray(data)) return data
            throw new Error("data format for customers is invalid")
        } catch (err) {

            console.error(err)
            return defaultcustomers
        }
    }
    async products(): Promise<IProduct[]> {
        let defaultproducts: IProduct[] = []
        try {
            const { data } = await this.getclient().get("http://localhost:8080/api/products")
            if (Array.isArray(data)) return data
            throw new Error("data format for products is invalid")
        } catch (err) {

            console.error(err)
            return defaultproducts
        }
    }
    async createorder(order: any): Promise<boolean> {

        try {
            await this.getclient().post("http://localhost:8080/api/orders", order)
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }
}

export const SmdashboardService = new SmdashboardServiceSingleton()