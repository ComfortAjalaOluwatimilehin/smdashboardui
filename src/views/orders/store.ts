
import { BaseStoreSingleton } from "../base.store";
class OrderStoreSingleton extends BaseStoreSingleton {

    async init() {
        await this.getorders()
        await this.getcustomers()

    }






}

export const OrderStore = new OrderStoreSingleton()