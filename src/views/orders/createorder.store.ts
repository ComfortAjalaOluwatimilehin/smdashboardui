
import { observable, action, toJS } from "mobx"
import { SmdashboardService } from "../../service";
import { ICreateOrder2, ICreateOrder1 } from "../../interfaces/order";
import { IProduct } from "../../interfaces/product";
import moment from "moment"
import { BaseStoreSingleton } from "../base.store";
class CreateOrderStoreSingleton extends BaseStoreSingleton {

    @observable hascustomerid: boolean = false
    @observable orderproducts: { product_id: string, quantity: number, name: string }[] = []
    prefixSelector: string = "+234"
    async init() {

        await this.getcustomers()
        await this.getproducts()
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

        const neworderproducts = [...toJS(this.orderproducts)]
        neworderproducts.splice(position, 1)
        this.orderproducts = neworderproducts
    }

    @action async createorder(value: {
        full_name: string,
        phone_number: number,
        newaddress: string,
        delivery_date: object
    } | {
        customer_id: string,
        newaddress: string,
        delivery_date: object
    }) {
        try {
            if ([...toJS(this.orderproducts)].length === 0) throw new Error("please select at least one product")
            // console.log("newaddress", value.newaddress)
            let addresses: string[] = [value.newaddress]
            if ("customer_id" in value) {
                const customers = [...toJS(this.customers)].filter((c) => c._id === value.customer_id)
                const customer = customers[0]
                addresses = [...addresses, ...customer.addresses]
            }
            let filtered: string[] = addresses.reduce((accum: string[], current: string) => {
                // console.log(accum, current)
                if (accum.indexOf(current) >= 0) {
                    return accum
                } else {
                    return [...accum, current]
                }
            }, [])
            const order: ICreateOrder1 | ICreateOrder2 = "full_name" in value ? {
                ...value,
                full_name: value.full_name,
                phone_number: value.phone_number,
                addresses: filtered,
                orderproducts: [...toJS(this.orderproducts)],
                delivery_address: value.newaddress,
                delivery_date: moment(value.delivery_date).format(),

            } : {
                    ...value,
                    addresses: filtered,
                    customer_id: value.customer_id,
                    orderproducts: [...toJS(this.orderproducts)],
                    delivery_address: value.newaddress,
                    delivery_date: moment(value.delivery_date).format()
                }

            order.delivery_address = value.newaddress
            // console.log(order)
            const response = await SmdashboardService.createorder(order)
            this.setinfo(response)
        } catch (err) {
            this.seterror(err.message)

        }
    }
}

export const CreateOrderStore = new CreateOrderStoreSingleton()