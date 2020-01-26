
import { observable } from "mobx"
import { IOrder } from "../interfaces/order"
import { ICustomer } from "../interfaces/customer"
import { IProduct } from "../interfaces/product"
import { SmdashboardService } from "../service"

export class BaseStoreSingleton {
    @observable orders: IOrder[] = []
    @observable customers: ICustomer[] = []
    @observable products: IProduct[] = []
    @observable order: IOrder | undefined;
    @observable orderstatus: string[] = []
    @observable customer: ICustomer | undefined;
    @observable hasAccess: boolean = false
    @observable info: { type: "error" | "warning" | "info", text: string } | undefined;
    prefixSelector: string = "+234"
    unsetinfo() {
        this.info = undefined
    }
    seterror(message: string) {
        window.scrollTo(0, 0)
        this.info = { type: "error", text: message }

    }
    setinfo(message: string) {
        window.scrollTo(0, 0)
        this.info = { type: "info", text: message }

    }
    async getorder(orderid: string) {
        try {
            const order: IOrder = await SmdashboardService.order({ orderid })
            this.order = order
            this.hasAccess = true
        } catch (err) {
            this.hasAccess = false
            this.seterror(err.message)
        }
    }
    async getorders() {
        try {
            const orders: IOrder[] = await SmdashboardService.orders()
            this.orders = orders
            this.hasAccess = true
        } catch (err) {
            this.hasAccess = false
            this.seterror(err.message)
        }
    }
    async getorderstatus() {
        try {
            const status: string[] = await SmdashboardService.orderstatus()
            this.orderstatus = status
            this.hasAccess = true
        } catch (err) {
            this.hasAccess = false
            this.seterror(err.message)
        }
    }
    async getcustomers() {
        try {
            const customers: ICustomer[] = await SmdashboardService.customers()
            this.customers = customers
            this.hasAccess = true
        } catch (err) {
            this.hasAccess = false
            this.seterror(err.message)
        }
    }
    async getproducts() {
        try {
            const products: IProduct[] = await SmdashboardService.products()
            this.products = products
            this.hasAccess = true
        } catch (err) {
            this.hasAccess = false
            this.seterror(err.message)
        }
    }


}

