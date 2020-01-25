
import { observable, action, toJS } from "mobx"
import { SmdashboardService } from "../../service";
import { IOrder, ICreateOrder } from "../../interfaces/order";
import { ICustomer } from "../../interfaces/customer";
import { IProduct } from "../../interfaces/product";

class OrderStoreSingleton {
    @observable orders: IOrder[] = []
    @observable customers: ICustomer[] = []
    @observable products: IProduct[] = []
    @observable hasAccess: boolean = false
    @observable token: string | undefined;
    @observable hascustomerid: boolean = false
    @observable orderproducts: { product_id: string, quantity: number, name: string }[] = []
    prefixSelector: string = "+234"
    async init() {
        await this.getorders()
        await this.getcustomers()
        await this.getproducts()
    }
    @action async getorders() {
        try {
            const orders: IOrder[] = await SmdashboardService.orders()
            this.hasAccess = true
            this.orders = orders
        } catch (err) {
            this.hasAccess = false
            console.log(err)
        }
    }
    @action async getcustomers() {
        try {
            const customers: ICustomer[] = await SmdashboardService.customers()
            this.hasAccess = true
            this.customers = customers
        } catch (err) {
            this.hasAccess = false
            console.log(err)
        }
    }
    @action async getproducts() {
        try {
            const products: IProduct[] = await SmdashboardService.products()
            this.hasAccess = true
            this.products = products
        } catch (err) {
            this.hasAccess = false
            console.log(err)
        }
    }
    @action togglehascustomerid() {
        this.hascustomerid = !toJS(this.hascustomerid)
    }
    @action handleorderproducts(key: string, quantity: number) {
        const matches: IProduct[] = toJS(this.products).filter((current: IProduct) => {
            return current._id === key
        })
        if (matches.length === 0) return
        const match: IProduct = matches[0]
        this.orderproducts.push({ product_id: key, quantity, name: match.product_name })
    }
    @action handleorderproductsnumbers(value: number, orderproductindex: number) {
        const neworderproducts = [...toJS(this.orderproducts)].map((orderproduct, index) => {
            if (orderproductindex === index) {
                return {
                    ...orderproduct,
                    quantity: value
                }
            }
            return orderproduct
        })
        this.orderproducts = neworderproducts
    }
    @action removeorderproductbyposition(position: number) {
        console.log("postion", position)
        const neworderproducts = [...toJS(this.orderproducts)]
        neworderproducts.splice(position, 1)
        this.orderproducts = neworderproducts
    }

    @action async createorder(value: {
        full_name: string,
        phone_number: number,
        address: string
    }) {
        try {
            if ([...toJS(this.orderproducts)].length === 0) throw new Error("please select at least one product")
            const order: ICreateOrder = {
                full_name: value.full_name,
                phone_number: value.phone_number,
                addresses: [value.address],
                orderproducts: [...toJS(this.orderproducts)]
            }
            await SmdashboardService.createorder(order)
        } catch (err) {
            console.error(err)

        }
    }
}

export const OrderStore = new OrderStoreSingleton()