import { observable, computed, toJS, action } from "mobx"
import { BaseStoreSingleton } from "../base.store";
import { stat } from "fs";
import { SmdashboardService } from "../../service";
class SingleOrderStoreSingleton extends BaseStoreSingleton {
    @observable changes: undefined | { valid?: boolean, status?: string }
    constructor() {
        super()
        this.getorderstatus()
    }
    async init(orderid: string | undefined) {

        if (orderid) {
            await this.getorder(orderid)

        }
    }

    @computed get ordertotal(): string {

        let total: number = 0
        const order = toJS(this.order)
        if (order) {
            for (let orderproduct of order.orderproducts) {
                const cost: number = orderproduct.quantity * orderproduct.product_unit_price
                total += cost
            }
        }
        return `₦ ${total.toFixed(3)}`
    }
    @computed get currentstatusposition(): number {
        const order = toJS(this.order)
        const statusoptions = toJS(this.orderstatus)
        if (!order || !statusoptions) return 0
        const status: string = order.order_status
        if (statusoptions.length === 0) return 0
        let position = statusoptions.indexOf(status)

        return position
    }

    @action async movetonextorderstatus() {

        const nextposition: number = toJS(this.currentstatusposition) + 1
        const status: string[] = toJS(this.orderstatus)
        const order = toJS(this.order)
        if (!order || status.length === 0 || nextposition >= status.length) return

        const nextstatus: string = status[nextposition]
        const update = {
            order_status: nextstatus
        }
        try {
            await SmdashboardService.patchorder({ orderid: order._id, update })
            await this.getorder(order._id)
        } catch (err) {
            this.seterror(err.message)
        }
    }

}


export const SingleOrderStore = new SingleOrderStoreSingleton()