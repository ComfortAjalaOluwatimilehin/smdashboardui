
import { BaseStoreSingleton } from "./base.store";
class HomeStoreSingleton extends BaseStoreSingleton {

    prefixSelector: string = "+234"
    async init() {
        await this.getorders()
    }






}

export const HomeStore = new HomeStoreSingleton()