
import { BaseStoreSingleton } from "../base.store";
class CustomerStoreSingleton extends BaseStoreSingleton {

    prefixSelector: string = "+234"
    async init() {
        await this.getcustomers()

    }






}

export const CustomerStore = new CustomerStoreSingleton()